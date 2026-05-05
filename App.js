import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0B0E' }}>
          <StatusBar style="light" />
          <BottomTabNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
