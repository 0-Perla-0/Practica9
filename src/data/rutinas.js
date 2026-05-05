export const rutinasData = [
  {
    id: 'plan_a',
    nombre: 'Plan A: Fuerza 3 Días (PPL Básico)',
    descripcion: 'Rutina clásica Push/Pull/Legs.',
    descripcion_cientifica: 'Permite recuperar grupos musculares por 72h entre sesiones. Ideal para ganancias constantes de fuerza.',
    nivel: 'Intermedio',
    dias_semana: {
      Lunes: { tipo: 'entrenamiento', nombre_dia: 'Push', ejercicios: [{ ejercicioId: '1', sets: 4, reps: '8-10' }, { ejercicioId: '21', sets: 4, reps: '8-10' }, { ejercicioId: '6', sets: 3, reps: '8-12' }] },
      Martes: { tipo: 'descanso' },
      Miercoles: { tipo: 'entrenamiento', nombre_dia: 'Pull', ejercicios: [{ ejercicioId: '11', sets: 3, reps: 'Al fallo' }, { ejercicioId: '13', sets: 3, reps: '10-12' }, { ejercicioId: '25', sets: 3, reps: '10-12' }] },
      Jueves: { tipo: 'descanso' },
      Viernes: { tipo: 'entrenamiento', nombre_dia: 'Legs', ejercicios: [{ ejercicioId: '31', sets: 4, reps: '6-10' }, { ejercicioId: '37', sets: 4, reps: '8-12' }, { ejercicioId: '33', sets: 3, reps: '10-12' }] },
      Sabado: { tipo: 'descanso' },
      Domingo: { tipo: 'descanso' }
    }
  },
  {
    id: 'plan_b',
    nombre: 'Plan B: Hipertrofia 4 Días (Upper/Lower)',
    descripcion: 'División torso/pierna para volumen.',
    descripcion_cientifica: 'La frecuencia 2x por grupo muscular maximiza la síntesis de proteínas y la hipertrofia muscular progresiva.',
    nivel: 'Avanzado',
    dias_semana: {
      Lunes: { tipo: 'entrenamiento', nombre_dia: 'Upper A', ejercicios: [{ ejercicioId: '1', sets: 4, reps: '6-8' }, { ejercicioId: '14', sets: 4, reps: '8-10' }, { ejercicioId: '21', sets: 3, reps: '8-10' }] },
      Martes: { tipo: 'entrenamiento', nombre_dia: 'Lower A', ejercicios: [{ ejercicioId: '31', sets: 4, reps: '6-8' }, { ejercicioId: '37', sets: 4, reps: '8-10' }] },
      Miercoles: { tipo: 'descanso' },
      Jueves: { tipo: 'entrenamiento', nombre_dia: 'Upper B', ejercicios: [{ ejercicioId: '3', sets: 4, reps: '10-12' }, { ejercicioId: '13', sets: 4, reps: '10-12' }, { ejercicioId: '22', sets: 4, reps: '12-15' }] },
      Viernes: { tipo: 'entrenamiento', nombre_dia: 'Lower B', ejercicios: [{ ejercicioId: '32', sets: 4, reps: '10-15' }, { ejercicioId: '38', sets: 4, reps: '10-12' }, { ejercicioId: '35', sets: 3, reps: '15' }] },
      Sabado: { tipo: 'descanso' },
      Domingo: { tipo: 'descanso' }
    }
  },
  {
    id: 'plan_c',
    nombre: 'Plan C: Full Body 3 Días',
    descripcion: 'Entrenamiento de cuerpo completo.',
    descripcion_cientifica: 'Altamente eficiente para principiantes e intermedios. Estimula el cuerpo completo produciendo una gran respuesta anabólica.',
    nivel: 'Principiante',
    dias_semana: {
      Lunes: { tipo: 'entrenamiento', nombre_dia: 'Full Body 1', ejercicios: [{ ejercicioId: '31', sets: 3, reps: '8-10' }, { ejercicioId: '1', sets: 3, reps: '8-10' }, { ejercicioId: '14', sets: 3, reps: '8-10' }] },
      Martes: { tipo: 'descanso' },
      Miercoles: { tipo: 'entrenamiento', nombre_dia: 'Full Body 2', ejercicios: [{ ejercicioId: '12', sets: 3, reps: '5-8' }, { ejercicioId: '21', sets: 3, reps: '8-10' }, { ejercicioId: '11', sets: 3, reps: 'Al fallo' }] },
      Jueves: { tipo: 'descanso' },
      Viernes: { tipo: 'entrenamiento', nombre_dia: 'Full Body 3', ejercicios: [{ ejercicioId: '32', sets: 3, reps: '10-15' }, { ejercicioId: '3', sets: 3, reps: '10-12' }, { ejercicioId: '16', sets: 3, reps: '12-15' }] },
      Sabado: { tipo: 'descanso' },
      Domingo: { tipo: 'descanso' }
    }
  },
  {
    id: 'plan_d',
    nombre: 'Plan D: HIIT + Fuerza 5 Días',
    descripcion: 'Condicionamiento físico extremo.',
    descripcion_cientifica: 'Combina entrenamiento de resistencia para preservar masa magra con HIIT para maximizar la oxidación de grasas pos-ejercicio (EPOC).',
    nivel: 'Avanzado',
    dias_semana: {
      Lunes: { tipo: 'entrenamiento', nombre_dia: 'Fuerza Upper', ejercicios: [{ ejercicioId: '1', sets: 4, reps: '8-10' }, { ejercicioId: '11', sets: 4, reps: 'Al fallo' }] },
      Martes: { tipo: 'entrenamiento', nombre_dia: 'HIIT Cardio', ejercicios: [{ ejercicioId: '46', sets: 5, reps: '15' }, { ejercicioId: '47', sets: 5, reps: '40s' }] },
      Miercoles: { tipo: 'entrenamiento', nombre_dia: 'Fuerza Lower', ejercicios: [{ ejercicioId: '31', sets: 4, reps: '6-10' }, { ejercicioId: '38', sets: 4, reps: '10-12' }] },
      Jueves: { tipo: 'entrenamiento', nombre_dia: 'HIIT Cardio', ejercicios: [{ ejercicioId: '48', sets: 5, reps: '60s' }, { ejercicioId: '44', sets: 4, reps: '10-12' }] },
      Viernes: { tipo: 'entrenamiento', nombre_dia: 'Full Body', ejercicios: [{ ejercicioId: '14', sets: 3, reps: '10-12' }, { ejercicioId: '34', sets: 3, reps: '10-12' }, { ejercicioId: '2', sets: 3, reps: 'Al fallo' }] },
      Sabado: { tipo: 'descanso' },
      Domingo: { tipo: 'descanso' }
    }
  }
];
