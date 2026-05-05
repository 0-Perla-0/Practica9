import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Calendar as CalendarIcon, Clock, Activity, ChevronRight, X } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';
import Card from '../components/Card';
import { getSessions } from '../storage/storage';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
};

const getWeekNumber = (d) => {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

const HistorialScreen = () => {
  const [groupedSessions, setGroupedSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadSessions();
    }
  }, [isFocused]);

  const loadSessions = async () => {
    const sessions = await getSessions();
    
    // Agrupar por semana
    const groups = {};
    sessions.forEach(session => {
      const date = new Date(session.date);
      const weekNum = getWeekNumber(date);
      const year = date.getFullYear();
      const groupKey = `Semana ${weekNum}, ${year}`;
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(session);
    });

    const formattedGroups = Object.keys(groups).map(key => ({
      title: key,
      data: groups[key]
    }));

    setGroupedSessions(formattedGroups);
  };

  const renderSession = (item) => (
    <TouchableOpacity key={item.id} activeOpacity={0.8} onPress={() => setSelectedSession(item)}>
      <Card style={styles.cardItem}>
        <View style={styles.cardHeader}>
          <Text style={styles.rutinaNombre}>{item.routineName}</Text>
          <Text style={styles.fechaText}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.statChip}>
            <Clock color="#A0A0B0" size={14} />
            <Text style={styles.statText}>{formatTime(item.duration)}</Text>
          </View>
          <View style={styles.statChip}>
            <Activity color="#A0A0B0" size={14} />
            <Text style={styles.statText}>{item.volume} kg</Text>
          </View>
          <ChevronRight color="#8A2BE2" size={20} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderGroup = ({ item }) => (
    <View style={styles.groupContainer}>
      <Text style={styles.groupTitle}>{item.title}</Text>
      {item.data.map(session => renderSession(session))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Historial</Text>
      
      {groupedSessions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <CalendarIcon color="#2A2A3A" size={64} />
          <Text style={styles.emptyText}>Aún no hay entrenamientos registrados.</Text>
        </View>
      ) : (
        <FlatList
          data={groupedSessions}
          renderItem={renderGroup}
          keyExtractor={item => item.title}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Detalle Modal */}
      <Modal visible={!!selectedSession} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{selectedSession?.routineName}</Text>
                <Text style={styles.modalSubtitle}>{selectedSession && formatDate(selectedSession.date)}</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedSession(null)}>
                <X color="#E0E0E0" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.summaryStatsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{selectedSession && formatTime(selectedSession.duration)}</Text>
                <Text style={styles.statLabel}>Duración</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{selectedSession?.volume} kg</Text>
                <Text style={styles.statLabel}>Volumen</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{selectedSession?.setsCompleted}</Text>
                <Text style={styles.statLabel}>Sets</Text>
              </View>
            </View>

            <ScrollView style={styles.detailsScroll} showsVerticalScrollIndicator={false}>
              {selectedSession?.exercises && selectedSession.exercises.map(exercise => {
                const completedSets = exercise.sets.filter(s => s.completed);
                if (completedSets.length === 0) return null;
                
                return (
                  <View key={exercise.id} style={styles.exerciseBlock}>
                    <Text style={styles.exerciseName}>{exercise.nombre}</Text>
                    <View style={styles.setHeaderRow}>
                      <Text style={[styles.setCol, styles.colSet]}>Set</Text>
                      <Text style={[styles.setCol, styles.colData]}>Peso</Text>
                      <Text style={[styles.setCol, styles.colData]}>Reps</Text>
                    </View>
                    {completedSets.map((set, sIdx) => (
                      <View key={set.id} style={styles.setRow}>
                        <Text style={[styles.setText, styles.colSet]}>{sIdx + 1}</Text>
                        <Text style={[styles.setText, styles.colData]}>{set.weight} kg</Text>
                        <Text style={[styles.setText, styles.colData]}>{set.reps}</Text>
                      </View>
                    ))}
                  </View>
                );
              })}
              <View style={{height: 40}}/>
            </ScrollView>

          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', margin: 20, marginBottom: 10 },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { color: '#A0A0B0', fontSize: 16, textAlign: 'center', marginTop: 16 },

  groupContainer: { marginBottom: 24 },
  groupTitle: { color: '#8A2BE2', fontSize: 16, fontWeight: 'bold', marginBottom: 12, textTransform: 'uppercase' },
  
  cardItem: { marginBottom: 12, padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  rutinaNombre: { color: '#E0E0E0', fontSize: 18, fontWeight: 'bold', flex: 1 },
  fechaText: { color: '#A0A0B0', fontSize: 14, textTransform: 'capitalize' },
  
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  statChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16161E', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, gap: 6 },
  statText: { color: '#E0E0E0', fontSize: 13, fontWeight: '600' },

  // Modal Detail
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#16161E', borderTopLeftRadius: 24, borderTopRightRadius: 24, height: '85%', padding: 24, borderTopWidth: 1, borderColor: '#8A2BE2' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  modalTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  modalSubtitle: { color: '#A0A0B0', fontSize: 14, textTransform: 'capitalize' },
  closeButton: { backgroundColor: '#2A2A3A', padding: 8, borderRadius: 20 },

  summaryStatsRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0B0B0E', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#2A2A3A', marginBottom: 24 },
  statBox: { alignItems: 'center', flex: 1 },
  statValue: { color: '#00FF7F', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { color: '#A0A0B0', fontSize: 12, textTransform: 'uppercase' },

  detailsScroll: { flex: 1 },
  exerciseBlock: { backgroundColor: '#0B0B0E', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#2A2A3A' },
  exerciseName: { color: '#D1A3FF', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  
  setHeaderRow: { flexDirection: 'row', marginBottom: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#2A2A3A' },
  setCol: { color: '#A0A0B0', fontSize: 13, fontWeight: '600' },
  colSet: { width: 40, textAlign: 'center' },
  colData: { flex: 1, textAlign: 'center' },
  
  setRow: { flexDirection: 'row', paddingVertical: 6 },
  setText: { color: '#E0E0E0', fontSize: 15 }
});

export default HistorialScreen;
