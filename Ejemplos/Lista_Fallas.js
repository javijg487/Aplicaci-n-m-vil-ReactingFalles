import React, { useState, useEffect } from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';


const Lista_Fallas = () => {
    const [Fallas, setFallas] = useState([]);
    const [FallasInfantil, setFallasInfantil] = useState([]);
    useEffect(() => {
        loadData();
        loadData_Infantiles();
    }, []);

    const loadData = () => {
        fetch('https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-fallas/exports/json?lang=es&timezone=Europe%2FBerlin')
            .then((response) => response.json())
            .then((responseJson) => {

                const fallasConTipo = responseJson.map(falla => ({
                    ...falla,
                    tipo: "Mayor" 
                }));

                console.log("Falla Mayor"+ responseJson);
                
                setFallas(fallasConTipo);
            }
            )
    }
    

    const loadData_Infantiles = () => {
        fetch(('https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-infantils-fallas-infantiles/exports/json?lang=es&timezone=Europe%2FBerlin'))
            .then((response) => response.json())
            .then((responseJson) => {
                const fallasConTipo = responseJson.map(falla => ({
                    ...falla,
                    tipo: "Infantil" 
                }));

                console.log("Falla Infantil"+ responseJson);
                setFallasInfantil(fallasConTipo);
            }
            )
    }
    const combinedData = [...Fallas, ...FallasInfantil];
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
