// Diccionario de traducción inglés → español

export const muscleTranslations = {
  'pectorals': 'Pectorales',
  'biceps': 'Bíceps',
  'triceps': 'Tríceps',
  'quads': 'Cuádriceps',
  'quadriceps': 'Cuádriceps',
  'hamstrings': 'Isquiotibiales',
  'glutes': 'Glúteos',
  'abs': 'Abdominales',
  'abdominals': 'Abdominales',
  'lats': 'Dorsales',
  'latissimus dorsi': 'Dorsales',
  'shoulders': 'Hombros',
  'delts': 'Deltoides',
  'deltoids': 'Deltoides',
  'calves': 'Pantorrillas',
  'forearms': 'Antebrazos',
  'traps': 'Trapecios',
  'trapezius': 'Trapecios',
  'spine': 'Columna',
  'spine erectors': 'Erectores espinales',
  'spinal erectors': 'Erectores espinales',
  'levator scapulae': 'Elevador de la escápula',
  'serratus anterior': 'Serrato anterior',
  'adductors': 'Aductores',
  'abductors': 'Abductores',
  'upper back': 'Espalda alta',
  'lower back': 'Espalda baja',
  'hip flexors': 'Flexores de cadera',
  'obliques': 'Oblicuos',
  'cardiovascular system': 'Sistema cardiovascular',
};

export const bodyPartTranslations = {
  'chest': 'Pecho',
  'back': 'Espalda',
  'upper arms': 'Brazos',
  'lower arms': 'Antebrazos',
  'upper legs': 'Piernas',
  'lower legs': 'Pantorrillas',
  'shoulders': 'Hombros',
  'waist': 'Core',
  'cardio': 'Cardio',
  'neck': 'Cuello',
};

export const equipmentTranslations = {
  'barbell': 'Barra',
  'dumbbell': 'Mancuernas',
  'body weight': 'Peso corporal',
  'machine': 'Máquina',
  'cable': 'Polea',
  'kettlebell': 'Pesa rusa',
  'band': 'Banda elástica',
  'resistance band': 'Banda de resistencia',
  'medicine ball': 'Balón medicinal',
  'stability ball': 'Pelota de estabilidad',
  'ez barbell': 'Barra EZ',
  'olympic barbell': 'Barra olímpica',
  'smith machine': 'Máquina Smith',
  'leverage machine': 'Máquina de palanca',
  'assisted': 'Asistido',
  'rope': 'Cuerda',
  'weighted': 'Con peso',
  'roller': 'Rodillo',
  'bosu ball': 'Bosu',
  'tire': 'Neumático',
  'trap bar': 'Barra trampa',
  'upper body ergometer': 'Ergómetro de tren superior',
  'elliptical machine': 'Elíptica',
  'stationary bike': 'Bicicleta estática',
  'skierg machine': 'SkiErg',
  'stepmill machine': 'Escaladora',
};

export const difficultyTranslations = {
  'beginner': 'Principiante',
  'intermediate': 'Intermedio',
  'advanced': 'Avanzado',
};

// Función helper
export const translateMuscle = (muscle) => {
  if (!muscle) return '';
  const key = muscle.toLowerCase().trim();
  return muscleTranslations[key] || muscle;
};

export const translateBodyPart = (part) => {
  if (!part) return '';
  const key = part.toLowerCase().trim();
  return bodyPartTranslations[key] || part;
};

export const translateEquipment = (eq) => {
  if (!eq) return '';
  const key = eq.toLowerCase().trim();
  return equipmentTranslations[key] || eq;
};

export const translateMuscleList = (muscles) => {
  if (!muscles || !Array.isArray(muscles)) return '';
  return muscles.map(m => translateMuscle(m)).join(', ');
};
