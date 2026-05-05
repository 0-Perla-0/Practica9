import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { Clock, Calendar as CalendarIcon } from 'lucide-react-native';
import Card from '../components/Card';

const historialMock = [
  {
    title: 'Esta Semana',
    data: [
      { id: '1', nombre: 'Empuje', fecha: 'Hoy', duracion: '1h 5m', volumen: '4,500 kg' },
      { id: '2', nombre: 'Día de Pierna', fecha: 'Ayer', duracion: '1h 15m', volumen: '6,200 kg' },
    ]
  },
  {
    title: 'Semana Pasada',
    data: [
      { id: '3', nombre: 'Tracción', fecha: 'Jueves', duracion: '55m', volumen: '3,800 kg' },
      { id: '4', nombre: 'HIIT Felino', fecha: 'Martes', duracion: '30m', volumen: 'N/A' },
    ]
  }
];

const HistorialScreen = () => {
  const renderItem = ({ item }) => (
    <Card style={styles.cardItem}>
      <Text style={styles.workoutName}>{item.nombre}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <CalendarIcon color="#A0A0B0" size={16} />
          <Text style={styles.statText}>{item.fecha}</Text>
        </View>
        <View style={styles.statRow}>
          <Clock color="#A0A0B0" size={16} />
          <Text style={styles.statText}>{item.duracion}</Text>
        </View>
      </View>
      
      <View style={styles.volumenBadge}>
        <Text style={styles.volumenText}>Vol: {item.volumen}</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Historial</Text>
      <SectionList
        sections={historialMock}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0E',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 0,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  cardItem: {
    marginBottom: 10,
    padding: 16,
  },
  workoutName: {
    color: '#E0E0E0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: '#A0A0B0',
    fontSize: 14,
  },
  volumenBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  volumenText: {
    color: '#D1A3FF',
    fontSize: 12,
    fontWeight: '500',
  }
});

export default HistorialScreen;
