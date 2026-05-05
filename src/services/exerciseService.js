import React from 'react';
import { Dumbbell } from 'lucide-react-native';

const RAPIDAPI_KEY = 'da9e22fa06msh9b20ec0a79beb29p1d7303jsn835764f6f38b'; 
const BASE_URL = 'https://exercisedb.p.rapidapi.com/exercises';

const gifCache = {};

export const fetchExerciseGif = async (exerciseDbId) => {
  if (!exerciseDbId) throw new Error('ID de ejercicio requerido');
  
  if (gifCache[exerciseDbId]) {
    return gifCache[exerciseDbId];
  }

  try {
    const response = await fetch(`${BASE_URL}/exercise/${exerciseDbId}`, {
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
    
    if (data && data.gifUrl) {
      gifCache[exerciseDbId] = data.gifUrl;
      return data.gifUrl;
    }
    
    throw new Error('GIF no encontrado en la respuesta');
  } catch (error) {
    console.error('Error fetching exercise GIF:', error);
    throw error; // Let the caller handle the fallback
  }
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
      throw new Error(`Error en la API: ${response.status}`);
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
