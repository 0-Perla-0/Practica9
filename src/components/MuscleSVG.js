import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Ellipse, Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const MuscleSVG = ({ musculo, size = 150 }) => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const m = (musculo || '').toLowerCase();
  
  const isPecho = m.includes('pecho');
  const isEspalda = m.includes('espalda') || m.includes('dorsal');
  const isPiernas = m.includes('pierna') || m.includes('glúteo') || m.includes('femoral') || m.includes('cuádriceps') || m.includes('pantorrilla');
  const isHombros = m.includes('hombro') || m.includes('deltoide');
  const isBrazos = m.includes('bíceps') || m.includes('tríceps') || m.includes('brazo');
  const isCore = m.includes('core') || m.includes('abdom');
  const isCardio = m.includes('cardio') || m.includes('cuerpo completo');

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* Cuerpo Base (Stick figure) */}
        {/* Cabeza */}
        <Circle cx="50" cy="15" r="8" stroke="#A0A0B0" strokeWidth="2" fill="none" />
        {/* Tronco */}
        <Line x1="50" y1="23" x2="50" y2="55" stroke="#A0A0B0" strokeWidth="2" />
        {/* Brazos */}
        <Path d="M 50 30 L 30 45 L 20 35" stroke="#A0A0B0" strokeWidth="2" fill="none" />
        <Path d="M 50 30 L 70 45 L 80 35" stroke="#A0A0B0" strokeWidth="2" fill="none" />
        {/* Piernas */}
        <Path d="M 50 55 L 35 75 L 35 95" stroke="#A0A0B0" strokeWidth="2" fill="none" />
        <Path d="M 50 55 L 65 75 L 65 95" stroke="#A0A0B0" strokeWidth="2" fill="none" />

        {/* --- Áreas Musculares Animadas --- */}

        {/* Cardio / Full Body (Todo el cuerpo pulsa) */}
        {(isCardio || m === '') && (
           <AnimatedCircle cx="50" cy="50" r="40" fill="#8A2BE2" opacity={pulseAnim} />
        )}

        {/* Pecho */}
        {isPecho && !isCardio && (
          <AnimatedEllipse cx="50" cy="30" rx="12" ry="6" fill="#8A2BE2" opacity={pulseAnim} />
        )}

        {/* Espalda */}
        {isEspalda && !isCardio && (
          <AnimatedPath d="M 40 25 L 60 25 L 55 45 L 45 45 Z" fill="#8A2BE2" opacity={pulseAnim} />
        )}

        {/* Piernas / Glúteos */}
        {isPiernas && !isCardio && (
          <>
            <AnimatedPath d="M 50 55 L 35 75 L 40 75 L 53 58 Z" fill="#8A2BE2" opacity={pulseAnim} />
            <AnimatedPath d="M 50 55 L 65 75 L 60 75 L 47 58 Z" fill="#8A2BE2" opacity={pulseAnim} />
            {m.includes('glúteo') && (
               <AnimatedEllipse cx="50" cy="55" rx="10" ry="6" fill="#8A2BE2" opacity={pulseAnim} />
            )}
          </>
        )}

        {/* Hombros */}
        {isHombros && !isCardio && (
          <>
            <AnimatedCircle cx="40" cy="28" r="4" fill="#8A2BE2" opacity={pulseAnim} />
            <AnimatedCircle cx="60" cy="28" r="4" fill="#8A2BE2" opacity={pulseAnim} />
          </>
        )}

        {/* Brazos (Bíceps / Tríceps) */}
        {isBrazos && !isCardio && (
          <>
            <AnimatedPath d="M 48 32 L 32 44 L 35 47 L 50 35 Z" fill="#8A2BE2" opacity={pulseAnim} />
            <AnimatedPath d="M 52 32 L 68 44 L 65 47 L 50 35 Z" fill="#8A2BE2" opacity={pulseAnim} />
          </>
        )}

        {/* Core / Abdomen */}
        {isCore && !isCardio && (
          <AnimatedPath d="M 46 38 L 54 38 L 54 52 L 46 52 Z" fill="#8A2BE2" opacity={pulseAnim} />
        )}

      </Svg>
    </View>
  );
};

export default MuscleSVG;
