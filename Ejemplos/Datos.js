import {createContext, useState, useEffect } from 'react';

export const DatosContext = createContext();

export const DatosProvider = ({children}) => {    
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
                    tipo: "Infantil" 
                }));

                console.log("Falla Infantil" + responseJson);
                setFallasInfantil(fallasConTipo);
            });
    }    
    
    const combinedData = [...Fallas, ...FallasInfantil];

    return (
        <DatosContext.Provider value={{combinedData, Fallas, FallasInfantil, loadData, loadData_Infantiles, setFallas, setFallasInfantil}}>
            {children}
        </DatosContext.Provider>
        );
};
