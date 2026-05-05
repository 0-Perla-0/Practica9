import React from 'react';
import { Dumbbell } from 'lucide-react-native';

const RAPIDAPI_KEY = 'da9e22fa06msh9b20ec0a79beb29p1d7303jsn835764f6f38b'; 
const BASE_URL = 'https://exercisedb.p.rapidapi.com/exercises';

const detailsCache = {};

// Queue para evitar 429
let isRequesting = false;
const requestQueue = [];

const processQueue = async () => {
  if (isRequesting || requestQueue.length === 0) return;
  isRequesting = true;

  const { url, resolve, reject } = requestQueue.shift();

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }

    const data = await response.json();
    resolve(data);
  } catch (error) {
    reject(error);
  } finally {
    setTimeout(() => {
      isRequesting = false;
      processQueue();
    }, 500); // 500ms delay
  }
};

const queuedFetch = (url) => {
  return new Promise((resolve, reject) => {
    requestQueue.push({ url, resolve, reject });
    processQueue();
  });
};

const translationMap = {
  'press de banca': 'bench press',
  'flexiones de pecho': 'push up',
  'press inclinado': 'incline bench press',
  'aperturas': 'dumbbell fly',
  'cruces en polea': 'cable crossover',
  'fondos en paralelas': 'chest dip',
  'press declinado': 'decline bench press',
  'pullover': 'pullover',
  'press de pecho en máquina': 'machine chest press',
  'pec deck': 'machine fly',
  'dominadas': 'pull up',
  'peso muerto': 'deadlift',
  'jalón al pecho': 'lat pulldown',
  'remo con barra': 'bent over row',
  'remo con mancuerna a 1 mano': 'one arm row',
  'remo en polea baja': 'seated row',
  'remo t': 't-bar row',
  'face pull': 'face pull',
  'shrugs (encogimientos)': 'shrug',
  'pull-up con agarre supino': 'chin-up',
  'press militar': 'overhead press',
  'elevaciones laterales': 'lateral raise',
  'elevaciones frontales': 'front raise',
  'pájaros (elevaciones posteriores)': 'rear lateral raise',
  'curl de bíceps': 'biceps curl',
  'curl martillo': 'hammer curl',
  'curl en predicador': 'preacher curl',
  'extensiones de tríceps polea': 'triceps extension',
  'press francés': 'skullcrusher',
  'patada de tríceps': 'triceps kickback',
  'sentadilla libre': 'squat',
  'prensa de piernas': 'leg press',
  'zancadas (lunges)': 'lunge',
  'sentadilla búlgara': 'bulgarian split squat',
  'extensiones de pierna': 'leg extension',
  'curl femoral acostado': 'lying leg curl',
  'peso muerto rumano': 'romanian deadlift',
  'hip thrust': 'hip thrust',
  'elevación de talones': 'calf raise',
  'abductores en máquina': 'hip abduction',
  'plancha abdominal': 'plank',
  'crunches (encogimientos)': 'crunch',
  'elevaciones de piernas colgado': 'hanging leg raise',
  'rueda abdominal': 'ab roller',
  'twist ruso': 'russian twist',
  'burpees': 'burpee',
  'mountain climbers': 'mountain climber',
  'jumping jacks': 'jumping jack',
  'gato-vaca (felino)': 'cat cow',
  'rotación torácica': 'thoracic rotation'
};

export const fetchExerciseDetails = async (exerciseDbId, exerciseName = null) => {
  if (!exerciseDbId && !exerciseName) throw new Error('ID o Nombre requerido');
  
  if (exerciseDbId && detailsCache[exerciseDbId]) {
    return detailsCache[exerciseDbId];
  }

  // Intento 1: Fetch por ID exacto
  try {
    const data = await queuedFetch(`${BASE_URL}/exercise/${exerciseDbId}`);
    if (data) {
      detailsCache[exerciseDbId] = data;
      return data;
    }
  } catch (error) {
    console.warn(`[API] Excepción en fetch por ID:`, error);
  }

  // Fallback: Fetch por nombre
  if (exerciseName) {
    try {
      const englishName = translationMap[exerciseName.toLowerCase()] || exerciseName;
      const searchData = await queuedFetch(`${BASE_URL}/name/${englishName}`);
      if (searchData && searchData.length > 0) {
        if (exerciseDbId) detailsCache[exerciseDbId] = searchData[0];
        return searchData[0];
      }
    } catch (fallbackError) {
      console.error(`[API] Fallback fallido:`, fallbackError);
    }
  }

  throw new Error('Detalles no encontrados');
};

export const searchExerciseByName = async (name) => {
  if (!name) return [];
  try {
    return await queuedFetch(`${BASE_URL}/name/${name}`);
  } catch (error) {
    console.error('Error searching exercise by name:', error);
    throw error;
  }
};

export const PlaceholderSVG = () => {
  return <Dumbbell color="#8A2BE2" size={80} strokeWidth={1} />;
};
