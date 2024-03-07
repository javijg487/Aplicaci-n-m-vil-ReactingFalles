import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import { DatosProvider } from './Ejemplos/Datos';
import MyStack from './Ejemplos/Screens';


export default function App() {
  return (

    <DatosProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="default" />
        <MyStack />
      </SafeAreaView>
    </DatosProvider>
  );
}

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
