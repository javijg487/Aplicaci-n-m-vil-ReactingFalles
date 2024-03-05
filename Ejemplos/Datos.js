import {createContext, useState, useEffect } from 'react';

export const DatosContext = createContext();

export const DatosProvider = ({children}) => {    
    const [Fallas, setFallas] = useState([]);
    const [FallasInfantil, setFallasInfantil] = useState([]);
    const [combinedData, setCombinedData] = useState([...Fallas, ...FallasInfantil]); 

    useEffect(() => {
        loadData();
        loadData_Infantiles();
        setCombinedData([...Fallas, ...FallasInfantil]);
    }, []);

    const loadData = () => {
        fetch('https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-fallas/exports/json?lang=es&timezone=Europe%2FBerlin')
            .then((response) => response.json())
            .then((responseJson) => {
                const fallasConTipo = responseJson.map(falla => ({
                    ...falla,
                    tipo: "Mayor" ,
                    visitado: false
                }));

                console.log("Falla Mayor" + responseJson);
                
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
                    visitado: false
                }));

                console.log("Falla Infantil" + responseJson);
                setFallasInfantil(fallasConTipo);
            });
    }    
    
    const toggleVisited = (falla) => {
        console.log(falla);
        setCombinedData(combinedData.map(item => {
            if(item.objectid == falla.objectid){
                falla.visitado ? falla.visitado = false : falla.visitado = true;
                
                return {...item}
            }
            
            return item;
        }));
    }

    

    return (
        <DatosContext.Provider value={{combinedData, Fallas, FallasInfantil, toggleVisited, loadData, loadData_Infantiles, setFallas, setFallasInfantil}}>
            {children}
        </DatosContext.Provider>
        );
};
