import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DatosContext } from './Datos';
import LottieView from 'lottie-react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from '@react-native-picker/picker';

const windowHeight = Dimensions.get('window').height;
console.log(windowHeight)
const Lista_Fallas = ({ navigation }) => {
    const { Distancia, toggleVisited, fallasCompletas} = useContext(DatosContext);

    const [checkBoxInfantil, setCheckBoxInfantil] = useState(false);
    const [checkBoxMayor, setCheckBoxMayor] = useState(false);
    const [checkBoxVisitado, setCheckBoxVisitado] = useState(false);
    const [ShowFilter, setShowFilter] = useState(false);
    const [fixList, setFixList] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    // Se usa para usarlo en el Picker de los filtros en Lista_Fallas
    const secciones = new Set();
    const listaSecciones = [];

    useEffect(() => {
        const loadDataAsync = async () => {
            await fallasCompletas();
            setIsLoading(false);
        };

        loadDataAsync();
    }, []);

    const loadMoreData = async () => {
        setPage(page + 1);
    };


    //Se almacenan las secciones unicas
    Distancia.forEach(falla => {
        if (!secciones.has(falla.seccion)) {
            if (falla.seccion != "Sección no disponible") {
                secciones.add(falla.seccion);
                listaSecciones.push(falla.seccion);
            }
        }
    });

    console.log(listaSecciones[0]);

    const filteredData = Distancia.filter(item => {
        const propertiesToSearch = ["objectid", "id_falla", "nombre", "seccion", "fallera", "presidente", "artista", "lema", "tipo"];
        return propertiesToSearch.some(property => {
            const value = item[property];
            return value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    const sortedData = filteredData.sort((a, b) => a.distancia - b.distancia);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <LottieView style={{
                    width: 100,
                    height: 100,
                }} source={require('../assets/loading.json')} autoPlay loop />
                <Text style={styles.loadingText}>Cargando datos de fallas...</Text>
            </View>
        );
    }

    
   const fallas_Distancia = fallasCompletas();
    const filteredData = fallas_Distancia.filter(item => {
        const propertiesToSearch = ["objectid", "id_falla", "nombre", "seccion", "fallera", "presidente", "artista", "lema", "tipo"];
        return propertiesToSearch.some(property => {
            const value = item[property];
            return value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    const sortedData = filteredData.sort((a, b) => a.distancia - b.distancia);

    

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('MainTabNavigator', { screen: 'Usuario' })}>
            <View style={styles.itemContainer}>

                <Image style={styles.itemImage} source={{ uri: item.boceto }} />

                <View>
                    <Text style={styles.textItem}>{item.nombre}</Text>
                    <Text>{item.tipo} - {item.seccion}</Text>
                    <Text>Distancia: {item.distancia} Km</Text>
                </View>
                <TouchableOpacity style={styles.flagButton} onPress={() => toggleVisited(item)}>
                    <Ionicons name="star" color={item.visitado ? '#FF8C00' : 'gray'} size={50} />
                    {/* <Ionicons name="flag" color={item.visitado ? '#FF8C00' : 'gray'} size={50} /> */}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Lista de Fallas</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar..."
                    onChangeText={text => setSearchTerm(text)}
                    value={searchTerm}
                />
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Camara', { screen: 'Camara' }); }}>
                    <Ionicons name="qr-code-outline" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setShowFilter(!ShowFilter);
                    setFixList(!fixList)
                }}>
                    <Ionicons name="funnel" size={30} color="black" />
                </TouchableOpacity>
            </View>

            {ShowFilter ? (
                <View style={[styles.openFilter, styles.shadowBox]}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 30, marginLeft: -5 }}> Filtro de búsqueda</Text>
                    <BouncyCheckbox
                        style={{ marginTop: 16 }}
                        textStyle={{ textDecorationLine: 'none', color: checkBoxInfantil ? "#1E1E1E" : "#747474" }}
                        innerIconStyle={{ borderRadius: 5, }}
                        iconStyle={{ borderRadius: 5, }}
                        fillColor='#5470FF'
                        isChecked={checkBoxInfantil}
                        text="Falla Infantil"
                        disableBuiltInState
                        onPress={() => setCheckBoxInfantil(!checkBoxInfantil)}
                    />
                    <BouncyCheckbox
                        style={{ marginTop: 16 }}
                        textStyle={{ textDecorationLine: 'none', color: checkBoxMayor ? "#1E1E1E" : "#747474" }}
                        innerIconStyle={{ borderRadius: 5, }}
                        iconStyle={{ borderRadius: 5, }}
                        fillColor='#5470FF'
                        isChecked={checkBoxMayor}
                        text="Falla Mayor"
                        disableBuiltInState
                        onPress={() => setCheckBoxMayor(!checkBoxMayor)}
                    />
                    <BouncyCheckbox
                        style={{ marginTop: 16 }}
                        textStyle={{ textDecorationLine: 'none', color: checkBoxVisitado ? "#1E1E1E" : "#747474" }}
                        innerIconStyle={{ borderRadius: 5, }}
                        iconStyle={{ borderRadius: 5, }}
                        fillColor='#5470FF'
                        isChecked={checkBoxVisitado}
                        text="No Visitado"
                        disableBuiltInState
                        onPress={() => setCheckBoxVisitado(!checkBoxVisitado)}
                    />

                    <View style={{ flexDirection: 'row', marginTop: 40, }}>
                        <Text style={{ marginBottom: 2, marginRight: 20, fontSize: 15 }}>Seccion</Text>

                        <TouchableOpacity style={[styles.buttonFilter, styles.shadowBoxFilter]}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Todas</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ marginVertical: 30, flexDirection: 'row' }}>
                        <Text style={{ marginRight: 20, fontSize: 15 }}>Ordenar</Text>
                        <TouchableOpacity style={[styles.buttonFilter, styles.shadowBoxFilter]}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, }}>Cercania</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            opacity: 0.2,
                            width: '100%',
                            marginBottom: 20
                        }}
                    />
                    <View style={[styles.buttonSectionFilter, styles.shadowBoxFilter]}>
                        <TouchableOpacity style={styles.buttonFilter} onPress={() => {
                            setCheckBoxInfantil(false);
                            setCheckBoxMayor(false);
                            setCheckBoxVisitado(false);
                            setShowFilter(false);
                            setFixList(!fixList)
                        }}>
                            <Text style={styles.buttonFilterText}>Cancelar</Text>
                        </TouchableOpacity >

                        <TouchableOpacity style={styles.buttonFilter}>
                            <Text style={styles.buttonFilterText}>Aplicar</Text>
                        </TouchableOpacity>
                    </View>



                </View>
            ) : null}

            {fixList ? (
                <View style={styles.fixList}>
                    <FlatList
                        data={sortedData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.objectid.toString()}
                        onEndReached={loadMoreData} // Detectar cuando el usuario llega al final de la lista
                        onEndReachedThreshold={0.1} // Porcentaje de la longitud de la lista en el que se llama a onEndReached
                        ListFooterComponent={isLoading && <ActivityIndicator
                        />} // Indicador de carga al final de la lista
                    />
                </View>) : (
                <View >
                    <FlatList
                        data={sortedData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.objectid.toString()}
                        onEndReached={loadMoreData} // Detectar cuando el usuario llega al final de la lista
                        onEndReachedThreshold={0.1} // Porcentaje de la longitud de la lista en el que se llama a onEndReached
                        ListFooterComponent={isLoading && <ActivityIndicator
                        />} // Indicador de carga al final de la lista
                    />
                </View>)}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "white",
        zIndex: 2,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        zIndex: 2,
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
        position: 'relative',
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
    },
    openFilter: {
        width: '80%',
        height: '60%',
        zIndex: 3,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: 20

    },
    fixList: {
        flex: 1,
        zIndex: 1,
        marginTop: windowHeight * -.491,
        backgroundColor: "white"
    },
    shadowBox: {
        shadowColor: '#1E1E1E',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    shadowBoxFilter: {
        shadowColor: '#1E1E1E',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
    },
    buttonSectionFilter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 'auto',
        marginBottom: 20
    },
    buttonFilter: {
        backgroundColor: '#D9D9D9',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    buttonFilterText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FF8C00',
        fontSize: 15
    },

    flagButton: {
        position: 'absolute',
        top: 35,
        right: 20,

    },



});

export default Lista_Fallas;
