import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Lista_Fallas from './Lista_Fallas';
import Inicio from './Inicio';
import Visitado from './Visitado';
import Usuario from './Usuario';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#FF8C00',
            tabBarInactiveTintColor: 'gray',
        }}>
            <Tab.Screen
                name="Inicio"
                component={Inicio}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Inicio', //Podriamos ponerle mapa
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="location-sharp" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Lista_Fallas"
                component={Lista_Fallas}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Fallas',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Visitado"
                component={Visitado}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Visitado',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="star-outline" color={color} size={size} />
                        // <Ionicons name="flag" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Usuario"
                component={Usuario}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Usuario',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" color={color} size={size} />
                    )
                }}
            />


        </Tab.Navigator>
    );
}

export default MainTabNavigator;