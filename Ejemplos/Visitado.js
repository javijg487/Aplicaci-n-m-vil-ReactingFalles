import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DatosContext } from './Datos';
import LottieView from 'lottie-react-native';

const Visitado = ({ navigation }) => {
    const { FallaVisited, toggleVisited, loadData, loadData_Infantiles } = useContext(DatosContext);

    const [searchTerm, setSearchTerm] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const fallasVisitadas = FallaVisited();
    useEffect(() => {
        const loadDataAsync = async () => {
            await loadData();
            await loadData_Infantiles();
            setIsLoading(false);
        };

        loadDataAsync();
    }, []);

    const filteredData = fallasVisitadas.filter(item => {
        const propertiesToSearch = ["objectid", "id_falla", "nombre", "seccion", "fallera", "presidente", "artista", "lema", "tipo"];
        return propertiesToSearch.some(property => {
            const value = item[property];
            return value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
        });
    });
    if (isLoading) {

        return (
            <View style={ styles.loadingContainer}>
                <LottieView style={{
                    width: 100,
                    height: 100,
                }} source={require('../assets/loading.json')} autoPlay loop />
                <Text style={styles.loadingText}>Cargando datos de fallas...</Text>
            </View>
        );
    }
    const distanceData = filteredData.sort((a, b) => a.distancia - b.distancia);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Fallas Visitadas</Text>
            <View style={styles.searchContainer}>
                
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar..."
                    onChangeText={text => setSearchTerm(text)}

                    value={searchTerm}
                />
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        navigation.navigate('Camara', { screen: 'Camara' });
                    }}
                >
                    <Ionicons name="qr-code-outline" size={30} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        navigation.navigate('Filtros', { screen: 'Filtros' });
                    }}
                >
                    <Ionicons name="funnel" size={30} color="black" />
                </TouchableOpacity>


            </View>

            <ScrollView>


                {
                    distanceData.map((item) => {
                        return (
                            <TouchableOpacity key={item.objectid} onPress={() => toggleVisited(item)}>
                                <View style={styles.itemContainer}>

                                    <Image
                                        style={styles.itemImage}
                                        source={{ uri: item.boceto }}

                                    />
                                    <View>
                                        <Text style={styles.textItem}>{item.nombre}</Text>
                                        <Text>{item.tipo} - {item.seccion}</Text>
                                        <Text>Visitado: {item.visitado ? 'Si' : 'No'}</Text>
                                        <Text>Distancia: {item.distancia} Km</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        flex: 1,
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
        backgroundColor: '#D4D2D2',
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    loadingSymbol: {
        fontSize: 40,
        marginBottom: 10,
    },
    loadingText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        padding: 10,
    }
});

export default Visitado;
