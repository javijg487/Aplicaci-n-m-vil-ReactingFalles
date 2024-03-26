import React, { useContext, useEffect, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera/next';

import { View, TouchableOpacity, Alert, StyleSheet, Text } from 'react-native';


const Camara = () => {
    const [status, requestPermission] = useCameraPermissions();
    const [alerta, setAlerta] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [flash, setFlash] = useState('off');
    const [data, setData] = useState('');

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

    }
});
export default Camara;
