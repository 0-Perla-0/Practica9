import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Modal } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Trophy, Flame, TrendingUp, Plus, X, Activity } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';
import Card from '../components/Card';
import { getSessions, getBodyWeights, saveBodyWeight, getPRs } from '../storage/storage';
import { ejerciciosData } from '../data/ejercicios';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#16161E',
  backgroundGradientTo: '#16161E',
  color: (opacity = 1) => `rgba(138, 43, 226, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(160, 160, 176, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#00FF7F"
  }
};

const chartConfigVolume = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(0, 255, 127, ${opacity})`,
  propsForDots: { r: "0" } // Ocultar puntos en barchart
};

const calculateStreak = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;
  
  const dates = sessions.map(s => {
    const d = new Date(s.date);
    d.setHours(0,0,0,0);
    return d.getTime();
  }).sort((a,b) => b - a); // Descendente

  const uniqueDates = [...new Set(dates)];
  let streak = 0;
  
  const today = new Date();
  today.setHours(0,0,0,0);
  let currentCheck = today.getTime();

  // Si hoy no entrenó, miramos ayer
  if (uniqueDates[0] !== currentCheck) {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (uniqueDates[0] !== yesterday.getTime()) {
      return 0; // Se rompió la racha hace más de 1 día
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

const getWeeklyVolumeData = (sessions) => {
  const data = { labels: [], datasets: [{ data: [] }] };
  if (!sessions || sessions.length === 0) {
    data.labels = ['Sem 1'];
    data.datasets[0].data = [0];
    return data;
  }

  // Agrupar por las últimas 4 semanas (simplificado)
  const volPorSemana = {};
  sessions.forEach(s => {
    const date = new Date(s.date);
    const sem = `Sem ${Math.ceil(date.getDate() / 7)}`;
    volPorSemana[sem] = (volPorSemana[sem] || 0) + s.volume;
  });

  const keys = Object.keys(volPorSemana).slice(0, 4).reverse();
  if (keys.length === 0) {
    data.labels = ['Sem 1'];
    data.datasets[0].data = [0];
    return data;
  }

  data.labels = keys;
  data.datasets[0].data = keys.map(k => volPorSemana[k]);
  return data;
};

const ProgresoScreen = () => {
  const isFocused = useIsFocused();
  const [streak, setStreak] = useState(0);
  const [prs, setPrs] = useState({});
  const [weights, setWeights] = useState([]);
  const [weeklyVol, setWeeklyVol] = useState(null);

  const [modalPeso, setModalPeso] = useState(false);
  const [inputPeso, setInputPeso] = useState('');

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const loadData = async () => {
    const s = await getSessions();
    setStreak(calculateStreak(s));
    setWeeklyVol(getWeeklyVolumeData(s));
    
    const p = await getPRs();
    setPrs(p);
    
    const w = await getBodyWeights();
    // Invertir para la gráfica (más antiguo a más nuevo)
    setWeights([...w].reverse()); 
  };

  const handleSavePeso = async () => {
    if (!inputPeso || isNaN(parseFloat(inputPeso))) return;
    await saveBodyWeight({ weight: parseFloat(inputPeso) });
    setModalPeso(false);
    setInputPeso('');
    loadData();
  };

  const weightChartData = {
    labels: weights.length > 0 ? weights.map(w => new Date(w.date).getDate() + '/' + (new Date(w.date).getMonth()+1)).slice(-5) : ['Hoy'],
    datasets: [
      {
        data: weights.length > 0 ? weights.map(w => w.weight).slice(-5) : [0],
        color: (opacity = 1) => `rgba(138, 43, 226, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Tu Progreso</Text>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Racha */}
        <View style={styles.streakContainer}>
          <Flame color={streak > 0 ? "#FF4500" : "#A0A0B0"} size={40} fill={streak > 0 ? "#FF4500" : "transparent"} />
          <View style={styles.streakInfo}>
            <Text style={styles.streakNumber}>{streak} días</Text>
            <Text style={styles.streakLabel}>Racha Felina</Text>
          </View>
        </View>

        {/* Peso Corporal */}
        <Card style={styles.cardSection}>
          <View style={styles.sectionHeader}>
            <View style={{flexDirection:'row', alignItems:'center', gap: 8}}>
              <TrendingUp color="#8A2BE2" size={20} />
              <Text style={styles.sectionTitle}>Peso Corporal</Text>
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={() => setModalPeso(true)}>
              <Plus color="#00FF7F" size={16} />
              <Text style={styles.addBtnText}>Añadir</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.chartContainer}>
            <LineChart
              data={weightChartData}
              width={screenWidth - 72}
              height={180}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 12 }}
            />
          </View>
        </Card>

        {/* Volumen Semanal */}
        <Card style={styles.cardSection}>
          <View style={styles.sectionHeader}>
            <View style={{flexDirection:'row', alignItems:'center', gap: 8}}>
              <Activity color="#00FF7F" size={20} />
              <Text style={styles.sectionTitle}>Volumen Semanal (kg)</Text>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            {weeklyVol && (
              <BarChart
                data={weeklyVol}
                width={screenWidth - 72}
                height={180}
                chartConfig={chartConfigVolume}
                style={{ borderRadius: 12 }}
                showValuesOnTopOfBars
                withInnerLines={false}
              />
            )}
          </View>
        </Card>

        {/* PRs */}
        <Card style={styles.cardSection}>
          <View style={styles.sectionHeader}>
            <View style={{flexDirection:'row', alignItems:'center', gap: 8}}>
              <Trophy color="#FFD700" size={20} />
              <Text style={styles.sectionTitle}>Récords Personales (PR)</Text>
            </View>
          </View>
          
          {Object.keys(prs).length === 0 ? (
            <Text style={styles.emptyText}>Registra pesos en tus entrenamientos para ver tus récords.</Text>
          ) : (
            Object.keys(prs).map(ejId => {
              const ej = ejerciciosData.find(e => e.id === ejId);
              return (
                <View key={ejId} style={styles.prRow}>
                  <Text style={styles.prName}>{ej ? ej.nombre : 'Ejercicio'}</Text>
                  <View style={styles.prValueBox}>
                    <Text style={styles.prValue}>{prs[ejId]} kg</Text>
                  </View>
                </View>
              );
            })
          )}
        </Card>
        
        <View style={{height: 40}}/>
      </ScrollView>

      {/* Modal Añadir Peso */}
      <Modal visible={modalPeso} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Registrar Peso</Text>
              <TouchableOpacity onPress={() => setModalPeso(false)}>
                <X color="#E0E0E0" size={24} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.pesoInput}
                keyboardType="numeric"
                placeholder="Ej. 70.5"
                placeholderTextColor="#A0A0B0"
                value={inputPeso}
                onChangeText={setInputPeso}
                autoFocus
              />
              <Text style={styles.kgText}>kg</Text>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSavePeso}>
              <Text style={styles.saveBtnText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', margin: 20, marginBottom: 10 },
  scrollContent: { paddingHorizontal: 20 },
  
  streakContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16161E', padding: 20, borderRadius: 20, marginBottom: 20, borderWidth: 1, borderColor: '#2A2A3A' },
  streakInfo: { marginLeft: 16 },
  streakNumber: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  streakLabel: { color: '#A0A0B0', fontSize: 14 },

  cardSection: { marginBottom: 20, padding: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { color: '#E0E0E0', fontSize: 18, fontWeight: 'bold' },
  addBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,255,127,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, gap: 4 },
  addBtnText: { color: '#00FF7F', fontSize: 12, fontWeight: 'bold' },
  
  chartContainer: { alignItems: 'center', backgroundColor: '#16161E', borderRadius: 12, paddingVertical: 10 },

  emptyText: { color: '#A0A0B0', fontSize: 14, textAlign: 'center', marginVertical: 10 },

  prRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#16161E', padding: 12, borderRadius: 12, marginBottom: 8 },
  prName: { color: '#E0E0E0', fontSize: 15, flex: 1 },
  prValueBox: { backgroundColor: 'rgba(255,215,0,0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,215,0,0.3)' },
  prValue: { color: '#FFD700', fontWeight: 'bold' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#16161E', width: '100%', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#8A2BE2' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0B0B0E', borderRadius: 12, borderWidth: 1, borderColor: '#2A2A3A', paddingHorizontal: 16 },
  pesoInput: { flex: 1, color: '#fff', fontSize: 24, paddingVertical: 16 },
  kgText: { color: '#8A2BE2', fontSize: 20, fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#8A2BE2', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default ProgresoScreen;
