import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaScreen from './src/screens/ListaScreen';
import DetalleScreen from './src/screens/DetalleScreen';
import NuevoScreen from './src/screens/NuevoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen 
          name="Lista" 
          component={ListaScreen} 
          options={{ title: 'Directorio de Contactos' }} 
        />
        <Stack.Screen 
          name="Detalle" 
          component={DetalleScreen} 
          options={({ route }) => ({
            title: route.params?.nombre || 'Detalle del Contacto',
          })} 
        />
        <Stack.Screen 
          name="Nuevo" 
          component={NuevoScreen} 
          options={{ title: 'Nuevo Contacto' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}