import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Dumbbell, History, BookOpen, LineChart } from 'lucide-react-native';

// Pantallas
import DashboardScreen from '../screens/DashboardScreen';
import EntrenarScreen from '../screens/EntrenarScreen';
import HistorialScreen from '../screens/HistorialScreen';
import EjerciciosScreen from '../screens/EjerciciosScreen';
import ProgresoScreen from '../screens/ProgresoScreen';

// Componente Personalizado
import CatIcon from '../components/CatIcon';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#0B0B0E',
          borderTopColor: '#1A1A24',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#8A2BE2',
        tabBarInactiveTintColor: '#A0A0B0',
        tabBarIcon: ({ focused, color, size }) => {
          // Si queremos usar CatIcon en alguna tab específica o en todas
          // En este caso, usaremos CatIcon como el indicador de la pestaña 'Dashboard'
          // y los otros iconos para el resto, para mostrar variedad. O podemos usarlo
          // cuando está enfocado.
          
          if (route.name === 'Dashboard') {
             // Usamos el icono de gato siempre para el Dashboard
             return <CatIcon color={color} size={size} focused={focused} />;
          }

          let IconComponent;
          switch (route.name) {
            case 'Entrenar':
              IconComponent = Dumbbell;
              break;
            case 'Historial':
              IconComponent = History;
              break;
            case 'Ejercicios':
              IconComponent = BookOpen;
              break;
            case 'Progreso':
              IconComponent = LineChart;
              break;
            default:
              IconComponent = Home;
          }

          // Si está enfocado, quizás mostrar el CatIcon para reforzar identidad en lugar del icono normal?
          // El requerimiento dice: "Usa este icono como el indicador de selección en la barra de navegación."
          // Entonces, si está enfocado, mostramos la huellita de gato, si no, el icono normal.
          if (focused) {
             return <CatIcon color="#8A2BE2" size={size} focused={true} />;
          }

          return <IconComponent color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Entrenar" component={EntrenarScreen} />
      <Tab.Screen name="Historial" component={HistorialScreen} />
      <Tab.Screen name="Ejercicios" component={EjerciciosScreen} />
      <Tab.Screen name="Progreso" component={ProgresoScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
