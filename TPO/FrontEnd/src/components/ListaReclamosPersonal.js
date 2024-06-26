import { React, useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { ipLocal } from '../global/ipLocal';

function ListaReclamosPersonal({ navigation }) {
    const [listaReclamos, setListaReclamos] = useState([]);

    useEffect(() => {
        async function fetchReclamos() {
          try {        
            const token = await AsyncStorage.getItem('token'); 
            const decodeToken = jwtDecode(token); 
            
            const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/reclamos/allFromPersonal/${decodeToken.id}`, {
              method: 'GET',
              headers: 
              {'Content-Type' : 'application/json',
              "Authorization": `Bearer ${token}`},
            });
    
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Error en la respuesta del servidor: ${errorText}`);
            }
            
            const reclamos = await response.json();
            console.log(reclamos)
            setListaReclamos(reclamos);
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchReclamos();
      }, []);
    
    

      function redireccion(reclamo) {
        navigation.navigate('DetalleReclamoPersonal', {
            idReclamo:reclamo.idReclamo,
            documento: reclamo.legajoPersonal,
            calleSitio: reclamo.calleSitio,
            numeroSitio: reclamo.numeroSitio,
            estado: reclamo.estado,
            desperfecto: reclamo.desperfecto,
            descripcion: reclamo.descripcion,
        });
      }

    return (
        <ScrollView style={styles.containerReclamos}>
            {listaReclamos.map((reclamo, indice) => (
                <TouchableOpacity key={indice} style={styles.botonReclamo} onPress={() => redireccion(reclamo)}>
                    <Text>{reclamo.descripcion}</Text>
                    <Text>Estado: {reclamo.estado}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerReclamos: {
        padding: 10,
    },
    botonReclamo: {
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

export default ListaReclamosPersonal;


