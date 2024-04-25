import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Modal, Text, View, Share, TouchableOpacity, FlatList, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DatosContext } from './Datos';
import LottieView from 'lottie-react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ModalDropdown from 'react-native-modal-dropdown';
import { LinearGradient } from 'expo-linear-gradient';

const Visitado = ({ navigation }) => {
    const { FallasVisited, toggleVisited, Secciones } = useContext(DatosContext);
    const [checkBoxInfantil, setCheckBoxInfantil] = useState(true);
    const [checkBoxMayor, setCheckBoxMayor] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [order, setOrder] = useState('Cercanía'); // false para distancia distance, true para revertir distancia distance
    const [section, setSection] = useState('Todas');
    const [sortedData, setSortedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalFallaVisible, setmodalFallaVisible] = useState(false);
    const Fallas_Visitadas = FallasVisited();
    const [fallaDetalle, setfallaDetalle] = useState({});

    useEffect(() => {
        const loadDataAsync = async () => {
            
            await FallasVisited();
            setIsLoading(false);
        };

        loadDataAsync();
    }, []);

    const updateFallas = () => {
        let updatedFallas = [];
        if ((!checkBoxInfantil && !checkBoxMayor) || (checkBoxInfantil && checkBoxMayor)) {
            updatedFallas = Fallas_Visitadas;   
        } else if (checkBoxInfantil && !checkBoxMayor) {
            updatedFallas = Fallas_Visitadas.filter(falla => falla.tipo === "Infantil");
        } else if (!checkBoxInfantil && checkBoxMayor) {
            updatedFallas = Fallas_Visitadas.filter(falla => falla.tipo === "Mayor");
        } else {
            updatedFallas = Fallas_Visitadas;
        }

        if(section != "Todas"){
            updatedFallas = updatedFallas.filter(falla => falla.seccion === section)
        }

        const filteredData = updatedFallas.filter(item => {
            const propertiesToSearch = ["objectid", "id_falla", "nombre", "seccion", "fallera", "presidente", "artista", "lema", "tipo"];
            return propertiesToSearch.some(property => {
                const value = item[property];
                return value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
            });
        });

        if (order === "Cercanía") {
            setSortedData([...filteredData].sort((a, b) => a.distancia - b.distancia));
        } else if(order === "Lejanía") {
            setSortedData([...filteredData].sort((a, b) => b.distancia - a.distancia));
        }else{
            setSortedData([...filteredData].sort((a, b) => a.nombre.localeCompare(b.nombre)));
        }

    };

    useEffect(() => {
        updateFallas();
    }, [checkBoxInfantil, checkBoxMayor, searchTerm, order, toggleVisited, section])
    
    const onShare = async () => {
        try
         {
             const result = await Share.share({
                 message: ("¿Has visto esta Falla? Te la recomiendo!" + "\n" + "Se llama " + "*"+fallaDetalle.nombre+"*" + "\n" + "Y aquí puede ver su boceto!" + "\n" + fallaDetalle.boceto)
             });
 
             if (result.action === Share.sharedAction){
                 if(result.activityType){
                     console.log("Compartida con tipo: ", result.activityType);
                 }else{
                     console.log("Compartido");
                 }
             }
             else if(result.action === Share.dismissedAction){
                 console.log("No compartido")
             }
         }catch(error){
             console.log(error.message);
         }
     }
    
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

    //const distanceData = filteredData.sort((a, b) => a.distancia - b.distancia);
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

                <TouchableOpacity style={styles.button} onPress={() => {
                    setModalVisible(!modalVisible)
                }}>
                    <Ionicons name="funnel" size={30} color="black" />
                </TouchableOpacity>


            </View>

            <ScrollView>
                {
                    sortedData.map((item) => {
                        return (
                            <TouchableOpacity key={item.objectid} onPress={() => {
                                setmodalFallaVisible(!modalFallaVisible);
                                setfallaDetalle(item)}}>
                                <View>
                                    <LinearGradient 
                                    colors={['#FBAB7E', '#F7CE68']}
                                    start={{ x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    style={styles.itemContainer}>
                                        <Image
                                            style={styles.itemImage}
                                            source={{ uri: item.boceto }}

                                        />
                                        <View>
                                            <Text style={styles.textItem}>{item.nombre}</Text>
                                            <Text>{item.tipo} - {item.seccion}</Text>
                                            <Text>Distancia: {item.distancia} Km</Text>
                                            <Text>Visitado: {item.visitadoFecha}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.flagButton} onPress={() => toggleVisited(item)}>
                                            <Ionicons name="star" color={item.visitado ? '#FF8C00' : 'gray'} size={50} />
                                            
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
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

                    <View style={{ flexDirection: 'row', marginTop: 40, }}>
                        <Text style={{ marginBottom: 2, marginRight: 20, fontSize: 15 }}>Sección</Text>
                        <ModalDropdown style={[styles.buttonFilter, styles.shadowBoxFilter]} 
                        options={["Todas", ...Secciones]}
                        defaultIndex={0}
                        defaultValue= {section}
                        textStyle={{fontWeight: 'bold', fontSize: 15}}
                        dropdownStyle={{padding: 10, height: 220}}
                        dropdownTextStyle={{fontSize: 15, color:'black'}}
                        dropdownTextHighlightStyle={{color:'#FF8C00'}}
                        onSelect={(_, value) => setSection(value)}/>
                    </View>


                    <View style={{ marginVertical: 30, flexDirection: 'row' }}>
                        <Text style={{ marginRight: 20, fontSize: 15 }}>Ordenar</Text>
                        <ModalDropdown style={[styles.buttonFilter, styles.shadowBoxFilter]} 
                        options={["Cercanía", "Lejanía", "A-Z"]}
                        defaultIndex={0}
                        defaultValue='Cercanía'
                        textStyle={{fontWeight: 'bold', fontSize: 15}}
                        dropdownStyle={{padding: 10, height: 100}}
                        dropdownTextStyle={{fontSize: 15, color:'black'}}
                        dropdownTextHighlightStyle={{color:'#FF8C00'}}
                        onSelect={(_, value) => setOrder(value)}/>
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
                            setModalVisible(!modalVisible);

                        }}>
                            <Text style={styles.buttonFilterText}>Cancelar</Text>
                        </TouchableOpacity >

                        <TouchableOpacity style={styles.buttonFilter} onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                            <Text style={styles.buttonFilterText} >Aplicar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
                        <TouchableOpacity style={styles.botonesDetalles} onPress={onShare}>
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
                    <TouchableOpacity style={styles.buttonDetalles} onPress={() => setmodalFallaVisible(!modalFallaVisible)}>
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
        backgroundColor: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "white",
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
    },
    flagButton: {
        position: 'absolute',
        top: 35,
        right: 20,

    },
    openFilter: {
        width: '80%',
        height: '60%',
        zIndex: 3,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
        marginTop: '30%'

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
    shadowBoxDetalle: {
        shadowColor: '#1E1E1E',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    buttonSectionFilter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 'auto',
        marginBottom: 20
    },
    buttonFilter: {
        backgroundColor: '#D9D9D9',
        width: 90,
        height: 30,
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

    modalStyle: {
        marginTop: 20
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
    image_style: {
        width: 300,
        height: 300,
        borderRadius: 300 / 2,
        alignSelf: "center",
        marginTop: "-40%",
        overflow: "hidden",
        borderWidth: 5,
        borderColor: "white",
        backgroundColor:"lightgray"
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

export default Visitado;
