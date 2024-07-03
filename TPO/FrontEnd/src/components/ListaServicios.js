import { React, useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ipLocal } from '../global/ipLocal';

function ListaServicios({ navigation }) {
    const [listaServicios, setListaServicios] = useState([]);

    useEffect(() => {
        async function showServicios() {
            try {
                const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/servicios/getAllServicios`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(await response.text());
                }

                const servicios = await response.json();
                setListaServicios(servicios);
            } catch (error) {
                console.error(error);
            }
        }

        showServicios();
    }, []);

    function redireccion(servicio) {
        navigation.navigate('DetalleServicio', {
            idServicio: servicio.idServicio,
            titulo: servicio.titulo,
            direccion: servicio.direccion,
            telefono: servicio.telefono,
            tipoServicio: servicio.tipoServicio,
            rubro: servicio.rubro,
            descripcion: servicio.descripcion,
        });
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            {listaServicios.map((servicio, indice) => (
                <TouchableOpacity key={indice} style={styles.botonServicio} onPress={() => redireccion(servicio)}>
                    <Text style={{ fontFamily: 'GothamBook' }}>{servicio.titulo}</Text>
                    <Text style={{ fontFamily: 'GothamBook' }}>Contacto: {servicio.telefono}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 80, // Ajusta este valor según la altura de tu navbar
    },
    botonServicio: {
        width: '100%', // Ocupa todo el ancho disponible
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

export default ListaServicios;
