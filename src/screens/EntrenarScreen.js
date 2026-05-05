import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Card from '../components/Card';

const rutinasMock = [
  { id: '1', nombre: 'Empuje (Pecho, Hombros, Tríceps)', tipo: 'Tren Superior', duracion: '60 min' },
  { id: '2', nombre: 'Tracción (Espalda, Bíceps)', tipo: 'Tren Superior', duracion: '55 min' },
  { id: '3', nombre: 'Día de Pierna', tipo: 'Tren Inferior', duracion: '70 min' },
  { id: '4', nombre: 'HIIT Felino', tipo: 'Cardio', duracion: '30 min' },
];

const EntrenarScreen = () => {
  const renderRutina = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8}>
      <Card>
        <View style={styles.rutinaHeader}>
          <View style={styles.tipoBadge}>
            <Text style={styles.tipoText}>{item.tipo}</Text>
          </View>
          <Text style={styles.duracionText}>{item.duracion}</Text>
        </View>
        <View style={styles.rutinaBody}>
          <Text style={styles.rutinaNombre}>{item.nombre}</Text>
          <ChevronRight color="#8A2BE2" size={24} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Tus Rutinas</Text>
      <FlatList
        data={rutinasMock}
        renderItem={renderRutina}
        keyExtractor={item => item.id}
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
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  rutinaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipoBadge: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.5)',
  },
  tipoText: {
    color: '#D1A3FF',
    fontSize: 12,
    fontWeight: '600',
  },
  duracionText: {
    color: '#A0A0B0',
    fontSize: 12,
  },
  rutinaBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rutinaNombre: {
    color: '#E0E0E0',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  }
});

export default EntrenarScreen;
