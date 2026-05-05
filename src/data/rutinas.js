export const rutinasData = [
  {
    id: '1',
    nombre: 'Push (Pecho, Hombros, Tríceps)',
    descripcion: 'Enfocada en todos los movimientos de empuje para desarrollar la parte frontal del tren superior.',
    nivel: 'Intermedio',
    duracion_estimada: 60, // minutos
    ejercicios: [
      { ejercicioId: '1',  sets: 4, reps: '8-10' }, // Press de Banca
      { ejercicioId: '3',  sets: 3, reps: '10-12' }, // Press Inclinado
      { ejercicioId: '21', sets: 4, reps: '8-10' }, // Press Militar
      { idCustom: 'e4', ejercicioId: '22', sets: 4, reps: '12-15' }, // Elevaciones Laterales
      { idCustom: 'e5', ejercicioId: '28', sets: 4, reps: '12-15' }, // Extensión Tríceps
    ]
  },
  {
    id: '2',
    nombre: 'Pull (Espalda, Bíceps)',
    descripcion: 'Trabaja toda la musculatura de tracción. Excelente para amplitud de espalda y bíceps.',
    nivel: 'Intermedio',
    duracion_estimada: 55,
    ejercicios: [
      { ejercicioId: '12', sets: 4, reps: '5-8' }, // Peso Muerto
      { ejercicioId: '11', sets: 3, reps: 'Al fallo' }, // Dominadas
      { ejercicioId: '14', sets: 4, reps: '8-10' }, // Remo con Barra
      { ejercicioId: '18', sets: 3, reps: '15-20' }, // Face Pull
      { ejercicioId: '25', sets: 3, reps: '10-12' }, // Curl de Bíceps
    ]
  },
  {
    id: '3',
    nombre: 'Legs (Piernas y Glúteos)',
    descripcion: 'Rutina brutal para hipertrofia y fuerza en el tren inferior.',
    nivel: 'Avanzado',
    duracion_estimada: 65,
    ejercicios: [
      { ejercicioId: '31', sets: 4, reps: '6-10' }, // Sentadilla
      { ejercicioId: '32', sets: 4, reps: '10-15' }, // Prensa
      { ejercicioId: '37', sets: 4, reps: '8-12' }, // Peso Muerto Rumano
      { ejercicioId: '35', sets: 3, reps: '12-15' }, // Extensiones
      { ejercicioId: '36', sets: 3, reps: '10-15' }, // Curl Femoral
    ]
  },
  {
    id: '4',
    nombre: 'Full Body Felino',
    descripcion: 'Rutina de cuerpo completo ideal para entrenar 3 veces por semana.',
    nivel: 'Principiante',
    duracion_estimada: 50,
    ejercicios: [
      { ejercicioId: '1', sets: 3, reps: '8-10' }, // Press Banca
      { ejercicioId: '13', sets: 3, reps: '10-12' }, // Jalón al pecho
      { ejercicioId: '31', sets: 3, reps: '8-10' }, // Sentadilla
      { ejercicioId: '21', sets: 3, reps: '10-12' }, // Press Militar
      { ejercicioId: '41', sets: 3, reps: '60s' }, // Plancha
    ]
  },
  {
    id: '5',
    nombre: 'HIIT y Core',
    descripcion: 'Quema grasa, mejora tu resistencia cardiovascular y endurece el abdomen.',
    nivel: 'Avanzado',
    duracion_estimada: 30,
    ejercicios: [
      { ejercicioId: '46', sets: 4, reps: '15' }, // Burpees
      { ejercicioId: '47', sets: 4, reps: '40s' }, // Mountain Climbers
      { ejercicioId: '44', sets: 3, reps: '8-12' }, // Rueda Abdominal
      { ejercicioId: '45', sets: 3, reps: '20' }, // Twist Ruso
      { ejercicioId: '48', sets: 3, reps: '60s' }, // Jumping Jacks
    ]
  },
  {
    id: '6',
    nombre: 'Movilidad Activa',
    descripcion: 'Perfecta para días de descanso activo o calentamiento profundo.',
    nivel: 'Principiante',
    duracion_estimada: 15,
    ejercicios: [
      { ejercicioId: '49', sets: 2, reps: '10-12' }, // Gato-Vaca
      { ejercicioId: '50', sets: 2, reps: '8/lado' }, // Rotación Torácica
      { ejercicioId: '41', sets: 2, reps: '45s' }, // Plancha
    ]
  }
];
