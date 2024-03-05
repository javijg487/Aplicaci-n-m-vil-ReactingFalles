import { useContext, useState, useEffect } from 'react';
import {StyleSheet, FlatList, Text, View, TouchableOpacity} from 'react-native';
import {DatosContext} from './Datos';

const FallasItem = ({ item, index }) => {
    
    const estilo = index % 2 === 0 ? styles.par : styles.impar;
    const {toggleVisited} = useContext(DatosContext);
    return (
        <TouchableOpacity style={estilo} onPress={() => toggleVisited(item)}>
            <Text numberOfLines={5} ellipsizeMode='tail'>
                Nombre: {item.nombre}{'\n'}
                Id: {item.objectid}{'\n'}
                Sección: {item.seccion}{'\n'}  
                Tipo: {item.tipo}{'\n'}         
                Visitado: {item.visitado ? 'Si' : 'No'}
            </Text>
            
        </TouchableOpacity>
    );
};

const Lista_Fallas = ({ navigation }) => {
    const {combinedData} = useContext(DatosContext);
    //Falta buscador y filtro y Qr
    return (
        <View >
            
            <TouchableOpacity 
            onPress={() => navigation.navigate('Camara')} >
                <Text>Camara</Text>
            </TouchableOpacity>
            <FlatList
                data={combinedData}
                renderItem={(item) => <FallasItem item = {item}/>}
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
