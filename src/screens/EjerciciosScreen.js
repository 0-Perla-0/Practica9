import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Search, Dumbbell, Zap, TriangleAlert, X } from 'lucide-react-native';
import Card from '../components/Card';
import { ejerciciosData } from '../data/ejercicios';

const EjerciciosScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedEjercicio, setSelectedEjercicio] = useState(null);

  const filteredEjercicios = ejerciciosData.filter(ej => 
    ej.nombre.toLowerCase().includes(search.toLowerCase()) || 
    ej.musculo.toLowerCase().includes(search.toLowerCase())
  );

  const renderEjercicio = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedEjercicio(item)}>
      <Card style={styles.cardItem}>
        <View style={styles.iconContainer}>
          <Dumbbell color="#8A2BE2" size={24} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nombreText}>{item.nombre}</Text>
          <Text style={styles.detalleText}>{item.musculo} • {item.equipo}</Text>
        </View>
      </Card>
    </TouchableOpacity>
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

      {/* Modal de Detalle */}
      <Modal
        visible={!!selectedEjercicio}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedEjercicio(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            {/* Header del Modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedEjercicio?.nombre}</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setSelectedEjercicio(null)}
              >
                <X color="#E0E0E0" size={24} />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Categoría y Equipo */}
              <View style={styles.tagsContainer}>
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>{selectedEjercicio?.musculo}</Text>
                </View>
                <View style={[styles.tagBadge, styles.tagBadgeAlt]}>
                  <Text style={styles.tagTextAlt}>{selectedEjercicio?.equipo}</Text>
                </View>
              </View>

              {/* Explicación */}
              <Text style={styles.sectionTitle}>Cómo ejecutarlo</Text>
              <Text style={styles.bodyText}>{selectedEjercicio?.explicacion}</Text>

              {/* Beneficios */}
              <View style={styles.infoSection}>
                <View style={styles.sectionHeader}>
                  <Zap color="#00FF7F" size={20} />
                  <Text style={[styles.sectionTitle, { color: '#00FF7F', marginTop: 0, marginLeft: 8 }]}>Beneficios</Text>
                </View>
                <Text style={styles.bodyText}>{selectedEjercicio?.beneficios}</Text>
              </View>

              {/* Contraindicaciones */}
              <View style={styles.infoSection}>
                <View style={styles.sectionHeader}>
                  <TriangleAlert color="#FF4500" size={20} />
                  <Text style={[styles.sectionTitle, { color: '#FF4500', marginTop: 0, marginLeft: 8 }]}>Contraindicaciones</Text>
                </View>
                <Text style={styles.bodyText}>{selectedEjercicio?.contraindicaciones}</Text>
              </View>
              
              <View style={{ height: 20 }} />
            </ScrollView>
            
          </View>
        </View>
      </Modal>
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
  },
  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#16161E',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '60%',
    maxHeight: '90%',
    padding: 24,
    borderTopWidth: 1,
    borderColor: '#8A2BE2',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#2A2A3A',
    padding: 8,
    borderRadius: 20,
    marginLeft: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 10,
  },
  tagBadge: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.5)',
  },
  tagText: {
    color: '#D1A3FF',
    fontSize: 14,
    fontWeight: '600',
  },
  tagBadgeAlt: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tagTextAlt: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  bodyText: {
    color: '#A0A0B0',
    fontSize: 15,
    lineHeight: 22,
  },
  infoSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#2A2A3A',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  }
});

export default EjerciciosScreen;
