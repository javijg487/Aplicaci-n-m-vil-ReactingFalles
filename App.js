import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView,StatusBar } from 'react-native';
import Acceder from './Ejemplos/Acceder';
import Lista_Fallas from './Ejemplos/Lista_Fallas';
import Inicio from './Ejemplos/Inicio';
import Login from './Ejemplos/Login';
import Visitado from './Ejemplos/Visitado';
import Usuario from './Ejemplos/Usuario';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="default" />
    <NavigationContainer>
      
      <Stack.Navigator>
        <Stack.Screen name="Acceder" component={Acceder} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}

const MainTabNavigator = () => (
  <Tab.Navigator  tabBarOptions={{
    activeTintColor: '#FF8C00', 
    inactiveTintColor: 'gray', 
  }}>
    <Tab.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{ 
            headerShown: false , 
            tabBarLabel: 'Inicio', //Podriamos ponerle mapa
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location-sharp" color={color} size={size} />
            )
          }}
        />
    <Tab.Screen 
          name="Lista_Fallas" 
          component={Lista_Fallas} 
          options={{ 
            headerShown: false , 
            tabBarLabel: 'Fallas',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            )
          }}
        />
    <Tab.Screen 
          name="Visitado" 
          component={Visitado} 
          options={{ 
            headerShown: false , 
            tabBarLabel: 'Visitado',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="star-outline" color={color} size={size} />
              // <Ionicons name="flag" color={color} size={size} />
            )
          }}
        />
    <Tab.Screen 
          name="Usuario" 
          component={Usuario} 
          options={{ 
            headerShown: false , 
            tabBarLabel: 'Usuario',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={size} />
            )
          }}
        />
    
    
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    paddingTop: ExpoStatusBar.currentHeight,

  },
});
