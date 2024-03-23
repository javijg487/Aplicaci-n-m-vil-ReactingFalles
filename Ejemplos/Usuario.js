import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Usuario = ({ navigation }) => {
    const [myUsername, setmyUsername] = useState('');

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

      useEffect(() => {
        readUsername();
      }, []);

    return (
        <View style={styles.button_collocation}>
            <Text style={styles.title}>{myUsername}</Text>
            <TouchableOpacity style={styles.button} onPress={() => cerrarSesion()} >
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button_collocation: {
        alignSelf: 'center',
        width: '50%',
        marginTop: 400,

    },
    button: {
        backgroundColor: '#ff8c00',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 20,
        color: '#ff8c00',
        textAlign: 'center',
    },
});
export default Usuario;