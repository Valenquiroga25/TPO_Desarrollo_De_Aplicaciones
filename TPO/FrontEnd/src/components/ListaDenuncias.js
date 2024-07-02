import { React, useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { ipLocal } from '../global/ipLocal';

function ListaDenuncias({ navigation }) {
    const [listaDenuncias, setListaDenuncias] = useState([]);

    useEffect(() => {
        async function fetchDenuncias() {
          try {        
            const token = await AsyncStorage.getItem('token'); // Guardar el token en AsyncStorage como una cadena de texto
            const decodeToken = jwtDecode(token); // Decodificar el token usando jwtDecode
            
            const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/denuncias/allDenunciasFromVecino/${decodeToken.id}`, {
              method: 'GET',
              headers: 
              {'Content-Type' : 'application/json',
              "Authorization": `Bearer ${token}`},
            });
    
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Error en la respuesta del servidor: ${errorText}`);
            }
    
            const denuncias = await response.json();
            setListaDenuncias(denuncias);
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchDenuncias();
      }, []);
    

      function redireccion(denuncia) {
        console.log(denuncia)
          navigation.navigate('DetalleDenuncia', {
            idDenuncia:denuncia.idDenuncia,
            documento: denuncia.documentoVecino,
            calleSitio: denuncia.calleSitio,
            numeroSitio:denuncia.numeroSitio,
            descripcion: denuncia.descripcion,
            estado: denuncia.estado,
        });
      }

    return (
        <ScrollView style={styles.containerDenuncias}>
            {listaDenuncias.map((denuncia, indice) => (
                <TouchableOpacity key={indice} style={styles.botonDenuncia} onPress={() => redireccion(denuncia)}>
                    <Text style={{fontFamily:'GothamBook'}}>{denuncia.descripcion}</Text>
                    <Text style={{fontFamily:'GothamBook'}}>Estado: {denuncia.estado}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerDenuncias: {
        padding: 10,
    },
    botonDenuncia: {
        height: 70,
        backgroundColor: '#E6E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FFD600',
        borderRadius: 10,
        marginTop: 20,
    },
});

export default ListaDenuncias;
