import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
const Usuario = ({ navigation }) => {
  const [myUsername, setmyUsername] = useState('');

  useEffect(() => {
    readUsername();
  }, []);

  const eliminarUsuario = async () => {
    try {
      await AsyncStorage.removeItem('myUsername');
      setmyUsername('');

    } catch (error) {
      console.log(error);
    }
  };
  const readUsername = async () => {
    try {
      const myUsername =
        await AsyncStorage.getItem('myUsername');
      if (myUsername !== null) {
        setmyUsername(myUsername);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cerrarSesion = () => {
    eliminarUsuario();
    navigation.navigate('Acceder');
  }
  const cambiarUsuario = () => {
    eliminarUsuario();
    navigation.navigate('Login');
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{myUsername}</Text>
        <View style={{ flex: 1 }} />
        
        <Image
                    source={require('../assets/Logo.png')}
                    style={styles.iconPosiciontitle}
                />
      </View>



      <TouchableOpacity style={styles.button} onPress={() => cambiarUsuario()}>
        <View style={styles.containerList}>
          <Ionicons style={styles.iconPosicion} name="pencil-outline" color={"#FF8C00"} size={50} />
          <Text style={styles.title2}>Editar Usuario</Text>
        </View>

      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => cerrarSesion()} >
        <View style={styles.containerList}>
          <Ionicons style={styles.iconPosicion} name="log-out-outline" color={"#FF8C00"} size={50} />
          <Text style={styles.title2}>Cerrar Sesión</Text>
        </View>
      </TouchableOpacity>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
    zIndex: 2,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  containerList: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E5',
    width: '100%', // Ancho del contenedor al 100% del padre
    height: 100,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 10,
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'center',
    margin: 10,
  },
  iconPosicion: {
    margin: 10,
    marginRight: 20,
    alignSelf: 'center',
  },
  iconPosiciontitle: {
    margin: 10,
    marginRight: 20,
    alignSelf: 'center',
    width: 100, 
    height: 80 

  },
});
export default Usuario;