import { React, useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { ipLocal } from '../global/ipLocal';

function ListaReclamosVecino({ navigation }) {
    const [listaReclamos, setListaReclamos] = useState([]);

    useEffect(() => {
        async function fetchReclamos() {
            try {
                const token = await AsyncStorage.getItem('token');
                const decodeToken = jwtDecode(token);

                const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/reclamos/allFromVecino/${decodeToken.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error en la respuesta del servidor: ${errorText} ${response.status}`);
                }
                const reclamos = await response.json();
                setListaReclamos(reclamos);

            } catch (error) {
                console.error(error);
            }
        }

        fetchReclamos();
    }, []);

    function redireccion(reclamo) {
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
        <ScrollView contentContainerStyle={styles.containerReclamos}>
            {listaReclamos.map((reclamo, indice) => (
                <TouchableOpacity key={indice} style={styles.botonReclamo} onPress={() => redireccion(reclamo)}>
                    <Text style={{ fontFamily: 'GothamBook' }}>{reclamo.desperfecto}</Text>
                    <Text style={{ fontFamily: 'GothamBook' }}>Estado: {reclamo.estado}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
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

export default ListaReclamosVecino;
