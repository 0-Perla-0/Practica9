import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Svg, { G, Path, Circle, Ellipse, Rect } from 'react-native-svg';

const AnimatedG = Animated.createAnimatedComponent(G);

const MuscleSVG = ({ musculo, size = 200 }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim]);

  const m = (musculo || '').toLowerCase();
  const isPecho = m.includes('pecho') || m.includes('pectoral');
  const isEspalda = m.includes('espalda') || m.includes('dorsal');
  const isPiernas = m.includes('pierna') || m.includes('glúteo') || m.includes('femoral') || m.includes('cuádriceps') || m.includes('pantorrilla');
  const isHombros = m.includes('hombro') || m.includes('deltoide');
  const isBiceps = m.includes('bíceps');
  const isTriceps = m.includes('tríceps');
  const isCore = m.includes('core') || m.includes('abdom');
  const isCardio = m.includes('cardio') || m.includes('cuerpo completo');

  const ACTIVE = '#8A2BE2';
  const BODY = '#2A2A3A';

  const getLabel = () => {
    if (isPecho) return 'Pectorales';
    if (isEspalda) return 'Dorsales';
    if (isPiernas) return 'Piernas / Glúteos';
    if (isHombros) return 'Deltoides';
    if (isBiceps) return 'Bíceps';
    if (isTriceps) return 'Tríceps';
    if (isCore) return 'Abdominales';
    if (isCardio) return 'Cuerpo Completo';
    return musculo || 'Músculo';
  };

  // Color helpers
  const headColor = isCardio ? ACTIVE : BODY;
  const torsoColor = isCardio ? ACTIVE : BODY;
  const chestColor = (isPecho || isCardio) ? ACTIVE : BODY;
  const backColor = (isEspalda || isCardio) ? ACTIVE : BODY;
  const shoulderColor = (isHombros || isCardio) ? ACTIVE : BODY;
  const upperArmLColor = (isBiceps || isTriceps || isCardio) ? ACTIVE : BODY;
  const upperArmRColor = (isBiceps || isTriceps || isCardio) ? ACTIVE : BODY;
  const forearmColor = isCardio ? ACTIVE : BODY;
  const coreColor = (isCore || isCardio) ? ACTIVE : BODY;
  const upperLegColor = (isPiernas || isCardio) ? ACTIVE : BODY;
  const lowerLegColor = (isPiernas || isCardio) ? ACTIVE : BODY;

  const svgW = 120;
  const svgH = 200;
  const scale = size / svgW;
  const viewH = svgH;

  return (
    <View style={{ alignItems: 'center' }}>
      <Animated.View style={{ transform: [{ scale: isPecho || isEspalda || isPiernas || isHombros || isBiceps || isTriceps || isCore || isCardio ? pulseAnim : 1 }] }}>
        <Svg width={size} height={size * (viewH / svgW)} viewBox={`0 0 ${svgW} ${viewH}`}>

          {/* Head */}
          <Circle cx="60" cy="22" r="14" fill={headColor} />

          {/* Neck */}
          <Rect x="55" y="35" width="10" height="8" rx="2" fill={torsoColor} />

          {/* Shoulders */}
          <Ellipse cx="38" cy="48" rx="10" ry="7" fill={shoulderColor} />
          <Ellipse cx="82" cy="48" rx="10" ry="7" fill={shoulderColor} />

          {/* Torso */}
          <Path
            d="M 42 43 L 78 43 L 80 100 L 40 100 Z"
            fill={torsoColor}
          />

          {/* Chest overlay */}
          <Ellipse cx="52" cy="58" rx="9" ry="7" fill={chestColor} />
          <Ellipse cx="68" cy="58" rx="9" ry="7" fill={chestColor} />

          {/* Back overlay (shows behind torso conceptually, we layer it) */}
          <Path
            d="M 47 50 L 73 50 L 71 80 L 49 80 Z"
            fill={backColor}
            opacity={isEspalda ? 1 : 0}
          />

          {/* Core / Abs */}
          <Rect x="51" y="68" width="18" height="28" rx="4" fill={coreColor} />
          {/* Ab lines */}
          {(isCore || isCardio) && (
            <>
              <Rect x="52" y="70" width="7" height="5" rx="1" fill="#6A1FBF" />
              <Rect x="61" y="70" width="7" height="5" rx="1" fill="#6A1FBF" />
              <Rect x="52" y="78" width="7" height="5" rx="1" fill="#6A1FBF" />
              <Rect x="61" y="78" width="7" height="5" rx="1" fill="#6A1FBF" />
              <Rect x="52" y="86" width="7" height="5" rx="1" fill="#6A1FBF" />
              <Rect x="61" y="86" width="7" height="5" rx="1" fill="#6A1FBF" />
            </>
          )}

          {/* Upper Arms */}
          <Path
            d="M 30 48 L 38 48 L 30 80 L 24 78 Z"
            fill={upperArmLColor}
          />
          <Path
            d="M 82 48 L 90 48 L 96 78 L 90 80 Z"
            fill={upperArmRColor}
          />

          {/* Forearms */}
          <Path
            d="M 24 78 L 30 80 L 22 108 L 18 106 Z"
            fill={forearmColor}
          />
          <Path
            d="M 90 80 L 96 78 L 98 106 L 102 108 Z"
            fill={forearmColor}
          />

          {/* Hands */}
          <Circle cx="20" cy="110" r="4" fill={forearmColor} />
          <Circle cx="100" cy="110" r="4" fill={forearmColor} />

          {/* Upper Legs / Glutes */}
          <Path
            d="M 42 98 L 58 98 L 54 145 L 38 145 Z"
            fill={upperLegColor}
          />
          <Path
            d="M 62 98 L 78 98 L 82 145 L 66 145 Z"
            fill={upperLegColor}
          />

          {/* Lower Legs */}
          <Path
            d="M 38 145 L 54 145 L 50 185 L 40 185 Z"
            fill={lowerLegColor}
          />
          <Path
            d="M 66 145 L 82 145 L 80 185 L 70 185 Z"
            fill={lowerLegColor}
          />

          {/* Feet */}
          <Ellipse cx="45" cy="190" rx="8" ry="4" fill={lowerLegColor} />
          <Ellipse cx="75" cy="190" rx="8" ry="4" fill={lowerLegColor} />

        </Svg>
      </Animated.View>
      <Text style={styles.label}>{getLabel()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#8A2BE2',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default MuscleSVG;
