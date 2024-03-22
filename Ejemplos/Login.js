
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
//import { Divider } from '@rneui/themed';
//<Divider inset={true} insetType="middle" ></Divider>



export default function Login({ navigation }) {

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
    <View style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require('../assets/login.jpg')}
          style={styles.image_style}
        />
        <Text style={styles.reactingText} >Reacting Falles</Text>
      </View>

      <View style={[styles.loginBox, styles.shadowBox]}>

        <Text style={styles.titleText}>Iniciar sesión</Text>

        <View style={styles.credentialsLogin}>
          <Text style={styles.normalText}>Usuario</Text>
          <TextInput style={styles.input} onChangeText={text => setmyUsername(text)} value={myUsername} />

          <TouchableOpacity style={styles.loginButton}
          onPress={() => {
            saveUsername();
            navigation.navigate('MainTabNavigator', {screen: 'Inicio'})
          }}>
            <Text style={[styles.normalText, { textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white' }]}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FF8C00',

  },
  container: {
    flex: 1,
  },
  reactingText: {
    fontSize: 40,
    marginTop: -250,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  image_style: {
    height: '90%',
    width: '100%',
    opacity: 0.9,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150
  },
  loginBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -150,
    height: '80%',
    width: '80%',
    alignSelf: 'center',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,

  },
  shadowBox: {
    shadowColor: '#1E1E1E',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  input: {
    fontSize: 18,
    color: '#FFFFFF',
    backgroundColor: '#1E1E1E',
    padding: 10,
    paddingLeft: 10,
    borderRadius: 10,
    opacity: .9,
    marginBottom: '10%'

  },
  normalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E'
  },
  titleText: {
    fontSize: 30,
    marginTop: '20%',
    marginBottom: '10%',
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center'
  },
  credentialsLogin: {
    marginHorizontal: '10%'
  },
  loginButton: {
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  }
});
