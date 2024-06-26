import { React, useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { ipLocal } from '../global/ipLocal';


function ListaReclamosPersonal({ navigation }) {
    const [listaReclamosPersonal, setListaReclamosPersonal] = useState([]);
    const [ListaReclamosPersonalVecinos, setListaReclamosPersonalVecinos] = useState([]);

    useEffect(() => {
        async function fetchReclamosPersonal() {
          try {        
            const token = await AsyncStorage.getItem('token'); 
            const decodeToken = jwtDecode(token); 


            const responseVecino = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/reclamos/allFromVecinos`, {
                method: 'GET',
                headers: 
                {'Content-Type' : 'application/json',
                "Authorization": `Bearer ${token}`},
            });

            const responsePersonal = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/reclamos/allFromPersonal/${decodeToken.id}`, {
                method: 'GET',
                headers: 
                {'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`},
            });
            
    
            if (!responseVecino.ok || !responsePersonal.ok) {
                const errorTextVecino = await responseVecino.text();
                const errorTextPersonal = await responsePersonal.text();
                throw new Error(`Error en la respuesta del servidor: Vecino: ${errorTextVecino}, Personal: ${errorTextPersonal}`);
            }
    
            const reclamosVecino = await responseVecino.json();
            const reclamosPersonal = await responsePersonal.json();
            setListaReclamosPersonalVecinos(reclamosVecino);
            setListaReclamosPersonal(reclamosPersonal)
            
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchReclamosPersonal();
      }, []);
    
    

      function redireccion(reclamo) {
        navigation.navigate('DetalleReclamo', {
            sitio: reclamo.sitio,
            documento: reclamo.vecino ? reclamo.vecino.documento : reclamo.personal.legajo,
            desperfecto: reclamo.desperfecto,
            descripcion: reclamo.descripcion,
        });
    }

    return (
        <View>
        <ScrollView style={styles.containerReclamos}>
            {listaReclamosPersonal.map((reclamo, indice) => (
                <TouchableOpacity key={indice} style={styles.botonReclamo} onPress={() => redireccion(reclamo)}>
                    <Text>{reclamo.descripcion}</Text>
                    <Text>Estado: {reclamo.estado}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
        <ScrollView style={styles.containerReclamos}>
            {ListaReclamosPersonalVecinos.map((reclamo, indice) => (
                <TouchableOpacity key={indice} style={styles.botonReclamo} onPress={() => redireccion(reclamo)}>
                    <Text>{reclamo.descripcion}</Text>
                    <Text>Estado: {reclamo.estado}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
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
