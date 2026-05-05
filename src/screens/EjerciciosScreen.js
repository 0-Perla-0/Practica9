import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Modal, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Search, Dumbbell, Zap, TriangleAlert, X, PlusCircle, Filter } from 'lucide-react-native';
import Card from '../components/Card';
import { ejerciciosData } from '../data/ejercicios';
import { fetchExerciseGif, PlaceholderSVG } from '../services/exerciseService';

const EjerciciosScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedEjercicio, setSelectedEjercicio] = useState(null);
  
  // States para el modal
  const [gifUrl, setGifUrl] = useState(null);
  const [loadingGif, setLoadingGif] = useState(false);
  const [gifError, setGifError] = useState(false);

  // States para filtros
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filterOptions = ['Todos', 'Fuerza', 'Cardio', 'HIIT', 'Movilidad', 'Principiante', 'Intermedio', 'Avanzado'];

  const filteredEjercicios = ejerciciosData.filter(ej => {
    const matchesSearch = ej.nombre.toLowerCase().includes(search.toLowerCase()) || 
                          ej.musculo.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeFilter === 'Todos') return true;
    
    // Si el filtro es categoría
    if (['Fuerza', 'Cardio', 'HIIT', 'Movilidad'].includes(activeFilter)) {
      return ej.categoria === activeFilter;
    }
    
    // Si el filtro es dificultad
    if (['Principiante', 'Intermedio', 'Avanzado'].includes(activeFilter)) {
      return ej.dificultad === activeFilter;
    }

    return true;
  });

  const handleOpenEjercicio = async (ejercicio) => {
    setSelectedEjercicio(ejercicio);
    setGifUrl(null);
    setGifError(false);
    
    if (ejercicio.exerciseDbId) {
      setLoadingGif(true);
      try {
        const url = await fetchExerciseGif(ejercicio.exerciseDbId);
        setGifUrl(url);
      } catch (error) {
        setGifError(true);
      } finally {
        setLoadingGif(false);
      }
    } else {
      setGifError(true);
    }
  };

  const renderFilter = ({ item }) => (
    <TouchableOpacity 
      style={[styles.filterChip, activeFilter === item && styles.filterChipActive]}
      onPress={() => setActiveFilter(item)}
    >
      <Text style={[styles.filterChipText, activeFilter === item && styles.filterChipTextActive]}>{item}</Text>
    </TouchableOpacity>
  );

  const renderEjercicio = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleOpenEjercicio(item)}>
      <Card style={styles.cardItem}>
        <View style={styles.iconContainer}>
          <Dumbbell color="#8A2BE2" size={24} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nombreText}>{item.nombre}</Text>
          <Text style={styles.detalleText}>{item.musculo} • {item.equipo}</Text>
          <View style={styles.miniTagsContainer}>
            <Text style={styles.miniTag}>{item.dificultad}</Text>
            <Text style={styles.miniTag}>{item.categoria}</Text>
          </View>
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

      <View style={styles.filtersWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filterOptions}
          renderItem={renderFilter}
          keyExtractor={item => item}
          contentContainerStyle={styles.filtersContainer}
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
              
              {/* Media Section: GIF o Placeholder */}
              <View style={styles.mediaContainer}>
                {loadingGif ? (
                  <ActivityIndicator size="large" color="#8A2BE2" style={styles.loader} />
                ) : gifUrl && !gifError ? (
                  <Image source={{ uri: gifUrl }} style={styles.gifImage} resizeMode="contain" />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <PlaceholderSVG />
                  </View>
                )}
              </View>

              {/* Categoría y Equipo */}
              <View style={styles.tagsContainer}>
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>{selectedEjercicio?.musculo}</Text>
                </View>
                <View style={[styles.tagBadge, styles.tagBadgeAlt]}>
                  <Text style={styles.tagTextAlt}>{selectedEjercicio?.equipo}</Text>
                </View>
                <View style={[styles.tagBadge, {borderColor: '#00FF7F', backgroundColor: 'rgba(0,255,127,0.1)'}]}>
                  <Text style={[styles.tagTextAlt, {color: '#00FF7F'}]}>{selectedEjercicio?.dificultad}</Text>
                </View>
              </View>

              {/* Recomendaciones (Sets, Reps, Descanso) */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{selectedEjercicio?.sets_recomendados}</Text>
                  <Text style={styles.statLabel}>Sets</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{selectedEjercicio?.reps_recomendadas}</Text>
                  <Text style={styles.statLabel}>Reps</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{selectedEjercicio?.descanso_segundos}s</Text>
                  <Text style={styles.statLabel}>Descanso</Text>
                </View>
              </View>

              {/* Pasos */}
              <Text style={styles.sectionTitle}>Cómo ejecutarlo</Text>
              <View style={styles.stepsContainer}>
                {selectedEjercicio?.pasos && selectedEjercicio.pasos.map((paso, index) => (
                  <Text key={index} style={styles.stepText}>{paso}</Text>
                ))}
                {!selectedEjercicio?.pasos && (
                  <Text style={styles.bodyText}>{selectedEjercicio?.explicacion}</Text>
                )}
              </View>

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

              <TouchableOpacity style={styles.addButton}>
                <PlusCircle color="#16161E" size={20} />
                <Text style={styles.addButtonText}>Agregar al entrenamiento de hoy</Text>
              </TouchableOpacity>
              
              <View style={{ height: 40 }} />
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
    marginBottom: 16,
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
  filtersWrapper: {
    marginBottom: 16,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#16161E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A3A',
  },
  filterChipActive: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    borderColor: '#8A2BE2',
  },
  filterChipText: {
    color: '#A0A0B0',
    fontSize: 14,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#D1A3FF',
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
    marginBottom: 4,
  },
  miniTagsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  miniTag: {
    fontSize: 10,
    color: '#D1A3FF',
    backgroundColor: 'rgba(138,43,226,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden'
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
    height: '90%',
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
  mediaContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#0B0B0E',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(138,43,226,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  loader: {
    flex: 1,
  },
  gifImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 10,
    flexWrap: 'wrap',
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: '#0B0B0E',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A3A',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#00FF7F',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#A0A0B0',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
  },
  stepsContainer: {
    marginBottom: 16,
  },
  stepText: {
    color: '#E0E0E0',
    fontSize: 15,
    lineHeight: 24,
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
  },
  addButton: {
    backgroundColor: '#00FF7F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    gap: 8,
  },
  addButtonText: {
    color: '#16161E',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default EjerciciosScreen;
