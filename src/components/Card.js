import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Cat } from 'lucide-react-native';

const Card = ({ children, style, title }) => {
  return (
    <View style={[styles.card, style]}>
      {/* Sutil detalle temático de gatito en la esquina superior derecha */}
      <View style={styles.catIconContainer}>
        <Cat color="#8A2BE2" size={24} opacity={0.15} />
      </View>
      
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16161E', // Un tono ligeramente más claro que el fondo principal
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#2A2A3A',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  catIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    color: '#E0E0E0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 0.5,
  }
});

export default Card;
