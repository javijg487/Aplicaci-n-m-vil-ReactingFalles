import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { DatosContext } from './Datos';

const Visitado = ({ navigation }) => {
    const { combinedData, toggleVisited } = useContext(DatosContext);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = combinedData.filter(item => {
        const propertiesToSearch = ["objectid", "id_falla", "nombre", "seccion", "fallera", "presidente", "artista", "lema", "tipo"];
        return propertiesToSearch.some(property => {
            const value = item[property];
            return value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    return (
        <ScrollView>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar..."
                    onChangeText={text => setSearchTerm(text)}
                    value={searchTerm}
                />
            </View>


            <Text style={styles.title}>Lista de Fallas Visitadas</Text>
            {
                filteredData.map((item, index) => {
                    return (
                        <TouchableOpacity onPress={() => toggleVisited(item)}>
                            <View key={index} style={styles.itemContainer}>

                                <Image
                                    source={{ uri: item.boceto }}
                                    style={styles.itemImage}
                                />
                                <View>
                                    <Text style={styles.textItem}> {item.nombre}</Text>
                                    <Text>{item.seccion}</Text>
                                    <Text>Tipo: {item.tipo}</Text>
                                    <Text>Visitado: {!item.visitado ? 'Si' : 'No'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
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
    itemImage: {
        width: 50,
        height: 75,
        marginRight: 15,
        borderRadius: 8,
    },
    textItem: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    touchable: {

        flex: 1,
    }
});

export default Visitado;
