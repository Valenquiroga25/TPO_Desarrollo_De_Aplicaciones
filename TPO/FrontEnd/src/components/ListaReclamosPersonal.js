import { React, useState, useEffect } from 'react';
<<<<<<< HEAD
import { Text, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
=======
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
>>>>>>> cd024971e234a02d5c7a55f831ae33ceee09735c
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { ipLocal } from '../global/ipLocal';

<<<<<<< HEAD

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
            
=======
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
>>>>>>> cd024971e234a02d5c7a55f831ae33ceee09735c
          } catch (error) {
            console.error(error);
          }
        }
    
<<<<<<< HEAD
        fetchReclamosPersonal();
=======
        fetchReclamos();
>>>>>>> cd024971e234a02d5c7a55f831ae33ceee09735c
      }, []);
    
    

      function redireccion(reclamo) {
<<<<<<< HEAD
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
=======
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
>>>>>>> cd024971e234a02d5c7a55f831ae33ceee09735c
                <TouchableOpacity key={indice} style={styles.botonReclamo} onPress={() => redireccion(reclamo)}>
                    <Text>{reclamo.descripcion}</Text>
                    <Text>Estado: {reclamo.estado}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
<<<<<<< HEAD
        <ScrollView style={styles.containerReclamos}>
            {ListaReclamosPersonalVecinos.map((reclamo, indice) => (
                <TouchableOpacity key={indice} style={styles.botonReclamo} onPress={() => redireccion(reclamo)}>
                    <Text>{reclamo.descripcion}</Text>
                    <Text>Estado: {reclamo.estado}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
=======
>>>>>>> cd024971e234a02d5c7a55f831ae33ceee09735c
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
<<<<<<< HEAD
=======


>>>>>>> cd024971e234a02d5c7a55f831ae33ceee09735c
