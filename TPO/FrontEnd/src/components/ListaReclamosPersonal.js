import { React, useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { ipLocal } from '../global/ipLocal';


function ListaReclamosPersonal({ navigation }) {
    const [listaReclamosPersonal, setListaReclamosPersonal] = useState([]);

    useEffect(() => {
        async function fetchReclamosPersonal() {
          try {        
            const token = await AsyncStorage.getItem('token'); 
            const decodeToken = jwtDecode(token); 

            const responsePersonal = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/reclamos/allFromPersonal/${decodeToken.id}`, {
                method: 'GET',
                headers: 
                {'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`},
            });
            
    
            if (!responsePersonal.ok) {
                const errorTextPersonal = await responsePersonal.text();
                throw new Error(`Error en la respuesta del servidor: Personal: ${errorTextPersonal}`);
            }
    
            const reclamosPersonal = await responsePersonal.json();
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
        
    return (
        <View>
            <ScrollView style={styles.containerReclamos}>
                {listaReclamosPersonal.map((reclamo, indice) => (
                    <TouchableOpacity key={indice} style={styles.botonReclamo} onPress={() => redireccionPersonal(reclamo)}>
                        <Text style={{fontFamily:'GothamBook'}}>{reclamo.descripcion}</Text>
                        <Text style={{fontFamily:'GothamBook'}}>Estado: {reclamo.estado}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    containerReclamos: {
        paddingBottom: 80, // Ajusta este valor según la altura de tu navbar
    },
    botonReclamo: {
        height: 70,
        backgroundColor: '#E6E6E6',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#FFD600",
        borderRadius: 10,
        marginTop: 10,
    }
});

export default ListaReclamosPersonal;