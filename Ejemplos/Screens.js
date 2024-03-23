import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Alert, View, Text, Image } from 'react-native';
import Acceder from './Acceder';
import Login from './Login';
import Camara from './Camara';
import MainTabNavigator from './BarraNavegadora';
import { DatosContext } from './Datos';
import LottieView from 'lottie-react-native';


const Stack = createStackNavigator();

function MyStack() {
    const { loadData, loadData_Infantiles } = useContext(DatosContext);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadDataAsync = async () => {

            await Promise.all([loadData(), loadData_Infantiles()]);
            setTimeout(async () => {
                setIsLoading(false);
            }, 2000);
        }
        loadDataAsync();


    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                 <Image
                    source={require('../assets/Logo.png')}
                    style={styles.overlayImage}
                />
                
                <Text style={styles.loadingText}> Reacting Falles</Text>
                <LottieView style={{
                    width: 100,
                    height: 100,
                }} source={require('../assets/loading.json')} autoPlay loop />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Acceder" component={Acceder} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Camara" component={Camara} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff8c00',
    },
    overlayImage: {
        position: 'absolute',
        width: '50%', 
        height: '50%', 
        resizeMode: 'cover', 
    },
    loadingText: {
        color: 'white',
        marginTop: 500,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default MyStack;