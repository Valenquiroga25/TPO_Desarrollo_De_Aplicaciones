import { React, useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { ipLocal } from '../global/ipLocal';


function ListaReclamosPersonal({ navigation }) {
    const [listaReclamosPersonal, setListaReclamosPersonal] = useState([]);
    const [listaReclamosPersonalVecinos, setListaReclamosPersonalVecinos] = useState([]);

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
    

    function redireccionPersonal(reclamo) {
        navigation.navigate('DetalleReclamoPersonal', {
            idReclamo: reclamo.idReclamo,
            legajo: reclamo.legajoPersonal,
            calleSitio: reclamo.calleSitio,
            numeroSitio: reclamo.numeroSitio,
            estado: reclamo.estado,
            desperfecto: reclamo.desperfecto,
            descripcion: reclamo.descripcion,
        });
    }
        
    function redireccionVecino(reclamo) {
        navigation.navigate('DetalleReclamoVecino', {
            idReclamo: reclamo.idReclamo,
            documento: reclamo.documentoVecino,
            calleSitio: reclamo.calleSitio,
            numeroSitio: reclamo.numeroSitio,
            estado: reclamo.estado,
            desperfecto: reclamo.desperfecto,
            descripcion: reclamo.descripcion,
        });
    }
    


    return (
        <View>
        <ScrollView style={styles.containerReclamos}>
            {listaReclamosPersonal.map((reclamo, indice) => (
                <TouchableOpacity key={indice} style={styles.botonReclamo} onPress={() => redireccionPersonal(reclamo)}>
                    <Text>{reclamo.descripcion}</Text>
                    <Text>Estado: {reclamo.estado}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
        <ScrollView style={styles.containerReclamos}>
            {listaReclamosPersonalVecinos.map((reclamo, indice) => (
                <TouchableOpacity key={indice} style={styles.botonReclamo} onPress={() => redireccionVecino(reclamo)}>
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