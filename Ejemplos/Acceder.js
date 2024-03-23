
import React, { useState, useEffect } from 'react';
import { View,Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Acceder = ({ navigation }) => {
    const [myUsername, setmyUsername] = useState('');
    
    const AccederUser = () => {
        if(myUsername === ""){
            navigation.navigate('Login');
        }else{
            navigation.navigate('MainTabNavigator', {screen: 'Inicio'})
        }
    }
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


      useEffect(() => {
        readUsername();
      }, []);
    return (
        <View style={styles.container}>

                <ImageBackground
                    source={{ uri: 'https://pbs.twimg.com/media/FrXl1IjWIAAY7XD.jpg:large' }}
                    style={styles.image_style}

                >
                    <Text style={styles.title}>ReactingFalles</Text>
                    
                    <View style={styles.button_collocation}>
                        <TouchableOpacity style={styles.button}  onPress={() => AccederUser()} >
                            <Text style={styles.buttonText}>Acceder</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
    );
};

export default Acceder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 20,
        color: '#ff8c00',
        textAlign: 'center',
    },
    image_style: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    button_collocation: {
        alignSelf: 'center',
        width: '50%',
        marginTop: 400,

    },
    button:{
        backgroundColor: '#ff8c00',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        padding: 10,
        fontSize: 17,
        fontWeight: 'bold',

    }
});
