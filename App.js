import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Acceder from './Ejemplos/Acceder';
import ClicMe from './Ejemplos/ClicMe';
import Login from './Ejemplos/Login';

const Stack = createStackNavigator();
export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Acceder" component={Acceder} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ClicMe" component={ClicMe} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
