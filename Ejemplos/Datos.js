import { createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DatosContext = createContext();

export const DatosProvider = ({ children }) => {
    const [Fallas, setFallas] = useState([]);
    const [FallasInfantil, setFallasInfantil] = useState([]);
    const [combinedData, setCombinedData] = useState([]);  //Se inicializa con un array vacío
    const [Posicion, setPosicion] = useState(null);
    const [Distancia, setDistancia] = useState([]);
    const [loadVisitedFallasExecuted, setLoadVisitedFallasExecuted] = useState(true);

    useEffect(() => {
        obtenerPosicion();

    }, []);


    //Si Fallas o FallasInfantil cambian, se actualiza combinedData
    useEffect(() => {
        if(Fallas.length > 0 && FallasInfantil.length > 0){
            setCombinedData([...Fallas, ...FallasInfantil]);
            setLoadVisitedFallasExecuted(false);
        }
        
    }, [Fallas, FallasInfantil]);

    useEffect(() => {
        if(combinedData.length>0 && !loadVisitedFallasExecuted){
        loadVisitedFallas();
        setLoadVisitedFallasExecuted(true);
        }
    }, [combinedData, loadVisitedFallasExecuted]);

    useEffect(() => {
        if (Posicion) {
            calcularDistancia(Posicion); // Si tienes la posición, calcula la distancia
        }
        requestLocationPermission();
    }, [Posicion, combinedData]);

    const obtenerPosicion = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setPosicion(location);
    }
    const requestLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No hay permisos de localización')
            return;
        }
    };

    const saveVisited = async (objectid) => {
        try {
            const dataToStore = {
                objectid: objectid,
                visitado: true
            };
            console.log('objectid:', objectid);
            console.log('dataToStore:', dataToStore);

            await AsyncStorage.setItem(
                `Fallas_Visitadas_${objectid}`,
                JSON.stringify(dataToStore)

            );
        } catch (error) {
            console.log(error);
        }
    };



    const loadData = () => {
        fetch('https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-fallas/exports/json?lang=es&timezone=Europe%2FBerlin')
            .then((response) => response.json())
            .then((responseJson) => {
                const fallasConTipo = responseJson.map(falla => ({
                    ...falla,
                    tipo: "Mayor",

                    nombre: falla.nombre || "Nombre no disponible",
                    seccion: falla.seccion || "Sección no disponible",
                    fallera: falla.fallera || "Fallera no disponible",
                    presidente: falla.presidente || "Presidente no disponible",
                    artista: falla.artista || "Artista no disponible",
                    lema: falla.lema || "Lema no disponible",
                    boceto: falla.boceto || "https://st2.depositphotos.com/1967477/6346/v/450/depositphotos_63462971-stock-illustration-sad-smiley-emoticon-cartoon.jpg"


                }));
                console.log("FallasMayow");
                setFallas(fallasConTipo);
            });
    }


    const loadData_Infantiles = () => {
        fetch(('https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-infantils-fallas-infantiles/exports/json?lang=es&timezone=Europe%2FBerlin'))
            .then((response) => response.json())
            .then((responseJson) => {
                const fallasConTipo = responseJson.map(falla => ({
                    ...falla,
                    tipo: "Infantil",
                    nombre: falla.nombre || "Nombre no disponible",
                    seccion: falla.seccion || "Sección no disponible",
                    fallera: falla.fallera || "Fallera no disponible",
                    presidente: falla.presidente || "Presidente no disponible",
                    artista: falla.artista || "Artista no disponible",
                    lema: falla.lema || "Lema no disponible",
                    boceto: falla.boceto || "https://st2.depositphotos.com/1967477/6346/v/450/depositphotos_63462971-stock-illustration-sad-smiley-emoticon-cartoon.jpg"
                }));
                setFallasInfantil(fallasConTipo);
                console.log("FallasINFA");
            });
    }

    const loadVisitedFallas = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const visitedFallasKeys = keys.filter(key => key.startsWith('Fallas_Visitadas_'));
            const parsedData = await Promise.all(visitedFallasKeys.map(async key => {
                const value = await AsyncStorage.getItem(key);
                console.log('value:', value);
                return JSON.parse(value);
            }));

            const updatedVisitado = combinedData.map(item => {
                const index = parsedData.findIndex(parsedItem => parsedItem.objectid === item.objectid);
                if (index !== -1) {
                    return { ...item, visitado: true };
                }
                return item;
            });

            setCombinedData(updatedVisitado);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleVisited = (falla) => {
        const index = Distancia.findIndex(item => item.objectid === falla.objectid); //Sino encuentra el objeto, devuelve -1
        if (index !== -1) {
            const updatedData = [...Distancia];
            updatedData[index] = {
                ...updatedData[index],
                visitado: !updatedData[index].visitado
            };
            if (updatedData[index].visitado === true) {
                saveVisited(falla.objectid);
            } else if (updatedData[index].visitado === false) {
                AsyncStorage.removeItem(`Fallas_Visitadas_${falla.objectid}`);
            }
            setDistancia(updatedData); //setCombinedData(updatedData);
        }
    };

    const FallasVisited = () => {
        const visited = Distancia.filter(item => item.visitado === true);
        return visited;
    }

    const calcularDistancia = (location) => {
        if (location && location.coords) {
            const nuevasDistancias = combinedData.map(item => {
                const distancia = geolib.getDistance(
                    { latitude: location.coords.latitude, longitude: location.coords.longitude },
                    { latitude: item.geo_point_2d.lat, longitude: item.geo_point_2d.lon }
                );
                return { ...item, distancia: distancia / 1000 };
            });
            setDistancia(nuevasDistancias);
        }
    }

    return (
        <DatosContext.Provider value={{ combinedData, Fallas, FallasInfantil, toggleVisited, loadData, loadData_Infantiles, setFallas, setFallasInfantil, Distancia, FallasVisited, loadVisitedFallas }}>
            {children}
        </DatosContext.Provider>
    );

};
