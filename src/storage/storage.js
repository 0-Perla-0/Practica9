import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SESSIONS: '@fitcat_sessions',
  ROUTINES: '@fitcat_routines',
  BODY_WEIGHT: '@fitcat_body_weight',
  PRS: '@fitcat_prs',
};

// --- SESIONES ---
export const getSessions = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting sessions:', error);
    return [];
  }
};

export const saveSession = async (sessionData) => {
  try {
    const sessions = await getSessions();
    const newSession = {
      ...sessionData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    const updatedSessions = [newSession, ...sessions];
    await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updatedSessions));
    return newSession;
  } catch (error) {
    console.error('Error saving session:', error);
    throw error;
  }
};

// --- RUTINAS PERSONALES ---
export const getRoutines = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.ROUTINES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting routines:', error);
    return [];
  }
};

export const saveRoutine = async (routineData) => {
  try {
    const routines = await getRoutines();
    // Si ya existe, actualiza
    let updatedRoutines;
    if (routineData.id) {
      updatedRoutines = routines.map(r => r.id === routineData.id ? routineData : r);
    } else {
      updatedRoutines = [...routines, { ...routineData, id: Date.now().toString() }];
    }
    await AsyncStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(updatedRoutines));
    return true;
  } catch (error) {
    console.error('Error saving routine:', error);
    throw error;
  }
};

// --- PESO CORPORAL ---
export const getBodyWeights = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.BODY_WEIGHT);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting body weights:', error);
    return [];
  }
};

export const saveBodyWeight = async (weightData) => {
  try {
    const weights = await getBodyWeights();
    const newWeight = {
      ...weightData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    // Ordenar de más reciente a más antiguo
    const updatedWeights = [newWeight, ...weights].sort((a, b) => new Date(b.date) - new Date(a.date));
    await AsyncStorage.setItem(STORAGE_KEYS.BODY_WEIGHT, JSON.stringify(updatedWeights));
    return newWeight;
  } catch (error) {
    console.error('Error saving body weight:', error);
    throw error;
  }
};

// --- PERSONAL RECORDS (PRs) ---
export const getPRs = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PRS);
    return data ? JSON.parse(data) : {}; // Estructura: { exerciseId: maxWeight }
  } catch (error) {
    console.error('Error getting PRs:', error);
    return {};
  }
};

export const savePR = async (exerciseId, weight) => {
  try {
    const prs = await getPRs();
    if (!prs[exerciseId] || weight > prs[exerciseId]) {
      prs[exerciseId] = weight;
      await AsyncStorage.setItem(STORAGE_KEYS.PRS, JSON.stringify(prs));
      return true; // Es nuevo PR
    }
    return false;
  } catch (error) {
    console.error('Error saving PR:', error);
    throw error;
  }
};
