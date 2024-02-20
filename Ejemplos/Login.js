import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View, TextInput, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';



export default function Login({navigation}) {

  const [myUsername, setmyUsername] = useState('');

  const saveUsername = async () => {
    try {
      await AsyncStorage.setItem(
        'myUsername',
        myUsername
      );
    } catch (error) {
      console.log(error);
    }
  };

  const readUsername = async () => {
    try {
      const value =
        await AsyncStorage.getItem('myUsername');
      if (value !== null) {
        setmyUsername(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readUsername();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.normalText}>Usuario</Text>
        <TextInput style={styles.input} onChangeText={text => setmyUsername(text)}
        value={myUsername}></TextInput>
      </View >
      <View style={styles.button}>
        <Button
          title='Iniciar Sesión'
          onPress={() => {
            saveUsername();
            navigation.navigate('ClicMe');
          }}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 20,
  },
  button: {
    alignSelf: 'stretch'

  },
  input: {
    height: 40,
    marginStart: 10,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 16,
    flex: 1,
  },
  normalText: {
    marginStart: 10,
    fontSize: 16,
    minWidth: 85
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'stretch'
  },
});
