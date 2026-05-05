import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { Search, Dumbbell } from 'lucide-react-native';
import Card from '../components/Card';

const ejerciciosMock = [
  { id: '1', nombre: 'Press de Banca', musculo: 'Pecho', equipo: 'Barra' },
  { id: '2', nombre: 'Sentadilla', musculo: 'Piernas', equipo: 'Barra' },
  { id: '3', nombre: 'Peso Muerto', musculo: 'Espalda/Piernas', equipo: 'Barra' },
  { id: '4', nombre: 'Dominadas', musculo: 'Espalda', equipo: 'Peso Corporal' },
  { id: '5', nombre: 'Curl de Bíceps', musculo: 'Bíceps', equipo: 'Mancuernas' },
];

const EjerciciosScreen = () => {
  const [search, setSearch] = useState('');

  const filteredEjercicios = ejerciciosMock.filter(ej => 
    ej.nombre.toLowerCase().includes(search.toLowerCase()) || 
    ej.musculo.toLowerCase().includes(search.toLowerCase())
  );

  const renderEjercicio = ({ item }) => (
    <Card style={styles.cardItem}>
      <View style={styles.iconContainer}>
        <Dumbbell color="#8A2BE2" size={24} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nombreText}>{item.nombre}</Text>
        <Text style={styles.detalleText}>{item.musculo} • {item.equipo}</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Ejercicios</Text>
      
      <View style={styles.searchContainer}>
        <Search color="#A0A0B0" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o músculo..."
          placeholderTextColor="#A0A0B0"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredEjercicios}
        renderItem={renderEjercicio}
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
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16161E',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A3A',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    padding: 10,
    borderRadius: 10,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  nombreText: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detalleText: {
    color: '#A0A0B0',
    fontSize: 14,
  }
});

export default EjerciciosScreen;
