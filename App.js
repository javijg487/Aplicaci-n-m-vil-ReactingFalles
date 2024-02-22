import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View } from 'react-native';
import Acceder from './Ejemplos/Acceder';
import Lista_Fallas from './Ejemplos/Lista_Fallas';
import Login from './Ejemplos/Login';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Acceder" component={Acceder} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainTabNavigator = () => (
  <Tab.Navigator  tabBarOptions={{
    activeTintColor: '#FF8C00', 
    inactiveTintColor: 'gray', 
  }}>
    <Tab.Screen 
          name="Lista_Fallas" 
          component={Lista_Fallas} 
          options={{ 
            headerShown: false , 
            tabBarLabel: 'Fallas',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location-sharp" color={color} size={size} />
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
});
