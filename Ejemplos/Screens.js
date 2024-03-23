import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Acceder from './Acceder';
import Login from './Login';
import Camara from './Camara';
import MainTabNavigator from './BarraNavegadora';
import { DatosContext } from './Datos';



const Stack = createStackNavigator();
function MyStack() {
    const { loadData, loadData_Infantiles } = useContext(DatosContext);
    useEffect(() => {
        loadData();
        loadData_Infantiles();
        
    }, []);

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
export default MyStack;