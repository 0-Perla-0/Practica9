import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Alert, ScrollView } from 'react-native';
import { ChevronRight, Play, Square, Timer, CheckCircle2, Dumbbell } from 'lucide-react-native';
import Card from '../components/Card';
import { rutinasData } from '../data/rutinas';
import { ejerciciosData } from '../data/ejercicios';
import { saveSession, savePR } from '../storage/storage';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const EntrenarScreen = () => {
  const [rutinas] = useState(rutinasData);
  const [activeRoutine, setActiveRoutine] = useState(null);
  
  // Active Training States
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [workoutData, setWorkoutData] = useState([]); // Array of exercises with sets
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const sessionInterval = useRef(null);
  const restInterval = useRef(null);

  // Start Workout
  const handleStartRoutine = (rutina) => {
    // Preparar estructura de datos
    const preparedData = rutina.ejercicios.map(rej => {
      const dbExercise = ejerciciosData.find(e => e.id === rej.ejercicioId);
      // Generar sets vacíos según lo recomendado
      const sets = Array.from({ length: rej.sets }).map((_, i) => ({
        id: `set_${i}`,
        reps: '',
        weight: '',
        completed: false
      }));
      return {
        id: rej.idCustom || rej.ejercicioId, // unique per workout
        ejercicioId: rej.ejercicioId,
        nombre: dbExercise ? dbExercise.nombre : 'Ejercicio Desconocido',
        sets
      };
    });

    setWorkoutData(preparedData);
    setActiveRoutine(rutina);
    setSessionSeconds(0);
    setRestSeconds(0);
    setIsResting(false);
    
    sessionInterval.current = setInterval(() => {
      setSessionSeconds(prev => prev + 1);
    }, 1000);
  };

  const handleFinishWorkout = async () => {
    clearInterval(sessionInterval.current);
    clearInterval(restInterval.current);

    // Calcular volumen total y guardar
    let totalVolume = 0;
    let totalSetsCompleted = 0;

    workoutData.forEach(ej => {
      ej.sets.forEach(set => {
        if (set.completed && set.weight && set.reps) {
          totalVolume += (parseFloat(set.weight) * parseInt(set.reps, 10));
          totalSetsCompleted++;
          // Guardar PR potencialmente
          savePR(ej.ejercicioId, parseFloat(set.weight));
        }
      });
    });

    const sessionRecord = {
      routineName: activeRoutine.nombre,
      duration: sessionSeconds,
      volume: totalVolume,
      setsCompleted: totalSetsCompleted,
      exercises: workoutData // Guardamos detalle por si acaso
    };

    try {
      await saveSession(sessionRecord);
      setSummaryData(sessionRecord);
      setShowSummary(true);
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar la sesión');
    }
  };

  const closeSummary = () => {
    setShowSummary(false);
    setActiveRoutine(null);
    setWorkoutData([]);
  };

  // Set management
  const updateSet = (exerciseIndex, setIndex, field, value) => {
    const newData = [...workoutData];
    newData[exerciseIndex].sets[setIndex][field] = value;
    setWorkoutData(newData);
  };

  const toggleSetComplete = (exerciseIndex, setIndex) => {
    const newData = [...workoutData];
    const isCompleted = !newData[exerciseIndex].sets[setIndex].completed;
    newData[exerciseIndex].sets[setIndex].completed = isCompleted;
    setWorkoutData(newData);

    if (isCompleted) {
      // Iniciar descanso (ej. 60s por defecto)
      startRestTimer(60);
    }
  };

  const startRestTimer = (seconds) => {
    clearInterval(restInterval.current);
    setRestSeconds(seconds);
    setIsResting(true);
    
    restInterval.current = setInterval(() => {
      setRestSeconds(prev => {
        if (prev <= 1) {
          clearInterval(restInterval.current);
          setIsResting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRestTimer = () => {
    clearInterval(restInterval.current);
    setIsResting(false);
    setRestSeconds(0);
  };

  useEffect(() => {
    return () => {
      clearInterval(sessionInterval.current);
      clearInterval(restInterval.current);
    };
  }, []);

  // --- RENDER RUTINAS LIST ---
  const renderRutina = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleStartRoutine(item)}>
      <Card style={styles.cardItem}>
        <View style={styles.rutinaHeader}>
          <View style={styles.tipoBadge}>
            <Text style={styles.tipoText}>{item.nivel}</Text>
          </View>
          <Text style={styles.duracionText}>{item.duracion_estimada} min</Text>
        </View>
        <View style={styles.rutinaBody}>
          <Text style={styles.rutinaNombre}>{item.nombre}</Text>
          <Play color="#00FF7F" size={24} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  // --- MAIN RENDER ---
  if (activeRoutine) {
    return (
      <View style={styles.activeContainer}>
        {/* Active Header */}
        <View style={styles.activeHeader}>
          <View>
            <Text style={styles.activeTitle}>{activeRoutine.nombre}</Text>
            <Text style={styles.timerText}>{formatTime(sessionSeconds)}</Text>
          </View>
          <TouchableOpacity style={styles.finishBtn} onPress={handleFinishWorkout}>
            <Square color="#fff" size={16} fill="#fff" />
            <Text style={styles.finishBtnText}>Finalizar</Text>
          </TouchableOpacity>
        </View>

        {/* Rest Timer Banner */}
        {isResting && (
          <TouchableOpacity style={[styles.restBanner, restSeconds === 0 && styles.restBannerAlert]} onPress={stopRestTimer}>
            <Timer color="#fff" size={20} />
            <Text style={styles.restText}>
              Descanso: {formatTime(restSeconds)} {restSeconds === 0 ? '- ¡A DARLE!' : ''}
            </Text>
            <Text style={styles.skipRestText}>Omitir</Text>
          </TouchableOpacity>
        )}

        {/* Exercises List */}
        <ScrollView style={styles.exercisesScroll} showsVerticalScrollIndicator={false}>
          {workoutData.map((exercise, eIndex) => (
            <View key={exercise.id} style={styles.exerciseBlock}>
              <Text style={styles.exerciseName}>{exercise.nombre}</Text>
              
              {/* Table Header */}
              <View style={styles.setHeaderRow}>
                <Text style={[styles.setCol, styles.colSet]}>Set</Text>
                <Text style={[styles.setCol, styles.colInput]}>kg</Text>
                <Text style={[styles.setCol, styles.colInput]}>Reps</Text>
                <Text style={[styles.setCol, styles.colCheck]}></Text>
              </View>

              {/* Sets Rows */}
              {exercise.sets.map((set, sIndex) => (
                <View key={set.id} style={[styles.setRow, set.completed && styles.setRowCompleted]}>
                  <Text style={[styles.setCol, styles.colSet, set.completed && styles.textCompleted]}>
                    {sIndex + 1}
                  </Text>
                  
                  <TextInput
                    style={[styles.input, styles.colInput, set.completed && styles.inputCompleted]}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#A0A0B0"
                    value={set.weight}
                    onChangeText={(val) => updateSet(eIndex, sIndex, 'weight', val)}
                    editable={!set.completed}
                  />
                  
                  <TextInput
                    style={[styles.input, styles.colInput, set.completed && styles.inputCompleted]}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#A0A0B0"
                    value={set.reps}
                    onChangeText={(val) => updateSet(eIndex, sIndex, 'reps', val)}
                    editable={!set.completed}
                  />

                  <TouchableOpacity 
                    style={[styles.colCheck, styles.checkBtn, set.completed && styles.checkBtnActive]}
                    onPress={() => toggleSetComplete(eIndex, sIndex)}
                  >
                    <CheckCircle2 color={set.completed ? "#00FF7F" : "#A0A0B0"} size={24} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
          <View style={{height: 100}}/>
        </ScrollView>

        {/* Summary Modal */}
        <Modal visible={showSummary} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.summaryContent}>
              <View style={styles.summaryIconBox}>
                <Dumbbell color="#8A2BE2" size={40} />
              </View>
              <Text style={styles.summaryTitle}>¡Entrenamiento Completado!</Text>
              <Text style={styles.summarySubtitle}>Gran trabajo felino.</Text>

              <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{formatTime(summaryData?.duration || 0)}</Text>
                  <Text style={styles.statLabel}>Tiempo</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{summaryData?.volume || 0} kg</Text>
                  <Text style={styles.statLabel}>Volumen</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{summaryData?.setsCompleted || 0}</Text>
                  <Text style={styles.statLabel}>Sets</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.doneBtn} onPress={closeSummary}>
                <Text style={styles.doneBtnText}>Cerrar y Volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    );
  }

  // --- DEFAULT VIEW ---
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Tus Rutinas</Text>
      <FlatList
        data={rutinas}
        renderItem={renderRutina}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', margin: 20, marginBottom: 10 },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  cardItem: { marginBottom: 12 },
  rutinaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  tipoBadge: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 12, borderWidth: 1, borderColor: 'rgba(138, 43, 226, 0.5)',
  },
  tipoText: { color: '#D1A3FF', fontSize: 12, fontWeight: '600' },
  duracionText: { color: '#A0A0B0', fontSize: 12 },
  rutinaBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rutinaNombre: { color: '#E0E0E0', fontSize: 18, fontWeight: 'bold', flex: 1 },

  // Active Training Styles
  activeContainer: { flex: 1, backgroundColor: '#0B0B0E' },
  activeHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, backgroundColor: '#16161E', borderBottomWidth: 1, borderBottomColor: '#2A2A3A'
  },
  activeTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  timerText: { color: '#00FF7F', fontSize: 24, fontWeight: 'bold', fontVariant: ['tabular-nums'] },
  finishBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF4500',
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, gap: 6
  },
  finishBtnText: { color: '#fff', fontWeight: 'bold' },
  
  restBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(138,43,226,0.8)',
    padding: 12, paddingHorizontal: 20, gap: 10
  },
  restBannerAlert: {
    backgroundColor: 'rgba(255,69,0,0.8)', borderWidth: 2, borderColor: '#FF0000',
  },
  restText: { color: '#fff', fontWeight: 'bold', fontSize: 16, flex: 1 },
  skipRestText: { color: '#E0E0E0', textDecorationLine: 'underline' },

  exercisesScroll: { flex: 1, padding: 20 },
  exerciseBlock: {
    backgroundColor: '#16161E', borderRadius: 16, padding: 16, marginBottom: 20,
    borderWidth: 1, borderColor: '#2A2A3A'
  },
  exerciseName: { color: '#D1A3FF', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  
  setHeaderRow: { flexDirection: 'row', marginBottom: 8, paddingHorizontal: 8 },
  setCol: { color: '#A0A0B0', fontSize: 14, fontWeight: '600' },
  colSet: { width: 40, textAlign: 'center' },
  colInput: { flex: 1, textAlign: 'center' },
  colCheck: { width: 50, alignItems: 'center' },

  setRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 8,
    borderRadius: 8, marginBottom: 4
  },
  setRowCompleted: { backgroundColor: 'rgba(0,255,127,0.1)' },
  textCompleted: { color: '#00FF7F', textDecorationLine: 'line-through' },
  input: {
    backgroundColor: '#0B0B0E', color: '#fff', borderRadius: 8, padding: 8,
    textAlign: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: '#2A2A3A'
  },
  inputCompleted: { color: '#00FF7F', borderColor: 'transparent', backgroundColor: 'transparent' },
  checkBtn: { padding: 4 },
  checkBtnActive: { opacity: 1 },

  // Summary Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  summaryContent: {
    backgroundColor: '#16161E', width: '100%', borderRadius: 24, padding: 30,
    alignItems: 'center', borderWidth: 1, borderColor: '#8A2BE2'
  },
  summaryIconBox: { backgroundColor: 'rgba(138,43,226,0.2)', padding: 20, borderRadius: 40, marginBottom: 20 },
  summaryTitle: { color: '#00FF7F', fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  summarySubtitle: { color: '#A0A0B0', fontSize: 16, marginBottom: 24 },
  
  statsContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: 30 },
  statBox: { alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { color: '#A0A0B0', fontSize: 12, textTransform: 'uppercase' },

  doneBtn: { backgroundColor: '#8A2BE2', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16, width: '100%', alignItems: 'center' },
  doneBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default EntrenarScreen;
