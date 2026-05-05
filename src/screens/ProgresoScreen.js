import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, Scale, Activity } from 'lucide-react-native';
import Card from '../components/Card';

const ProgresoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Tu Progreso</Text>
      
      <View style={styles.metricsRow}>
        <Card style={styles.metricCard}>
          <Scale color="#8A2BE2" size={28} />
          <Text style={styles.metricValue}>75.5</Text>
          <Text style={styles.metricLabel}>Peso (kg)</Text>
        </Card>
        
        <Card style={styles.metricCard}>
          <Activity color="#8A2BE2" size={28} />
          <Text style={styles.metricValue}>14%</Text>
          <Text style={styles.metricLabel}>Grasa Corp.</Text>
        </Card>
      </View>

      <Card title="Racha Actual">
        <View style={styles.streakContainer}>
          <TrendingUp color="#00FF7F" size={32} />
          <View style={styles.streakTextContainer}>
            <Text style={styles.streakValue}>4 Semanas</Text>
            <Text style={styles.streakSubtext}>¡Sigue así, tigre!</Text>
          </View>
        </View>
      </Card>

      <Card title="Récords Personales">
        <View style={styles.prRow}>
          <Text style={styles.prName}>Press de Banca</Text>
          <Text style={styles.prValue}>100 kg</Text>
        </View>
        <View style={styles.prDivider} />
        <View style={styles.prRow}>
          <Text style={styles.prName}>Sentadilla</Text>
          <Text style={styles.prValue}>140 kg</Text>
        </View>
        <View style={styles.prDivider} />
        <View style={styles.prRow}>
          <Text style={styles.prName}>Peso Muerto</Text>
          <Text style={styles.prValue}>160 kg</Text>
        </View>
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
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 0,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricCard: {
    flex: 0.48,
    alignItems: 'center',
    paddingVertical: 24,
  },
  metricValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  metricLabel: {
    color: '#A0A0B0',
    fontSize: 14,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakTextContainer: {
    marginLeft: 16,
  },
  streakValue: {
    color: '#00FF7F',
    fontSize: 22,
    fontWeight: 'bold',
  },
  streakSubtext: {
    color: '#A0A0B0',
    fontSize: 14,
    marginTop: 4,
  },
  prRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  prName: {
    color: '#E0E0E0',
    fontSize: 16,
  },
  prValue: {
    color: '#D1A3FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  prDivider: {
    height: 1,
    backgroundColor: '#2A2A3A',
    marginVertical: 4,
  }
});

export default ProgresoScreen;
