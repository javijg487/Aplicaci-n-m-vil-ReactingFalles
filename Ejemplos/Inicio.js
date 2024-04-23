import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';
import { DatosContext } from './Datos';


const Inicio = () => {
    const { fallasCompletas, calcularDistancia } = useContext(DatosContext);
    const mapView = React.useRef(null);
    const [fallas, setFallas] = useState([]);

    useEffect(() => {
        const loadFallas = async () => {
            const fallasData = await fallasCompletas();
            setFallas(fallasData);
        };

        loadFallas();
    }, [fallasCompletas]);

    useEffect(() => {

        initMap();
    }, []);

    const getCurrentLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});

        calcularDistancia(location);
        let region = {
            latitude: parseFloat(location.coords.latitude),
            longitude: parseFloat(location.coords.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        };
        // setRegion con animación

        mapView.current.animateToRegion(region, 2000);
    }

    const requestLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No hay permisos de localización')
            return;
        }
    };

    const initMap = async () => {
        await requestLocationPermission();
        getCurrentLocation();
    };
    
    const uniqueFallas = fallas.reduce((acc, current) => {
        if (!acc.find(item => item.nombre === current.nombre)) {
            acc.push(current);
        }
        return acc;
    }, []);

    

    return (
        <MapView
            style={{ width: '100%', height: '100%' }}
            showsUserLocation={true}
            followUserLocation={true}
            zoomEnabled={true}
            ref={mapView}
            initialRegion={{
                latitude: 39.513,
                longitude: -0.4242,
                latitudeDelta: 1.01,
                longitudeDelta: 1.01,
            }}

        >
            {fallas.map((falla) => (
                <Marker
                    key={falla.objectid}
                    coordinate={{
                        latitude: falla.geo_point_2d.lat,
                        longitude: falla.geo_point_2d.lon
                    }}
                    title={falla.nombre}
                    description={falla.seccion}
                    pinColor={falla.tipo === "Mayor" ? 'green' : 'red'}
                />
            ))}

            {/*… Aquí los componentes personalizados …*/}
        </MapView>
    );


}



export default Inicio;
