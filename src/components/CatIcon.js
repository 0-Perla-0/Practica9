import React from 'react';
import { View } from 'react-native';
import { Footprints } from 'lucide-react-native';

const CatIcon = ({ color, size, focused }) => {
  return (
    <View style={{
      transform: [
        { rotate: '-15deg' }, // Ligeramente rotado para simular huellitas de gato saltando
        { scale: focused ? 1.1 : 1 }
      ],
      opacity: focused ? 1 : 0.6
    }}>
      <Footprints color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
    </View>
  );
};

export default CatIcon;
