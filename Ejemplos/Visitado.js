import { useContext, useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity,Image } from 'react-native';
import { DatosContext } from './Datos';
import { ScrollView } from 'react-native-gesture-handler';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

const FallasItem = ({ item, index }) => {
    const estilo = index % 2 === 0 ? styles.par : styles.impar;
    const { toggleVisited } = useContext(DatosContext);
    return (
        <TouchableOpacity style={estilo} onPress={() => toggleVisited(item)}>
            <Text numberOfLines={8} ellipsizeMode='tail'>
                Nombre: {item.nombre}{'\n'}
                Id: {item.objectid}{'\n'}
                Sección: {item.seccion}{'\n'}
                Tipo: {item.tipo}{'\n'}
                Visitado: {!item.visitado ? 'Si' : 'No'}
            </Text>

        </TouchableOpacity>
    );
};

const Visitado = ({ navigation }) => {
    const { combinedData } = useContext(DatosContext);
    //Falta buscador y filtro y Qr
    return (
        <ScrollView >
            <Text style={styles.title}>Lista de Fallas Visitadas</Text>
            {
                combinedData.map((item, index) => {
                    return (
                        <View key={index} style={styles.itemContainer}>
                            <Image
                                source={{ uri: item.boceto }}
                                style={styles.itemImage}
                            />

                            <View>
                                    <Text style={styles.textItem}> {item.nombre}</Text>
                                    <Text>Id: {item.objectid}</Text>
                                    <Text>Sección: {item.seccion}</Text>
                                    <Text>Tipo: {item.tipo}</Text>
                                    <Text>Visitado: {!item.visitado ? 'Si' : 'No'}</Text>
                            </View>
                        </View>
                    )
                })
            }
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    par: {
        width: '100%',
        backgroundColor: '#EFEFEF',
        padding: 10,

    },
    impar: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        margin: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: '#EFEFEF',
        borderRadius: 10,
    },
    itemImage:{
        width :50,
        height: 75,
        marginRight:15,
        borderRadius: 8,
    },
    textItem:{
        fontSize: 16,
        fontWeight: 'bold',
       
    }
});



export default Visitado;
