import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Modal, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import * as Location from 'expo-location';
import { DatosContext } from './Datos';


const Inicio = () => {
    const { fallasCompletas, calcularDistancia, toggleVisited } = useContext(DatosContext);
    const mapView = React.useRef(null);
    const [fallas, setFallas] = useState([]);
    const [modalFallaVisible, setmodalFallaVisible] = useState(false);
    const [fallaDetalle, setfallaDetalle] = useState({});

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

    const renderFallaDetalle = ({ item }) => (

        <View>
            <Text style={styles.detallesFallaTexto}>{item.nombre}</Text>
            <Text style={styles.detallesFallaTexto}>{item.seccion}</Text>
            <Text style={styles.detallesFallaTexto}>{item.tipo}</Text>
            <Text style={styles.detallesFallaTexto}>{item.presidente}</Text>
            <Text style={styles.detallesFallaTexto}>{item.lema}</Text>
            <Text style={styles.detallesFallaTexto}>{item.anyo_fundacion}</Text>
        </View>
    );

    const handlefallaDetalle = (falla) => {
        setmodalFallaVisible(true);
        setfallaDetalle(falla);
    }

    const toggleVisitedDetalle = (detalle) => {
        setfallaDetalle(prevFallaDetalle => ({
            ...prevFallaDetalle,
            visitado: !detalle.visitado
        }));
    };
    
    const elegirImage = (falla) => {
    let imageFalla ;

    if(falla.tipo === "Mayor"&& falla.seccion!="Especial"){
        imageFalla = require('../assets/fire.png');
    }else if(falla.tipo === "Infantil"&& falla.seccion!="Inf. Especial"){
        imageFalla = require('../assets/fire_green.png');
    }else if(falla.seccion==="Especial"){
        imageFalla = require('../assets/fire_blue.png');
    }else if(falla.seccion==="Inf. Especial"){
        imageFalla = require('../assets/fire_pink.png');
    }
    return imageFalla;
    }


    return (
        <View>
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
                        onPress={() => handlefallaDetalle(falla)}
                        pinColor={falla.tipo === "Mayor" ? 'green' : 'red'}
                    >
                        <Image source={elegirImage(falla)} style={{height: 40, width:40 }} />
                    </Marker>
                ))}
            </MapView>
            <Modal animationType="slide" transparent={true} visible={modalFallaVisible} >
                <View style={[styles.viewDetalleFalla, styles.shadowBoxDetalle]}>
                    <View style={styles.shadowBoxImage}>
                        <Image style={styles.image_style} source={{ uri: fallaDetalle.boceto }} />
                    </View>
                    <View style={styles.containerBotonesDetalles}>
                        <TouchableOpacity style={styles.botonesDetalles} onPress={() => { toggleVisited(fallaDetalle); toggleVisitedDetalle(fallaDetalle) }}>
                            <Ionicons name="star" color={fallaDetalle.visitado ? '#FF8C00' : "gray"} size={50} style={styles.iconDetalle} />
                            <Text style={[styles.TextoBotonesDetalle, { marginLeft: -5 }]}>VISITADO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botonesDetalles}>
                            <Ionicons name="share" color={'gray'} size={50} style={styles.iconDetalle} />
                            <Text style={styles.TextoBotonesDetalle}>COMPARTIR</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detallesFalla}>
                        <FlatList
                            data={[fallaDetalle]}
                            renderItem={renderFallaDetalle}
                            keyExtractor={(item) => item.objectid.toString()} />
                    </View>
                    <TouchableOpacity style={styles.buttonDetalles} onPress={() => { setmodalFallaVisible(false) }}>
                        <Text style={styles.botonVolver}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );


}
const styles = StyleSheet.create({
    viewDetalleFalla: {
        height: "75%",
        width: "95%",
        backgroundColor: "white",
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
        marginTop: "50%"

    },
    shadowBoxDetalle: {
        shadowColor: '#1E1E1E',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    shadowBoxImage: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    containerBotonesDetalles: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 25
    },
    botonesDetalles: {
        marginHorizontal: 20,
    },
    TextoBotonesDetalle: {
        fontWeight: "bold",
        textAlign: "center",
        color: "#FF8C00"
    },
    iconDetalle: {
        alignSelf: "center",

    },
    detallesFalla: {
        marginLeft: 20,
        marginTop: 10
    },
    detallesFallaTexto: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 7
    },
    buttonDetalles: {
        width: 100,
        backgroundColor: "#FF8C00",
        alignSelf: "center",
        paddingVertical: 10,
        borderRadius: 10,
    },
    botonVolver: {
        fontWeight: "bold",
        color: "white",
        alignSelf: "center"
    },
    image_style: {
        width: 300,
        height: 300,
        borderRadius: 300 / 2,
        alignSelf: "center",
        marginTop: "-40%",
        overflow: "hidden",
        borderWidth: 5,
        borderColor: "white",
        backgroundColor: "lightgray"
    },
});


export default Inicio;
