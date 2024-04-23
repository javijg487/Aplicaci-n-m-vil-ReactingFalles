import React, { useContext, useEffect, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { DatosContext } from './Datos';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Alert, StyleSheet, Text,Modal, Image, FlatList} from 'react-native';


const Camara = () => {
    const [status, requestPermission] = useCameraPermissions();
    const [alerta, setAlerta] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [flash, setFlash] = useState('off');
    const [data, setData] = useState('');
    const [modalFallaVisible, setmodalFallaVisible] = useState(false);
    const { fallasCompletas, toggleVisited} = useContext(DatosContext);
    const [fallaDetalle, setfallaDetalle] = useState({});
    const falla_completa = fallasCompletas();
    
    useEffect(() => {
        if (!alerta) {
            getCameraPermissions();
            console.log('Permios');
        }
    }, [alerta]);


    const getCameraPermissions = async () => {
        let { status } = await requestPermission();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'La aplicación necesita acceso a la cámara para funcionar correctamente.');
            setAlerta(true);
            return;
        }
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

    /*
    const concederPermiso = async () => {
        setAlerta(false);
        await getCameraPermissions();
    };

    if (status !== 'granted') {
        return (
            
            <View style={styles.container}>
                <Text>No se ha concedido permiso para la cámara.</Text>
                <TouchableOpacity onPress={concederPermiso}>
                    <Text>Conceder permiso</Text>
                </TouchableOpacity>
            </View>
           
        );
    }
    */
    const handleBarCodeScanned = (Data) => {
        setScanned(true);
        setData(Data)
        console.log("Data: " + Data)
        const idFalla = JSON.stringify(data.data);
        const fallaEncontrada = falla_completa.find(falla => falla.id_falla === idFalla);
        if (fallaEncontrada) {
            setmodalFallaVisible(!modalFallaVisible);
            setfallaDetalle(fallaEncontrada);
        }
    };
    const toggleVisitedDetalle = (detalle) => {
        setfallaDetalle(prevFallaDetalle => ({
            ...prevFallaDetalle,
            visitado: !detalle.visitado
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <CameraView style={styles.camera}
                    facing="back"
                    barCodeScannerSettings={{
                        barCodeTypes: ["qr"],
                    }}
                    flashMode={flash}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                >
                </CameraView>

            </View>
            <Text style={styles.maintext}>{JSON.stringify(data.data)}</Text>
            {scanned && <TouchableOpacity title={'Scan again?'} onPress={() => setScanned(false)} color='tomato'>
                <Text>Scan again?</Text></TouchableOpacity>}


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
                            <Ionicons name="location" color={'gray'} size={50} style={styles.iconDetalle} />
                            <Text style={styles.TextoBotonesDetalle}>MAPA</Text>
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
                    <TouchableOpacity style={styles.buttonDetalles} onPress={() => { setmodalFallaVisible(!modalFallaVisible) }}>
                        <Text style={styles.botonVolver}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    camera: {
        height: 400,
        width: 400,

    },
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
        shadowColor: '#black',
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
    }
});
export default Camara;
