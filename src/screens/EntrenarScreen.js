import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Alert, ScrollView } from 'react-native';
import { ChevronRight, Play, Square, Timer, CheckCircle2, Dumbbell, Plus, Info, AlertTriangle, Check } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';
import Card from '../components/Card';
import { rutinasData } from '../data/rutinas';
import { ejerciciosData } from '../data/ejercicios';
import { saveSession, savePR, getRoutines, saveRoutine } from '../storage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const DIAS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

export default function EntrenarScreen() {
  const isFocused = useIsFocused();
  
  // Tabs & Lists
  const [activeTab, setActiveTab] = useState('Recomendadas'); // 'Recomendadas' | 'MisRutinas'
  const [customRoutines, setCustomRoutines] = useState([]);
  const [activePlan, setActivePlan] = useState(null); // Plan activo para la semana
  
  // Creator States
  const [showCreator, setShowCreator] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState('');
  const [newRoutineDays, setNewRoutineDays] = useState({
    Lunes: { tipo: 'descanso', ejercicios: [] },
    Martes: { tipo: 'descanso', ejercicios: [] },
    Miercoles: { tipo: 'descanso', ejercicios: [] },
    Jueves: { tipo: 'descanso', ejercicios: [] },
    Viernes: { tipo: 'descanso', ejercicios: [] },
    Sabado: { tipo: 'descanso', ejercicios: [] },
    Domingo: { tipo: 'descanso', ejercicios: [] },
  });
  
  // Exercise Picker for Creator
  const [showPicker, setShowPicker] = useState(false);
  const [pickerDay, setPickerDay] = useState('');

  // Active Workout States
  const [activeWorkoutData, setActiveWorkoutData] = useState(null);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const sessionInterval = useRef(null);
  const restInterval = useRef(null);

  useEffect(() => {
    if (isFocused) {
      loadUserData();
    }
  }, [isFocused]);

  const loadUserData = async () => {
    const routines = await getRoutines();
    setCustomRoutines(routines);
    const active = await AsyncStorage.getItem('@fitcat_active_plan');
    if (active) {
      setActivePlan(JSON.parse(active));
    }
  };

  const setAsActivePlan = async (plan) => {
    await AsyncStorage.setItem('@fitcat_active_plan', JSON.stringify(plan));
    setActivePlan(plan);
    Alert.alert('¡Éxito!', `El plan "${plan.nombre}" es ahora tu rutina activa.`);
  };

  const getTodayWorkout = () => {
    if (!activePlan || !activePlan.dias_semana) return null;
    const todayIndex = new Date().getDay(); // 0=Dom, 1=Lun
    const todayName = todayIndex === 0 ? 'Domingo' : DIAS[todayIndex - 1];
    return activePlan.dias_semana[todayName];
  };

  // --- WORKOUT EXECUTION ---
  const handleStartToday = () => {
    const todayPlan = getTodayWorkout();
    if (!todayPlan || todayPlan.tipo === 'descanso' || !todayPlan.ejercicios || todayPlan.ejercicios.length === 0) {
      Alert.alert('Descanso', 'Hoy es día de descanso felino, ¡a dormir! 🐾');
      return;
    }

    const preparedData = todayPlan.ejercicios.map((rej, i) => {
      const dbExercise = ejerciciosData.find(e => e.id === rej.ejercicioId);
      const repsStr = rej.reps || '10';
      const setsCount = rej.sets || 3;
      const sets = Array.from({ length: setsCount }).map((_, idx) => ({
        id: `set_${idx}`, reps: repsStr.replace(/\D/g,'') || '10', weight: '', completed: false
      }));
      return {
        id: `${rej.ejercicioId}_${i}`,
        ejercicioId: rej.ejercicioId,
        nombre: dbExercise ? dbExercise.nombre : 'Ejercicio',
        sets
      };
    });

    setActiveWorkoutData({ nombre: todayPlan.nombre_dia || 'Entrenamiento de Hoy', ejercicios: preparedData });
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

    let totalVolume = 0;
    let totalSetsCompleted = 0;

    activeWorkoutData.ejercicios.forEach(ej => {
      ej.sets.forEach(set => {
        if (set.completed && set.weight && set.reps) {
          totalVolume += (parseFloat(set.weight) * parseInt(set.reps, 10));
          totalSetsCompleted++;
          savePR(ej.ejercicioId, parseFloat(set.weight));
        }
      });
    });

    const sessionRecord = {
      routineName: activePlan.nombre + ' - ' + activeWorkoutData.nombre,
      duration: sessionSeconds,
      volume: totalVolume,
      setsCompleted: totalSetsCompleted,
      exercises: activeWorkoutData.ejercicios
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
    setActiveWorkoutData(null);
  };

  const updateSet = (eIndex, sIndex, field, value) => {
    const newData = { ...activeWorkoutData };
    newData.ejercicios[eIndex].sets[sIndex][field] = value;
    setActiveWorkoutData(newData);
  };

  const toggleSetComplete = (eIndex, sIndex) => {
    const newData = { ...activeWorkoutData };
    const isCompleted = !newData.ejercicios[eIndex].sets[sIndex].completed;
    newData.ejercicios[eIndex].sets[sIndex].completed = isCompleted;
    setActiveWorkoutData(newData);

    if (isCompleted) {
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

  // --- CREATOR LOGIC ---
  const handleAddExerciseToDay = (ejercicio) => {
    const newDays = { ...newRoutineDays };
    newDays[pickerDay].tipo = 'entrenamiento';
    newDays[pickerDay].ejercicios.push({ ejercicioId: ejercicio.id, sets: 3, reps: '10' });
    setNewRoutineDays(newDays);
    setShowPicker(false);
  };

  const validateAndSaveRoutine = async () => {
    if (!newRoutineName) {
      Alert.alert('Error', 'Debes ponerle nombre a la rutina');
      return;
    }
    
    // Análisis Inteligente
    let strengthDaysRow = 0;
    let hasLegsPrev = false;
    let totalRestDays = 0;
    let warnings = [];

    for (let i = 0; i < DIAS.length; i++) {
      const day = newRoutineDays[DIAS[i]];
      if (day.tipo === 'descanso') {
        strengthDaysRow = 0;
        hasLegsPrev = false;
        totalRestDays++;
      } else {
        strengthDaysRow++;
        if (strengthDaysRow >= 4) {
          warnings.push(`Tienes 4 o más días seguidos de entrenamiento. Se recomienda descanso el ${DIAS[i]}.`);
        }
        
        let hasLegsToday = false;
        day.ejercicios.forEach(rej => {
          const e = ejerciciosData.find(ex => ex.id === rej.ejercicioId);
          if (e && (e.musculo.includes('Piernas') || e.musculo.includes('Glúteos'))) {
            hasLegsToday = true;
          }
        });

        if (hasLegsPrev && hasLegsToday) {
          warnings.push(`Tienes ejercicios de pierna el ${DIAS[i-1]} y ${DIAS[i]}. Se recomienda espaciarlos.`);
        }
        hasLegsPrev = hasLegsToday;
      }
    }

    if (totalRestDays === 0) {
      warnings.push('¡No tienes ningún día de descanso! El músculo crece mientras descansas.');
    }

    const proceedSave = async () => {
      const newRoutine = {
        nombre: newRoutineName,
        dias_semana: newRoutineDays,
        nivel: 'Personalizado',
        descripcion: 'Rutina creada por el usuario'
      };
      await saveRoutine(newRoutine);
      setShowCreator(false);
      setNewRoutineName('');
      loadUserData();
      Alert.alert('Guardado', 'Rutina personalizada guardada.');
    };

    if (warnings.length > 0) {
      Alert.alert(
        'Sugerencias Inteligentes 🧠',
        warnings.join('\n\n') + '\n\n¿Deseas guardar de todos modos?',
        [
          { text: 'Editar Rutina', style: 'cancel' },
          { text: 'Guardar Igual', onPress: proceedSave }
        ]
      );
    } else {
      proceedSave();
    }
  };

  // --- RENDERERS ---
  const renderRoutineCard = ({ item }) => (
    <Card style={styles.cardItem}>
      <View style={styles.rutinaHeader}>
        <View style={styles.tipoBadge}><Text style={styles.tipoText}>{item.nivel}</Text></View>
        <Text style={styles.duracionText}>{item.descripcion_cientifica ? 'Science-based' : 'Custom'}</Text>
      </View>
      <Text style={styles.rutinaNombre}>{item.nombre}</Text>
      <Text style={styles.rutinaDesc}>{item.descripcion}</Text>
      
      {item.descripcion_cientifica && (
        <View style={styles.scienceBox}>
          <Info color="#8A2BE2" size={16} />
          <Text style={styles.scienceText}>{item.descripcion_cientifica}</Text>
        </View>
      )}

      {/* Week preview */}
      <View style={styles.weekPreview}>
        {DIAS.map(d => {
          const isRest = item.dias_semana[d]?.tipo === 'descanso';
          return (
            <View key={d} style={[styles.dayDot, isRest && styles.dayDotRest]}>
              <Text style={[styles.dayDotText, isRest && styles.dayDotTextRest]}>{d.charAt(0)}</Text>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.usePlanBtn} onPress={() => setAsActivePlan(item)}>
        <Text style={styles.usePlanText}>Usar este plan</Text>
      </TouchableOpacity>
    </Card>
  );

  if (activeWorkoutData) {
    return (
      <View style={styles.activeContainer}>
        {/* Active Header */}
        <View style={styles.activeHeader}>
          <View>
            <Text style={styles.activeTitle}>{activeWorkoutData.nombre}</Text>
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

        <ScrollView style={styles.exercisesScroll} showsVerticalScrollIndicator={false}>
          {activeWorkoutData.ejercicios.map((exercise, eIndex) => (
            <View key={exercise.id} style={styles.exerciseBlock}>
              <Text style={styles.exerciseName}>{exercise.nombre}</Text>
              
              <View style={styles.setHeaderRow}>
                <Text style={[styles.setCol, styles.colSet]}>Set</Text>
                <Text style={[styles.setCol, styles.colInput]}>kg</Text>
                <Text style={[styles.setCol, styles.colInput]}>Reps</Text>
                <Text style={[styles.setCol, styles.colCheck]}></Text>
              </View>

              {exercise.sets.map((set, sIndex) => (
                <View key={set.id} style={[styles.setRow, set.completed && styles.setRowCompleted]}>
                  <Text style={[styles.setCol, styles.colSet, set.completed && styles.textCompleted]}>{sIndex + 1}</Text>
                  
                  <TextInput
                    style={[styles.input, styles.colInput, set.completed && styles.inputCompleted]}
                    keyboardType="numeric" placeholder="0" placeholderTextColor="#A0A0B0"
                    value={set.weight} onChangeText={(val) => updateSet(eIndex, sIndex, 'weight', val)}
                    editable={!set.completed}
                  />
                  <TextInput
                    style={[styles.input, styles.colInput, set.completed && styles.inputCompleted]}
                    keyboardType="numeric" placeholder="0" placeholderTextColor="#A0A0B0"
                    value={set.reps} onChangeText={(val) => updateSet(eIndex, sIndex, 'reps', val)}
                    editable={!set.completed}
                  />
                  <TouchableOpacity style={[styles.colCheck, styles.checkBtn, set.completed && styles.checkBtnActive]} onPress={() => toggleSetComplete(eIndex, sIndex)}>
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
              <View style={styles.summaryIconBox}><Dumbbell color="#8A2BE2" size={40} /></View>
              <Text style={styles.summaryTitle}>¡Entrenamiento Completado!</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statBox}><Text style={styles.statValue}>{formatTime(summaryData?.duration || 0)}</Text><Text style={styles.statLabel}>Tiempo</Text></View>
                <View style={styles.statBox}><Text style={styles.statValue}>{summaryData?.volume || 0} kg</Text><Text style={styles.statLabel}>Volumen</Text></View>
              </View>
              <TouchableOpacity style={styles.doneBtn} onPress={closeSummary}><Text style={styles.doneBtnText}>Cerrar</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Entrenamiento</Text>

      {/* Today Widget */}
      {activePlan && (
        <View style={styles.todayWidget}>
          <Text style={styles.activePlanText}>Plan Activo: {activePlan.nombre}</Text>
          <TouchableOpacity style={styles.todayBtn} onPress={handleStartToday}>
            <Play color="#16161E" size={20} fill="#16161E" />
            <Text style={styles.todayBtnText}>
              {getTodayWorkout()?.tipo === 'descanso' ? 'Hoy es Descanso' : `Empezar ${getTodayWorkout()?.nombre_dia || 'Entrenamiento'}`}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity style={[styles.tabBtn, activeTab==='Recomendadas' && styles.tabBtnActive]} onPress={()=>setActiveTab('Recomendadas')}>
          <Text style={[styles.tabText, activeTab==='Recomendadas' && styles.tabTextActive]}>Recomendadas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabBtn, activeTab==='MisRutinas' && styles.tabBtnActive]} onPress={()=>setActiveTab('MisRutinas')}>
          <Text style={[styles.tabText, activeTab==='MisRutinas' && styles.tabTextActive]}>Mis Rutinas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'Recomendadas' ? rutinasData : customRoutines}
        renderItem={renderRoutineCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          activeTab === 'MisRutinas' ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No has creado ninguna rutina aún.</Text>
            </View>
          ) : null
        }
      />

      {activeTab === 'MisRutinas' && (
        <TouchableOpacity style={styles.fabBtn} onPress={() => setShowCreator(true)}>
          <Plus color="#fff" size={24} />
        </TouchableOpacity>
      )}

      {/* CREATOR MODAL */}
      <Modal visible={showCreator} animationType="slide">
        <View style={styles.creatorContainer}>
          <View style={styles.creatorHeader}>
            <Text style={styles.creatorTitle}>Nueva Rutina</Text>
            <TouchableOpacity onPress={() => setShowCreator(false)}><Text style={{color:'#8A2BE2'}}>Cancelar</Text></TouchableOpacity>
          </View>
          <ScrollView style={{padding:20}}>
            <TextInput
              style={styles.nameInput}
              placeholder="Nombre de la rutina..."
              placeholderTextColor="#A0A0B0"
              value={newRoutineName}
              onChangeText={setNewRoutineName}
            />
            
            {DIAS.map(day => (
              <View key={day} style={styles.dayBlock}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayTitle}>{day}</Text>
                  <TouchableOpacity onPress={() => { setPickerDay(day); setShowPicker(true); }}>
                    <Text style={{color:'#00FF7F'}}>+ Ejercicio</Text>
                  </TouchableOpacity>
                </View>
                {newRoutineDays[day].ejercicios.length === 0 ? (
                  <Text style={styles.restDayText}>Día de descanso</Text>
                ) : (
                  newRoutineDays[day].ejercicios.map((ex, idx) => {
                    const dbEx = ejerciciosData.find(e => e.id === ex.ejercicioId);
                    return <Text key={idx} style={styles.dayExText}>• {dbEx?.nombre}</Text>;
                  })
                )}
              </View>
            ))}
            <View style={{height:40}}/>
          </ScrollView>
          <TouchableOpacity style={styles.saveCreatorBtn} onPress={validateAndSaveRoutine}>
            <Text style={styles.saveCreatorText}>Guardar Rutina</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* EXERCISE PICKER MODAL */}
      <Modal visible={showPicker} transparent animationType="fade">
        <View style={styles.pickerOverlay}>
          <View style={styles.pickerContent}>
            <Text style={{color:'#fff', fontSize: 18, fontWeight:'bold', marginBottom:16}}>Agregar al {pickerDay}</Text>
            <FlatList 
              data={ejerciciosData}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity style={{paddingVertical:12, borderBottomWidth:1, borderColor:'#2A2A3A'}} onPress={()=>handleAddExerciseToDay(item)}>
                  <Text style={{color:'#E0E0E0', fontSize:16}}>{item.nombre}</Text>
                  <Text style={{color:'#A0A0B0', fontSize:12}}>{item.musculo}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={{marginTop:16, padding:12, alignItems:'center', backgroundColor:'#2A2A3A', borderRadius:8}} onPress={()=>setShowPicker(false)}>
              <Text style={{color:'#fff'}}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0E' },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', margin: 20, marginBottom: 10 },
  
  todayWidget: { backgroundColor: '#16161E', marginHorizontal: 20, marginBottom: 20, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#8A2BE2' },
  activePlanText: { color: '#A0A0B0', fontSize: 14, marginBottom: 12 },
  todayBtn: { backgroundColor: '#00FF7F', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 12, gap: 8 },
  todayBtnText: { color: '#16161E', fontWeight: 'bold', fontSize: 16 },

  tabsRow: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 16, backgroundColor: '#16161E', borderRadius: 12, padding: 4 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  tabBtnActive: { backgroundColor: '#2A2A3A' },
  tabText: { color: '#A0A0B0', fontWeight: 'bold' },
  tabTextActive: { color: '#fff' },

  listContainer: { paddingHorizontal: 20, paddingBottom: 100 },
  cardItem: { marginBottom: 16 },
  rutinaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  tipoBadge: { backgroundColor: 'rgba(138,43,226,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(138,43,226,0.5)' },
  tipoText: { color: '#D1A3FF', fontSize: 12, fontWeight: '600' },
  duracionText: { color: '#A0A0B0', fontSize: 12 },
  rutinaNombre: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  rutinaDesc: { color: '#A0A0B0', fontSize: 14, marginBottom: 12 },
  scienceBox: { flexDirection: 'row', backgroundColor: 'rgba(138,43,226,0.1)', padding: 12, borderRadius: 8, marginBottom: 16, alignItems: 'flex-start', gap: 8 },
  scienceText: { color: '#D1A3FF', fontSize: 13, flex: 1, lineHeight: 18 },
  
  weekPreview: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, backgroundColor: '#0B0B0E', padding: 8, borderRadius: 8 },
  dayDot: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(0,255,127,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#00FF7F' },
  dayDotRest: { backgroundColor: 'transparent', borderColor: '#FF4500' },
  dayDotText: { color: '#00FF7F', fontWeight: 'bold', fontSize: 12 },
  dayDotTextRest: { color: '#FF4500' },

  usePlanBtn: { backgroundColor: '#8A2BE2', padding: 12, borderRadius: 8, alignItems: 'center' },
  usePlanText: { color: '#fff', fontWeight: 'bold' },

  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#A0A0B0', fontSize: 16 },
  fabBtn: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#8A2BE2', width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 5 },

  // Creator
  creatorContainer: { flex: 1, backgroundColor: '#0B0B0E' },
  creatorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#16161E', borderBottomWidth: 1, borderBottomColor: '#2A2A3A' },
  creatorTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  nameInput: { backgroundColor: '#16161E', color: '#fff', fontSize: 18, padding: 16, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#2A2A3A' },
  dayBlock: { backgroundColor: '#16161E', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#2A2A3A' },
  dayHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  dayTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  restDayText: { color: '#FF4500', fontSize: 14, fontStyle: 'italic' },
  dayExText: { color: '#A0A0B0', fontSize: 14, marginTop: 4 },
  saveCreatorBtn: { backgroundColor: '#00FF7F', margin: 20, padding: 16, borderRadius: 12, alignItems: 'center' },
  saveCreatorText: { color: '#16161E', fontSize: 18, fontWeight: 'bold' },

  pickerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
  pickerContent: { backgroundColor: '#16161E', height: '80%', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#8A2BE2' },

  // Active Training (Re-used styles)
  activeContainer: { flex: 1, backgroundColor: '#0B0B0E' },
  activeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#16161E', borderBottomWidth: 1, borderBottomColor: '#2A2A3A' },
  activeTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  timerText: { color: '#00FF7F', fontSize: 24, fontWeight: 'bold', fontVariant: ['tabular-nums'] },
  finishBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF4500', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, gap: 6 },
  finishBtnText: { color: '#fff', fontWeight: 'bold' },
  restBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(138,43,226,0.8)', padding: 12, paddingHorizontal: 20, gap: 10 },
  restBannerAlert: { backgroundColor: 'rgba(255,69,0,0.8)', borderWidth: 2, borderColor: '#FF0000' },
  restText: { color: '#fff', fontWeight: 'bold', fontSize: 16, flex: 1 },
  skipRestText: { color: '#E0E0E0', textDecorationLine: 'underline' },
  exercisesScroll: { flex: 1, padding: 20 },
  exerciseBlock: { backgroundColor: '#16161E', borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#2A2A3A' },
  exerciseName: { color: '#D1A3FF', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  setHeaderRow: { flexDirection: 'row', marginBottom: 8, paddingHorizontal: 8 },
  setCol: { color: '#A0A0B0', fontSize: 14, fontWeight: '600' },
  colSet: { width: 40, textAlign: 'center' },
  colInput: { flex: 1, textAlign: 'center' },
  colCheck: { width: 50, alignItems: 'center' },
  setRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 8, borderRadius: 8, marginBottom: 4 },
  setRowCompleted: { backgroundColor: 'rgba(0,255,127,0.1)' },
  textCompleted: { color: '#00FF7F', textDecorationLine: 'line-through' },
  input: { backgroundColor: '#0B0B0E', color: '#fff', borderRadius: 8, padding: 8, textAlign: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: '#2A2A3A' },
  inputCompleted: { color: '#00FF7F', borderColor: 'transparent', backgroundColor: 'transparent' },
  checkBtn: { padding: 4 },
  checkBtnActive: { opacity: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  summaryContent: { backgroundColor: '#16161E', width: '100%', borderRadius: 24, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: '#8A2BE2' },
  summaryIconBox: { backgroundColor: 'rgba(138,43,226,0.2)', padding: 20, borderRadius: 40, marginBottom: 20 },
  summaryTitle: { color: '#00FF7F', fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  statsContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: 30 },
  statBox: { alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { color: '#A0A0B0', fontSize: 12, textTransform: 'uppercase' },
  doneBtn: { backgroundColor: '#8A2BE2', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16, width: '100%', alignItems: 'center' },
  doneBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
