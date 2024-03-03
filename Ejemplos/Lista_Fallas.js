import { useState, useEffect } from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import Datos from './Datos';

const Lista_Fallas = () => {
    const combinedData = Datos();
    //Falta buscador y filtro y Qr
    const FallasItem = ({ item, index }) => {
        const estilo = index % 2 === 0 ? styles.par : styles.impar;
        return (
            <View style={estilo}>
                <Text numberOfLines={4} ellipsizeMode='tail'>
                    Nombre: {item.nombre}{'\n'}
                    Id: {item.objectid}{'\n'}
                    Sección: {item.seccion}{'\n'}  
                    Tipo: {item.tipo}       
                </Text>
            </View>
        );
    };
    

    return (
        <View >
            <FlatList
                data={combinedData}
                renderItem={FallasItem}
                keyExtractor={item =>  item.objectid}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    par:{
        width: '100%',
        backgroundColor: '#EFEFEF',
        padding: 10,
       
    },
    impar:{
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
    },
});



export default Lista_Fallas;
