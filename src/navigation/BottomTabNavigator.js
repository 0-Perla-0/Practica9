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
          
          let IconComponent;
          switch (route.name) {
            case 'Dashboard':
              IconComponent = CatIcon;
              break;
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

          return <IconComponent color={focused ? "#8A2BE2" : "#A0A0B0"} size={size} />;
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
