import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Play } from 'lucide-react-native';
import Card from '../components/Card';

const screenWidth = Dimensions.get("window").width;

const DashboardScreen = () => {
  const chartData = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [
      {
        data: [0, 45, 0, 60, 45, 90, 0],
        color: (opacity = 1) => `rgba(138, 43, 226, ${opacity})`, // Morado eléctrico
        strokeWidth: 3
      }
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hola, Gato Fuerte 🐾</Text>
      
      <Card title="Próximo entrenamiento" style={styles.nextWorkoutCard}>
        <View style={styles.workoutInfo}>
          <View>
            <Text style={styles.workoutName}>Tren Superior (Fuerza)</Text>
            <Text style={styles.workoutDetail}>Hoy • 60 min</Text>
          </View>
          <View style={styles.playButton}>
            <Play color="#fff" size={20} fill="#fff" />
          </View>
        </View>
      </Card>

      <Card title="Actividad Semanal">
        <LineChart
          data={chartData}
          width={screenWidth - 80} // padding from card and screen
          height={220}
          chartConfig={{
            backgroundColor: "#16161E",
            backgroundGradientFrom: "#16161E",
            backgroundGradientTo: "#16161E",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(138, 43, 226, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#B266FF"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            marginLeft: -10
          }}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0E',
    padding: 20,
  },
  greeting: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  nextWorkoutCard: {
    borderColor: '#8A2BE2',
    borderWidth: 1.5,
  },
  workoutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  workoutDetail: {
    color: '#A0A0B0',
    fontSize: 14,
    marginTop: 4,
  },
  playButton: {
    backgroundColor: '#8A2BE2',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  }
});

export default DashboardScreen;
