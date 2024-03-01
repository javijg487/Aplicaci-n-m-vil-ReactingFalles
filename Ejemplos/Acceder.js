import React from 'react';
import { View,Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Acceder = ({ navigation }) => {
    return (
        <View style={styles.container}>

                <ImageBackground
                    source={{ uri: 'https://pbs.twimg.com/media/FrXl1IjWIAAY7XD.jpg:large' }}
                    style={styles.image_style}

                >
                    <Text style={styles.title}>ReactingFalles</Text>
                    <View style={styles.button_collocation}>
                        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('Login')} >
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
        fontSize: 17

    }
});
