import React, { useState, useEffect } from 'react';
import {FlatList, Text, View} from 'react-native';

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
                console.log("mensaje consola"+ responseJson.features);
                setFallas(responseJson);
            }
            )
    }
    

    const loadData_Infantiles = () => {
        fetch(('https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-infantils-fallas-infantiles/exports/json?lang=es&timezone=Europe%2FBerlin'))
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Falla Infantil"+ responseJson);
                setFallasInfantil(responseJson);
            }
            )
    }
    const combinedData = [...Fallas, ...FallasInfantil];

    const FallasItem = ({ item }) => (
        <View>
            <Text numberOfLines={1} ellipsizeMode='tail'>
            {item.nombre} - {item.objectid}
            
            </Text>
            <Text>------------------</Text>
        </View>
    );
    

    return (
        <View>
        <FlatList
            data={combinedData}
            renderItem={FallasItem}
            keyExtractor={item =>  item.objectid}

        />
        
        
        
        </View>

        
        
        
    );
};

export default Lista_Fallas;
