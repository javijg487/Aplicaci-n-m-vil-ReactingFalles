import React, { useEffect } from 'react';
import { StyleSheet, Alert} from 'react-native';
import MapView, {Marker } from 'react-native-maps';
import * as Location from 'expo-location';


const Inicio = () => {

    const mapView = React.useRef(null);
    useEffect(() => {
        const getCurrentLocation = async () => {
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
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
        requestLocationPermission();
        getCurrentLocation();
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
            <Marker
                coordinate={
                    {
                        latitude: 39.513058,
                        longitude: -0.424272
                    }}
                title={"Falla"}
                pinColor='blue'
                //image={require('../assets/portada.png')}
            />
            {/*… Aquí los componentes personalizados …*/}
        </MapView>
    );


}



export default Inicio;
