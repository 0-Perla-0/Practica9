import React from 'react';
import { Dumbbell } from 'lucide-react-native';

const RAPIDAPI_KEY = 'da9e22fa06msh9b20ec0a79beb29p1d7303jsn835764f6f38b'; 
const BASE_URL = 'https://exercisedb.p.rapidapi.com/exercises';

const gifCache = {};

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

export const fetchExerciseGif = async (exerciseDbId, exerciseName = null) => {
  if (!exerciseDbId && !exerciseName) throw new Error('ID o Nombre requerido');
  
  if (exerciseDbId && gifCache[exerciseDbId]) {
    return gifCache[exerciseDbId];
  }

  // Intento 1: Fetch por ID exacto
  try {
    console.log(`[API] Fetching por ID: ${exerciseDbId}`);
    const response = await fetch(`${BASE_URL}/exercise/${exerciseDbId}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`[API] Respuesta ID ${exerciseDbId}:`, data);
      if (data && data.gifUrl) {
        gifCache[exerciseDbId] = data.gifUrl;
        return data.gifUrl;
      }
    } else {
      console.warn(`[API] Error por ID (${response.status}). Ejecutando fallback...`);
    }
  } catch (error) {
    console.warn(`[API] Excepción en fetch por ID:`, error);
  }

  // Fallback: Fetch por nombre
  if (exerciseName) {
    try {
      const englishName = translationMap[exerciseName.toLowerCase()] || exerciseName;
      console.log(`[API] Fallback: Buscando por nombre "${englishName}"`);
      const searchData = await searchExerciseByName(englishName);
      
      console.log(`[API] Respuesta Fallback:`, searchData.length > 0 ? `${searchData.length} resultados encontrados` : searchData);
      
      if (searchData && searchData.length > 0) {
        const gifUrl = searchData[0].gifUrl;
        if (gifUrl) {
          if (exerciseDbId) gifCache[exerciseDbId] = gifUrl; // Guardar bajo el ID solicitado
          return gifUrl;
        }
      }
    } catch (fallbackError) {
      console.error(`[API] Fallback fallido:`, fallbackError);
    }
  }

  throw new Error('GIF no encontrado en la API (ID y Fallback fallidos)');
};

export const searchExerciseByName = async (name) => {
  if (!name) return [];

  try {
    const response = await fetch(`${BASE_URL}/name/${name}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`Error en búsqueda por nombre: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching exercise by name:', error);
    throw error;
  }
};

export const PlaceholderSVG = () => {
  return <Dumbbell color="#8A2BE2" size={80} strokeWidth={1} />;
};
