export const ejerciciosData = [
  // 1-10: Pecho / Empuje
  {
    id: '1', nombre: 'Press de Banca', musculo: 'Pecho', equipo: 'Barra',
    pasos: ['1. Acuéstate en el banco plano', '2. Agarra la barra un poco más ancho que los hombros', '3. Baja la barra al pecho de forma controlada', '4. Empuja hacia arriba extendiendo los brazos'],
    explicacion: 'Acuéstate en el banco, agarra la barra ligeramente más ancho que los hombros. Baja la barra de forma controlada hasta el pecho y empuja hacia arriba.',
    beneficios: 'Desarrolla fuerza y tamaño en el pecho, tríceps y hombros anteriores.',
    contraindicaciones: 'No recomendado si tienes lesiones recientes en el manguito rotador.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 4, reps_recomendadas: '8-10', descanso_segundos: 90,
    exerciseDbId: '0025' // Barbell Bench Press
  },
  {
    id: '2', nombre: 'Flexiones de Pecho', musculo: 'Pecho', equipo: 'Peso Corporal',
    pasos: ['1. Posición de plancha alta', '2. Manos al nivel del pecho', '3. Baja doblando codos', '4. Empuja el suelo para subir'],
    explicacion: 'En posición de plancha alta, baja el cuerpo doblando los codos hasta rozar el suelo con el pecho y empuja de regreso.',
    beneficios: 'Ejercicio básico y efectivo para fortalecer pecho, tríceps y hombro.',
    contraindicaciones: 'Vigilar la técnica de las muñecas.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: 'Al fallo', descanso_segundos: 60,
    exerciseDbId: '0229' // Push-up
  },
  {
    id: '3', nombre: 'Press Inclinado', musculo: 'Pecho', equipo: 'Mancuernas',
    pasos: ['1. Siéntate en banco inclinado 30-45°', '2. Sostén las mancuernas sobre los hombros', '3. Empuja hacia arriba', '4. Baja controlado'],
    explicacion: 'Mismo movimiento que el press plano pero en banco inclinado, enfocando en la parte superior del pecho.',
    beneficios: 'Desarrolla la porción clavicular del pectoral mayor.',
    contraindicaciones: 'Evitar si hay dolor anterior de hombro.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '10-12', descanso_segundos: 90,
    exerciseDbId: '0314' // Dumbbell Incline Bench Press
  },
  {
    id: '4', nombre: 'Aperturas', musculo: 'Pecho', equipo: 'Mancuernas',
    pasos: ['1. Acuéstate en banco plano con mancuernas', '2. Abre los brazos con leve flexión de codo', '3. Siente el estiramiento en el pecho', '4. Cierra como si dieras un abrazo'],
    explicacion: 'Acuéstate, extiende brazos y bájalos hacia los lados describiendo un arco.',
    beneficios: 'Aislamiento máximo para el pectoral.',
    contraindicaciones: 'No bajar en exceso para no lastimar los hombros.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '12-15', descanso_segundos: 60,
    exerciseDbId: '0308' // Dumbbell Fly
  },
  {
    id: '5', nombre: 'Cruces en Polea', musculo: 'Pecho', equipo: 'Polea',
    pasos: ['1. Párate en el centro de las poleas altas', '2. Toma un agarre en cada mano', '3. Junta las manos al frente de tu cintura', '4. Regresa lento'],
    explicacion: 'Jala ambas poleas hacia el frente cruzándolas ligeramente al final.',
    beneficios: 'Tensión constante en todo el rango de movimiento para el pecho.',
    contraindicaciones: 'Evitar pesos excesivos que fuercen usar impulso del torso.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '12-15', descanso_segundos: 60,
    exerciseDbId: '0149' // Cable Crossover
  },
  {
    id: '6', nombre: 'Fondos en Paralelas', musculo: 'Pecho', equipo: 'Máquina',
    pasos: ['1. Sostente en barras paralelas', '2. Inclina el torso un poco adelante', '3. Baja flexionando codos', '4. Empuja para subir'],
    explicacion: 'Suspende tu cuerpo en paralelas y baja hasta que los brazos formen 90 grados.',
    beneficios: 'Gran trabajo para la parte inferior del pecho y tríceps.',
    contraindicaciones: 'Requiere buena movilidad y estabilidad de hombros.',
    dificultad: 'Avanzado', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '8-12', descanso_segundos: 90,
    exerciseDbId: '0251' // Chest Dip
  },
  {
    id: '7', nombre: 'Press Declinado', musculo: 'Pecho', equipo: 'Barra',
    pasos: ['1. Acuéstate en banco declinado', '2. Agarra la barra', '3. Baja a la parte baja del pecho', '4. Empuja hacia arriba'],
    explicacion: 'Similar al press plano, pero declinado. Activa el pectoral inferior.',
    beneficios: 'Mayor enfoque en las fibras inferiores del pecho.',
    contraindicaciones: 'Evitar en caso de hipertensión o problemas oculares.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '8-10', descanso_segundos: 90,
    exerciseDbId: '0033' // Barbell Decline Bench Press
  },
  {
    id: '8', nombre: 'Pullover', musculo: 'Pecho', equipo: 'Mancuernas',
    pasos: ['1. Apoya la espalda alta transversalmente en un banco', '2. Sostén una mancuerna con ambas manos', '3. Baja la mancuerna tras la cabeza', '4. Regresa al frente'],
    explicacion: 'Baja el peso detrás de tu cabeza sintiendo el estiramiento en la caja torácica.',
    beneficios: 'Trabaja el pecho y los dorsales simultáneamente.',
    contraindicaciones: 'Cuidado con la movilidad del hombro.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '10-12', descanso_segundos: 60,
    exerciseDbId: '0375' // Dumbbell Pullover
  },
  {
    id: '9', nombre: 'Press de Pecho en Máquina', musculo: 'Pecho', equipo: 'Máquina',
    pasos: ['1. Ajusta el asiento', '2. Agarra los mangos', '3. Empuja hacia adelante', '4. Regresa lento'],
    explicacion: 'Máquina de empuje frontal para pecho. Brinda mucha estabilidad.',
    beneficios: 'Ideal para principiantes, aísla el pecho sin requerir equilibrio.',
    contraindicaciones: 'Ninguna específica.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '12-15', descanso_segundos: 60,
    exerciseDbId: '0186' // Machine Chest Press
  },
  {
    id: '10', nombre: 'Pec Deck', musculo: 'Pecho', equipo: 'Máquina',
    pasos: ['1. Siéntate y coloca antebrazos o manos en almohadillas', '2. Junta los brazos al frente', '3. Aprieta el pecho', '4. Regresa controlado'],
    explicacion: 'Máquina para realizar el movimiento de apertura de forma guiada.',
    beneficios: 'Buen aislamiento sin estrés en tríceps.',
    contraindicaciones: 'No usar pesos excesivos.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '15', descanso_segundos: 60,
    exerciseDbId: '0187' // Machine Fly
  },

  // 11-20: Espalda / Tirón
  {
    id: '11', nombre: 'Dominadas', musculo: 'Espalda', equipo: 'Peso Corporal',
    pasos: ['1. Cuélgate de la barra', '2. Activa dorsales y tira hacia arriba', '3. Pasa la barbilla sobre la barra', '4. Baja de forma controlada'],
    explicacion: 'Cuélgate de una barra y tira de tu cuerpo hacia arriba hasta que la barbilla pase la barra.',
    beneficios: 'Excelente para la amplitud y fuerza de la espalda.',
    contraindicaciones: 'No recomendado en caso de tendinitis aguda en codos.',
    dificultad: 'Avanzado', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: 'Al fallo', descanso_segundos: 120,
    exerciseDbId: '0275' // Pull-up
  },
  {
    id: '12', nombre: 'Peso Muerto', musculo: 'Espalda/Piernas', equipo: 'Barra',
    pasos: ['1. Barra sobre los pies', '2. Agacha manteniendo espalda recta', '3. Levanta empujando piernas y cadera', '4. Extiende arriba'],
    explicacion: 'Levanta la barra del suelo manteniendo la espalda neutra y usando piernas y cadera.',
    beneficios: 'Ejercicio rey para la cadena posterior. Mejora la fuerza global.',
    contraindicaciones: 'Evitar si no se domina la técnica o hay hernias lumbares.',
    dificultad: 'Avanzado', categoria: 'Fuerza',
    sets_recomendados: 4, reps_recomendadas: '5-8', descanso_segundos: 120,
    exerciseDbId: '0032' // Barbell Deadlift
  },
  {
    id: '13', nombre: 'Jalón al Pecho', musculo: 'Espalda', equipo: 'Máquina',
    pasos: ['1. Siéntate en la máquina de polea', '2. Toma la barra ancha', '3. Tira de la barra al pecho', '4. Regresa lento'],
    explicacion: 'Tira de la polea hacia el pecho juntando escápulas.',
    beneficios: 'Alternativa ideal a dominadas para amplitud de espalda.',
    contraindicaciones: 'No jalar tras nuca.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '10-12', descanso_segundos: 60,
    exerciseDbId: '0150' // Cable Lat Pulldown
  },
  {
    id: '14', nombre: 'Remo con Barra', musculo: 'Espalda', equipo: 'Barra',
    pasos: ['1. Inclinación del torso a 45 grados', '2. Sostén barra con ambas manos', '3. Jala la barra hacia el ombligo', '4. Extiende brazos'],
    explicacion: 'Con el torso inclinado, tira de la barra hacia tu abdomen.',
    beneficios: 'Desarrolla grosor y densidad en la espalda media.',
    contraindicaciones: 'Peligro lumbar si la técnica falla.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 4, reps_recomendadas: '8-10', descanso_segundos: 90,
    exerciseDbId: '0027' // Barbell Bent Over Row
  },
  {
    id: '15', nombre: 'Remo con Mancuerna a 1 Mano', musculo: 'Espalda', equipo: 'Mancuernas',
    pasos: ['1. Apoya rodilla y mano en banco', '2. Sostén mancuerna con la otra', '3. Jala la mancuerna a la cadera', '4. Baja estirando el dorsal'],
    explicacion: 'Remo unilateral apoyado en un banco.',
    beneficios: 'Corrige asimetrías y permite gran estiramiento.',
    contraindicaciones: 'Evitar girar el torso en exceso.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '10-12', descanso_segundos: 60,
    exerciseDbId: '0292' // Dumbbell One Arm Row
  },
  {
    id: '16', nombre: 'Remo en Polea Baja', musculo: 'Espalda', equipo: 'Polea',
    pasos: ['1. Siéntate en máquina de polea baja', '2. Mantén espalda recta', '3. Jala el maneral al abdomen', '4. Estira controlado'],
    explicacion: 'Remo sentado en polea con agarre estrecho o ancho.',
    beneficios: 'Muy seguro y aísla bien los músculos romboides y trapecios.',
    contraindicaciones: 'No encorvarse al estirar.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '12-15', descanso_segundos: 60,
    exerciseDbId: '0165' // Cable Seated Row
  },
  {
    id: '17', nombre: 'Remo T', musculo: 'Espalda', equipo: 'Barra',
    pasos: ['1. Párate sobre los apoyos de la máquina T', '2. Agarra las asas', '3. Jala hacia el pecho', '4. Baja controlado'],
    explicacion: 'Variante de remo apoyando pecho en almohadilla o libre en barra T.',
    beneficios: 'Enfoque masivo en grosor dorsal.',
    contraindicaciones: 'Cuidar lumbar en variantes libres.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '8-12', descanso_segundos: 90,
    exerciseDbId: '0188' // Machine T-Bar Row
  },
  {
    id: '18', nombre: 'Face Pull', musculo: 'Espalda/Hombros', equipo: 'Polea',
    pasos: ['1. Coloca polea a altura de ojos', '2. Toma la cuerda', '3. Jala hacia tu cara separando las manos', '4. Aprieta deltoides posterior'],
    explicacion: 'Tira de una polea alta hacia tu cara.',
    beneficios: 'Clave para salud de hombros y deltoides posterior.',
    contraindicaciones: 'No usar pesos que obliguen a echarse atrás.',
    dificultad: 'Principiante', categoria: 'Movilidad',
    sets_recomendados: 3, reps_recomendadas: '15-20', descanso_segundos: 60,
    exerciseDbId: '0143' // Cable Face Pull
  },
  {
    id: '19', nombre: 'Shrugs (Encogimientos)', musculo: 'Espalda', equipo: 'Mancuernas',
    pasos: ['1. De pie con mancuernas a los lados', '2. Encoge los hombros hacia arriba', '3. Sostén 1 segundo', '4. Baja'],
    explicacion: 'Eleva los hombros intentando tocar las orejas sin flexionar codos.',
    beneficios: 'Aísla la porción superior del trapecio.',
    contraindicaciones: 'No rotar los hombros, solo arriba y abajo.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '12-15', descanso_segundos: 60,
    exerciseDbId: '0376' // Dumbbell Shrug
  },
  {
    id: '20', nombre: 'Pull-up con Agarre Supino', musculo: 'Espalda/Bíceps', equipo: 'Peso Corporal',
    pasos: ['1. Toma barra con palmas hacia ti', '2. Jala hacia arriba', '3. Barbilla sobre barra', '4. Baja lento'],
    explicacion: 'Dominadas con las palmas mirándote (chin-ups).',
    beneficios: 'Más énfasis en el bíceps que las dominadas pronas.',
    contraindicaciones: 'Evitar si causa molestias en codos.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: 'Al fallo', descanso_segundos: 90,
    exerciseDbId: '1336' // Chin-up
  },

  // 21-30: Hombros, Bíceps y Tríceps
  {
    id: '21', nombre: 'Press Militar', musculo: 'Hombros', equipo: 'Barra',
    pasos: ['1. Barra sobre los hombros', '2. Empuja hacia arriba', '3. Extiende brazos', '4. Baja controlado al nivel clavicular'],
    explicacion: 'Empuja el peso desde los hombros hasta extender brazos arriba.',
    beneficios: 'Construye hombros fuertes y anchos. Activa el core si es de pie.',
    contraindicaciones: 'Evitar si hay dolor de pinzamiento de hombro.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 4, reps_recomendadas: '8-10', descanso_segundos: 90,
    exerciseDbId: '0023' // Barbell Overhead Press
  },
  {
    id: '22', nombre: 'Elevaciones Laterales', musculo: 'Hombros', equipo: 'Mancuernas',
    pasos: ['1. Mancuernas a los lados', '2. Sube brazos lateralmente', '3. Paralelos al suelo', '4. Baja'],
    explicacion: 'Levanta brazos hacia lados con ligera flexión de codo.',
    beneficios: 'Aísla el deltoides lateral (forma de V).',
    contraindicaciones: 'No usar impulso ni alzar muy alto.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 4, reps_recomendadas: '12-15', descanso_segundos: 60,
    exerciseDbId: '0334' // Dumbbell Lateral Raise
  },
  {
    id: '23', nombre: 'Elevaciones Frontales', musculo: 'Hombros', equipo: 'Mancuernas',
    pasos: ['1. Mancuernas frente a muslos', '2. Sube brazos rectos al frente', '3. Hasta nivel de hombros', '4. Baja lento'],
    explicacion: 'Elevación frontal de los brazos para el deltoides anterior.',
    beneficios: 'Trabajo específico del hombro frontal.',
    contraindicaciones: 'No necesario si haces mucho press de banca.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '12-15', descanso_segundos: 60,
    exerciseDbId: '0310' // Dumbbell Front Raise
  },
  {
    id: '24', nombre: 'Pájaros (Elevaciones Posteriores)', musculo: 'Hombros', equipo: 'Mancuernas',
    pasos: ['1. Inclina torso adelante', '2. Mancuernas colgando', '3. Abre brazos como alas', '4. Siente deltoides posterior'],
    explicacion: 'Con torso inclinado, abre brazos lateralmente.',
    beneficios: 'Desarrolla la parte trasera del hombro para mejor postura.',
    contraindicaciones: 'Evitar usar el trapecio encogiendo hombros.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '12-15', descanso_segundos: 60,
    exerciseDbId: '0372' // Dumbbell Rear Lateral Raise
  },
  {
    id: '25', nombre: 'Curl de Bíceps', musculo: 'Bíceps', equipo: 'Mancuernas',
    pasos: ['1. Sostén mancuernas con palmas al frente', '2. Flexiona codos', '3. Sube a hombros', '4. Baja extendiendo'],
    explicacion: 'Flexión de codo pura con mancuernas.',
    beneficios: 'Aísla el bíceps y permite rango completo.',
    contraindicaciones: 'No usar la espalda para balancearse.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '10-12', descanso_segundos: 60,
    exerciseDbId: '0285' // Dumbbell Biceps Curl
  },
  {
    id: '26', nombre: 'Curl Martillo', musculo: 'Bíceps', equipo: 'Mancuernas',
    pasos: ['1. Agarre neutro (palmas enfrentadas)', '2. Flexiona codos', '3. Sube peso', '4. Baja lento'],
    explicacion: 'Curl de bíceps con agarre neutro.',
    beneficios: 'Trabaja el braquial y braquiorradial (antebrazo).',
    contraindicaciones: 'Mismas precauciones que el curl normal.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '10-12', descanso_segundos: 60,
    exerciseDbId: '0313' // Dumbbell Hammer Curl
  },
  {
    id: '27', nombre: 'Curl en Predicador', musculo: 'Bíceps', equipo: 'Barra EZ',
    pasos: ['1. Apoya brazos en el banco predicador', '2. Agarra barra EZ', '3. Sube sin despegar tríceps del banco', '4. Baja y estira'],
    explicacion: 'Curl aislando totalmente con banco de apoyo.',
    beneficios: 'Imposible hacer trampa, máximo aislamiento.',
    contraindicaciones: 'No extender violentamente al bajar.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '10-12', descanso_segundos: 60,
    exerciseDbId: '0030' // Barbell Preacher Curl
  },
  {
    id: '28', nombre: 'Extensiones de Tríceps Polea', musculo: 'Tríceps', equipo: 'Polea',
    pasos: ['1. De pie en polea alta con cuerda', '2. Pega codos al cuerpo', '3. Empuja hacia abajo', '4. Abre la cuerda al final'],
    explicacion: 'Extensión de tríceps en polea alta usando cuerda.',
    beneficios: 'Gran bombeo y trabajo seguro de tríceps.',
    contraindicaciones: 'No separar los codos del torso.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 4, reps_recomendadas: '12-15', descanso_segundos: 60,
    exerciseDbId: '0157' // Cable Triceps Extension
  },
  {
    id: '29', nombre: 'Press Francés', musculo: 'Tríceps', equipo: 'Barra EZ',
    pasos: ['1. Acuéstate y alza barra sobre frente', '2. Dobla codos bajando barra', '3. Siente el estiramiento', '4. Extiende arriba'],
    explicacion: 'Acuéstate, brazos al techo. Flexiona codos bajando el peso a la frente.',
    beneficios: 'Estimula la cabeza larga del tríceps masivamente.',
    contraindicaciones: 'Mucha tensión en el codo; no abusar del peso.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '10-12', descanso_segundos: 60,
    exerciseDbId: '0235' // Lying Triceps Extension (Skullcrushers)
  },
  {
    id: '30', nombre: 'Patada de Tríceps', musculo: 'Tríceps', equipo: 'Mancuernas',
    pasos: ['1. Torso inclinado', '2. Codo pegado y flexionado 90°', '3. Extiende el brazo hacia atrás', '4. Contrae al máximo'],
    explicacion: 'Extiende el codo hacia atrás en posición inclinada.',
    beneficios: 'Buen trabajo de contracción máxima al final del rango.',
    contraindicaciones: 'El peso suele ser muy bajo, no usar impulso.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '12-15', descanso_segundos: 60,
    exerciseDbId: '0370' // Dumbbell Triceps Kickback
  },

  // 31-40: Piernas y Glúteos
  {
    id: '31', nombre: 'Sentadilla Libre', musculo: 'Piernas', equipo: 'Barra',
    pasos: ['1. Barra sobre la espalda alta', '2. Pies ancho de hombros', '3. Baja flexionando cadera y rodillas', '4. Sube empujando'],
    explicacion: 'Desciende flexionando rodillas y caderas como si fueras a sentarte.',
    beneficios: 'Construye fuerza general en tren inferior y core.',
    contraindicaciones: 'Precaución extrema con lesiones lumbares crónicas.',
    dificultad: 'Avanzado', categoria: 'Fuerza',
    sets_recomendados: 4, reps_recomendadas: '6-10', descanso_segundos: 120,
    exerciseDbId: '0043' // Barbell Squat
  },
  {
    id: '32', nombre: 'Prensa de Piernas', musculo: 'Piernas', equipo: 'Máquina',
    pasos: ['1. Siéntate en la prensa', '2. Coloca pies en la plataforma', '3. Desciende hasta 90°', '4. Empuja plataforma'],
    explicacion: 'Máquina de prensa inclinada 45 grados.',
    beneficios: 'Permite mover mucho peso sin estrés en espalda baja.',
    contraindicaciones: 'NO estirar completamente las rodillas (no bloquear) al empujar.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 4, reps_recomendadas: '10-15', descanso_segundos: 90,
    exerciseDbId: '0189' // Machine Leg Press
  },
  {
    id: '33', nombre: 'Zancadas (Lunges)', musculo: 'Piernas', equipo: 'Mancuernas',
    pasos: ['1. De pie con mancuernas', '2. Da paso largo adelante', '3. Baja cadera', '4. Empuja y vuelve atrás'],
    explicacion: 'Zancada frontal o hacia atrás bajando la rodilla.',
    beneficios: 'Mejora el equilibrio y fortalece de forma unilateral.',
    contraindicaciones: 'Evitar si hay inestabilidad o dolor agudo de rodilla.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '10-12/pierna', descanso_segundos: 60,
    exerciseDbId: '0020' // Barbell Lunge (o dumbbell)
  },
  {
    id: '34', nombre: 'Sentadilla Búlgara', musculo: 'Piernas', equipo: 'Mancuernas',
    pasos: ['1. Apoya un pie en banco atrás', '2. Adelanta el otro pie', '3. Baja en zancada', '4. Sube sintiendo glúteo y cuádriceps'],
    explicacion: 'Zancada unilateral con pie trasero elevado.',
    beneficios: 'Destroza fibras de piernas y glúteos, máximo estímulo sin carga espinal.',
    contraindicaciones: 'Difícil para principiantes por equilibrio.',
    dificultad: 'Avanzado', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '8-12/pierna', descanso_segundos: 90,
    exerciseDbId: '0304' // Dumbbell Split Squat / Bulgarian
  },
  {
    id: '35', nombre: 'Extensiones de Pierna', musculo: 'Piernas', equipo: 'Máquina',
    pasos: ['1. Siéntate en la máquina', '2. Rodillo sobre empeines', '3. Extiende piernas', '4. Baja lento'],
    explicacion: 'Máquina sentada extendiendo rodillas.',
    beneficios: 'Aislamiento espectacular para cuádriceps.',
    contraindicaciones: 'Tensión en ligamento cruzado anterior, evitar si hay lesión previa.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '12-15', descanso_segundos: 60,
    exerciseDbId: '0190' // Machine Leg Extension
  },
  {
    id: '36', nombre: 'Curl Femoral Acostado', musculo: 'Piernas', equipo: 'Máquina',
    pasos: ['1. Acuéstate boca abajo', '2. Rodillo sobre talones', '3. Flexiona rodillas al glúteo', '4. Baja controlado'],
    explicacion: 'Máquina acostada de flexión de rodilla.',
    beneficios: 'Aislamiento directo para isquiosurales.',
    contraindicaciones: 'No levantar la cadera al flexionar.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '10-15', descanso_segundos: 60,
    exerciseDbId: '0193' // Machine Lying Leg Curl
  },
  {
    id: '37', nombre: 'Peso Muerto Rumano', musculo: 'Piernas/Glúteos', equipo: 'Barra',
    pasos: ['1. De pie con barra', '2. Caderas atrás con pierna semi rígida', '3. Siente el isquio', '4. Aprieta glúteo arriba'],
    explicacion: 'Peso muerto manteniendo piernas semi-rectas enfatizando estiramiento.',
    beneficios: 'Poderoso para hipertrofia de isquios y glúteos.',
    contraindicaciones: 'Cuidar mucho la rectitud de la espalda lumbar.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 4, reps_recomendadas: '8-12', descanso_segundos: 90,
    exerciseDbId: '0034' // Barbell Romanian Deadlift
  },
  {
    id: '38', nombre: 'Hip Thrust', musculo: 'Glúteos', equipo: 'Barra',
    pasos: ['1. Espalda alta en banco', '2. Barra en cadera', '3. Empuja cadera al techo', '4. Sostén 1s arriba'],
    explicacion: 'Elevación de pelvis con barra sobre cadera apoyando espalda en banco.',
    beneficios: 'El mejor ejercicio para aislar y construir glúteos.',
    contraindicaciones: 'Usar almohadilla protectora siempre.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 4, reps_recomendadas: '8-12', descanso_segundos: 90,
    exerciseDbId: '0194' // Barbell Hip Thrust (approx o usar otro) 
  },
  {
    id: '39', nombre: 'Elevación de Talones', musculo: 'Piernas', equipo: 'Máquina',
    pasos: ['1. Párate en la máquina de gemelos', '2. Deja caer talones', '3. Sube a las puntas', '4. Sostén contracción'],
    explicacion: 'Elevación de talones de pie o sentado para pantorrillas.',
    beneficios: 'Desarrolla los gemelos y sóleo.',
    contraindicaciones: 'Hacer el rango completo sin rebotar.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 4, reps_recomendadas: '15-20', descanso_segundos: 60,
    exerciseDbId: '0192' // Machine Standing Calf Raise
  },
  {
    id: '40', nombre: 'Abductores en Máquina', musculo: 'Glúteos', equipo: 'Máquina',
    pasos: ['1. Siéntate en la máquina', '2. Almohadillas por fuera de las rodillas', '3. Abre piernas', '4. Regresa lento'],
    explicacion: 'Apertura de piernas sentado en máquina.',
    beneficios: 'Trabaja el glúteo medio, da estabilidad lateral a la cadera.',
    contraindicaciones: 'No abusar del peso perdiendo rango.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '15-20', descanso_segundos: 60,
    exerciseDbId: '0195' // Seated Hip Abduction Machine
  },

  // 41-50: Core, Cardio, HIIT y Movilidad
  {
    id: '41', nombre: 'Plancha Abdominal', musculo: 'Core', equipo: 'Peso Corporal',
    pasos: ['1. Apóyate en antebrazos y puntas', '2. Cuerpo recto y firme', '3. Aprieta glúteos y abdomen', '4. Mantén posición'],
    explicacion: 'Sostén isométrico con cuerpo en línea recta.',
    beneficios: 'Aumenta resistencia de toda la faja abdominal.',
    contraindicaciones: 'No hundir la zona lumbar.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '60s', descanso_segundos: 45,
    exerciseDbId: '0239' // Plank
  },
  {
    id: '42', nombre: 'Crunches (Encogimientos)', musculo: 'Core', equipo: 'Peso Corporal',
    pasos: ['1. Acostado boca arriba, rodillas flexionadas', '2. Manos tras orejas', '3. Eleva hombros', '4. Baja sin relajar'],
    explicacion: 'Flexión corta del tronco contrayendo abdomen superior.',
    beneficios: 'Trabaja el recto abdominal.',
    contraindicaciones: 'No jalar el cuello con las manos.',
    dificultad: 'Principiante', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '20', descanso_segundos: 45,
    exerciseDbId: '0226' // Crunch
  },
  {
    id: '43', nombre: 'Elevaciones de Piernas Colgado', musculo: 'Core', equipo: 'Barra',
    pasos: ['1. Cuélgate de barra', '2. Eleva piernas juntas', '3. Hasta ángulo de 90° o más', '4. Baja sin balancearte'],
    explicacion: 'Colgado, sube las piernas o rodillas activando abdomen inferior.',
    beneficios: 'Avanzado para recto abdominal completo e iliopsoas.',
    contraindicaciones: 'Evitar si hay falta de fuerza en agarre o dolor de hombro.',
    dificultad: 'Avanzado', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '10-15', descanso_segundos: 60,
    exerciseDbId: '0142' // Hanging Leg Raise
  },
  {
    id: '44', nombre: 'Rueda Abdominal', musculo: 'Core', equipo: 'Rodillo',
    pasos: ['1. Apoya rodillas y rueda en suelo', '2. Desliza adelante extendiendo cuerpo', '3. No arquees espalda baja', '4. Regresa con fuerza abdominal'],
    explicacion: 'Extiende cuerpo adelante con rodillo ab y regresa.',
    beneficios: 'Uno de los ejercicios más duros y efectivos para core global.',
    contraindicaciones: 'Peligroso para lumbares si no se tiene fuerza base.',
    dificultad: 'Avanzado', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '8-12', descanso_segundos: 90,
    exerciseDbId: '0010' // Ab Roller
  },
  {
    id: '45', nombre: 'Twist Ruso', musculo: 'Core', equipo: 'Peso Corporal',
    pasos: ['1. Siéntate, eleva pies del piso', '2. Inclina torso atrás 45°', '3. Rota hombros a derecha', '4. Rota a izquierda'],
    explicacion: 'Giro de tronco sentado con pies en el aire.',
    beneficios: 'Fortalece oblicuos y resistencia isométrica.',
    contraindicaciones: 'Cuidado con rotaciones bajo carga si hay problemas de disco.',
    dificultad: 'Intermedio', categoria: 'Fuerza',
    sets_recomendados: 3, reps_recomendadas: '20 (10 por lado)', descanso_segundos: 60,
    exerciseDbId: '0245' // Russian Twist
  },
  {
    id: '46', nombre: 'Burpees', musculo: 'Cuerpo Completo', equipo: 'Peso Corporal',
    pasos: ['1. Empieza de pie', '2. Baja a plancha y haz flexión', '3. Salta pies hacia adelante', '4. Salta explosivamente arriba'],
    explicacion: 'Combinación de flexión de pecho, salto y sentadilla.',
    beneficios: 'Desarrolla resistencia cardiovascular masiva (HIIT).',
    contraindicaciones: 'Alto impacto en rodillas y muñecas.',
    dificultad: 'Avanzado', categoria: 'HIIT',
    sets_recomendados: 4, reps_recomendadas: '15', descanso_segundos: 60,
    exerciseDbId: '1160' // Burpee
  },
  {
    id: '47', nombre: 'Mountain Climbers', musculo: 'Cardio/Core', equipo: 'Peso Corporal',
    pasos: ['1. Posición de plancha alta', '2. Lleva rodilla derecha a pecho', '3. Cambia por la izquierda rápido', '4. Ritmo continuo y rápido'],
    explicacion: 'En posición de plancha, alterna rodillas al pecho corriendo.',
    beneficios: 'Gran ejercicio cardiovascular y de core inferior.',
    contraindicaciones: 'No rebotar la cadera demasiado alto.',
    dificultad: 'Intermedio', categoria: 'HIIT',
    sets_recomendados: 4, reps_recomendadas: '40s', descanso_segundos: 30,
    exerciseDbId: '0261' // Mountain Climber
  },
  {
    id: '48', nombre: 'Jumping Jacks', musculo: 'Cardio', equipo: 'Peso Corporal',
    pasos: ['1. De pie, pies juntos', '2. Salta abriendo piernas y brazos', '3. Cierra volviendo a inicio', '4. Repite sin pausas'],
    explicacion: 'Saltos de tijera abriendo brazos y piernas al mismo tiempo.',
    beneficios: 'Calentamiento ideal y quema calórica.',
    contraindicaciones: 'Cuidado con alto impacto si hay mucho sobrepeso.',
    dificultad: 'Principiante', categoria: 'Cardio',
    sets_recomendados: 3, reps_recomendadas: '60s', descanso_segundos: 30,
    exerciseDbId: '3220' // Jumping Jacks
  },
  {
    id: '49', nombre: 'Gato-Vaca (Felino)', musculo: 'Movilidad', equipo: 'Peso Corporal',
    pasos: ['1. Apoyo en 4 puntos (manos y rodillas)', '2. Arquea espalda arriba (gato enfadado)', '3. Hunde espalda y levanta cabeza (vaca)', '4. Alterna fluido'],
    explicacion: 'Transición fluida de extensión a flexión de columna. ¡Muy felino!',
    beneficios: 'Aumenta movilidad de columna y relaja la espalda baja.',
    contraindicaciones: 'Ninguna específica. Rango libre de dolor.',
    dificultad: 'Principiante', categoria: 'Movilidad',
    sets_recomendados: 2, reps_recomendadas: '10-12', descanso_segundos: 30,
    exerciseDbId: '0231' // Cat Cow
  },
  {
    id: '50', nombre: 'Rotación Torácica', musculo: 'Movilidad', equipo: 'Peso Corporal',
    pasos: ['1. 4 puntos de apoyo', '2. Mano derecha a nuca', '3. Rota codo derecho hacia el techo', '4. Vuelve apuntando codo al piso'],
    explicacion: 'Abre el pecho hacia un lado mejorando la rotación de la columna.',
    beneficios: 'Previene dolores de hombro y espalda alta.',
    contraindicaciones: 'Forzar la rotación si hay dolor.',
    dificultad: 'Principiante', categoria: 'Movilidad',
    sets_recomendados: 2, reps_recomendadas: '8/lado', descanso_segundos: 30,
    exerciseDbId: '1339' // Thoracic rotation / open book
  }
];
