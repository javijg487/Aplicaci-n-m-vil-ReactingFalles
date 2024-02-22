import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import { StyleSheet, Text, View } from 'react-native';
import Acceder from './Ejemplos/Acceder';
import Lista_Fallas from './Ejemplos/Lista_Fallas';
import Login from './Ejemplos/Login';

const Stack = createStackNavigator();
export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Acceder" component={Acceder} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Lista_Fallas" component={Lista_Fallas} />

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
