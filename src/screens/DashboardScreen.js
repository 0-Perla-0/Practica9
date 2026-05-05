import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Play, Flame, Dumbbell, CalendarDays, TrendingUp } from 'lucide-react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import { getSessions } from '../storage/storage';

const screenWidth = Dimensions.get("window").width;

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  return `${m} min`;
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return '¡Buenos días, tigre! 🐯';
  if (hour < 19) return '¡Buenas tardes, pantera! 🐆';
  return '¡Buenas noches, león! 🦁';
};

const calculateStreak = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;
  
  const dates = sessions.map(s => {
    const d = new Date(s.date);
    d.setHours(0,0,0,0);
    return d.getTime();
  }).sort((a,b) => b - a);

  const uniqueDates = [...new Set(dates)];
  let streak = 0;
  const today = new Date();
  today.setHours(0,0,0,0);
  let currentCheck = today.getTime();

  if (uniqueDates[0] !== currentCheck) {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (uniqueDates[0] !== yesterday.getTime()) {
      return 0;
    }
    currentCheck = yesterday.getTime();
  }

  for (let i = 0; i < uniqueDates.length; i++) {
    if (uniqueDates[i] === currentCheck) {
      streak++;
      const prevDay = new Date(currentCheck);
      prevDay.setDate(prevDay.getDate() - 1);
      currentCheck = prevDay.getTime();
    } else {
      break;
    }
  }
  return streak;
};

const getWeekActivity = (sessions) => {
  // Activity based on duration of last 7 days
  const data = [0, 0, 0, 0, 0, 0, 0];
  const labels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  
  const today = new Date();
  today.setHours(0,0,0,0);
  
  // Para simplificar, agruparemos por día de la semana, pero de la semana actual
  const currentDayOfWeek = today.getDay(); // 0 = Domingo, 1 = Lunes...
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1));

  sessions.forEach(s => {
    const sDate = new Date(s.date);
    sDate.setHours(0,0,0,0);
    
    // Si está dentro de esta semana (L a D)
    if (sDate >= startOfWeek && sDate <= today) {
      let dayIndex = sDate.getDay() - 1;
      if (dayIndex === -1) dayIndex = 6; // Domingo
      // Sumar minutos
      data[dayIndex] += Math.floor(s.duration / 60);
    }
  });

  return { labels, datasets: [{ data }] };
};

const DashboardScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  
  const [streak, setStreak] = useState(0);
  const [lastWorkout, setLastWorkout] = useState(null);
  const [chartData, setChartData] = useState({
    labels: ["L", "M", "X", "J", "V", "S", "D"],
    datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
  });

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const loadData = async () => {
    const s = await getSessions();
    setStreak(calculateStreak(s));
    if (s.length > 0) {
      // s is sorted newest first
      setLastWorkout(s[0]);
    }
    setChartData(getWeekActivity(s));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.subGreeting}>¿Listo para rasguñar esos hierros?</Text>
        </View>
        <View style={styles.streakBadge}>
          <Flame color={streak > 0 ? "#FF4500" : "#A0A0B0"} size={20} fill={streak > 0 ? "#FF4500" : "transparent"} />
          <Text style={styles.streakText}>{streak}</Text>
        </View>
      </View>
      
      <Card title="Último Entrenamiento" style={styles.nextWorkoutCard}>
        {lastWorkout ? (
          <View style={styles.workoutInfo}>
            <View>
              <Text style={styles.workoutName}>{lastWorkout.routineName}</Text>
              <Text style={styles.workoutDetail}>Hace poco • {formatTime(lastWorkout.duration)} • {lastWorkout.volume} kg</Text>
            </View>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => navigation.navigate('Entrenar')}
            >
              <Play color="#16161E" size={20} fill="#16161E" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.workoutInfo}>
            <View>
              <Text style={styles.workoutName}>No hay entrenamientos</Text>
              <Text style={styles.workoutDetail}>¡Empieza tu racha hoy!</Text>
            </View>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => navigation.navigate('Entrenar')}
            >
              <Play color="#16161E" size={20} fill="#16161E" />
            </TouchableOpacity>
          </View>
        )}
      </Card>

      <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
      <View style={styles.quickAccessRow}>
        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('Entrenar')}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(0,255,127,0.1)' }]}>
            <Dumbbell color="#00FF7F" size={24} />
          </View>
          <Text style={styles.quickText}>Entrenar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('Ejercicios')}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(138,43,226,0.1)' }]}>
            <CalendarDays color="#8A2BE2" size={24} />
          </View>
          <Text style={styles.quickText}>Ejercicios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard} onPress={() => navigation.navigate('Historial')}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(255,215,0,0.1)' }]}>
            <TrendingUp color="#FFD700" size={24} />
          </View>
          <Text style={styles.quickText}>Historial</Text>
        </TouchableOpacity>
      </View>

      <Card title="Actividad Semanal (minutos)">
        <LineChart
          data={chartData}
          width={screenWidth - 80}
          height={220}
          chartConfig={{
            backgroundColor: "#16161E",
            backgroundGradientFrom: "#16161E",
            backgroundGradientTo: "#16161E",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(138, 43, 226, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(160, 160, 176, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: "4", strokeWidth: "2", stroke: "#00FF7F" }
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16, marginLeft: -10 }}
        />
      </Card>
      
      <View style={{height: 40}}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 20 },
  greeting: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  subGreeting: { color: '#A0A0B0', fontSize: 14 },
  
  streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16161E', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1, borderColor: '#2A2A3A', gap: 6 },
  streakText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  nextWorkoutCard: { borderColor: '#8A2BE2', borderWidth: 1, marginBottom: 24 },
  workoutInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  workoutName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  workoutDetail: { color: '#A0A0B0', fontSize: 14, marginTop: 6 },
  playButton: { backgroundColor: '#00FF7F', width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', shadowColor: '#00FF7F', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 },

  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  quickAccessRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  quickCard: { backgroundColor: '#16161E', padding: 16, borderRadius: 16, alignItems: 'center', flex: 1, marginHorizontal: 4, borderWidth: 1, borderColor: '#2A2A3A' },
  iconBox: { padding: 12, borderRadius: 16, marginBottom: 8 },
  quickText: { color: '#E0E0E0', fontSize: 12, fontWeight: 'bold' }
});

export default DashboardScreen;
