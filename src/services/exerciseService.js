import React from 'react';
import { Dumbbell } from 'lucide-react-native';

const RAPIDAPI_KEY = 'da9e22fa06msh9b20ec0a79beb29p1d7303jsn835764f6f38b'; 
const BASE_URL = 'https://exercisedb.p.rapidapi.com/exercises';

const gifCache = {};

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
      console.log(`[API] Fallback: Buscando por nombre "${exerciseName}"`);
      const searchData = await searchExerciseByName(exerciseName);
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
