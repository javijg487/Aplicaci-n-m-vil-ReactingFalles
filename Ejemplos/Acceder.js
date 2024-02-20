import React from 'react';
import { View,Text, Button, StyleSheet, ImageBackground } from 'react-native';

const Acceder = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <ImageBackground
                source={{ uri: 'https://pbs.twimg.com/media/FrXl1IjWIAAY7XD.jpg:large' }}
                style={styles.image_style}

            >
                <Text style={styles.title}>ReactingFalles</Text>
                <View style={styles.button}>
                    <Button color='#ff8c00' title="Acceder" onPress={() => navigation.navigate('Login')} />
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
    button: {
        alignSelf: 'center',
        width: '50%',
        marginTop: 400,

        backgroundColor: '#ff9401',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        borderRadius: 30,
    },
});
