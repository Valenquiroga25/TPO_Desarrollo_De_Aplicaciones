import { React, useEffect, useState } from "react";
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,ActivityIndicator} from "react-native";
import { ipLocal } from "../global/ipLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

function ListaReclamosAllVecinos({ navigation }) {
    const [listaReclamos, setListaReclamos] = useState([]);
    const [listaUnificados, setListaUnificados] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para indicar carga
    
    useEffect(() => {
        async function fetchReclamosVecinos() {
            try {
                const token = await AsyncStorage.getItem('token');
                const decodeToken = jwtDecode(token);

                const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/reclamos/allFromVecinos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error en la respuesta del servidor: ${errorText}`);
                }
                const reclamos = await response.json();
                setListaReclamos(reclamos);
                const responseUnificado = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/reclamos/unificados/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!responseUnificado.ok) {
                    const errorText = await responseUnificado.text();
                    throw new Error(`Error en la respuesta del servidor: ${errorText} ${responseUnificado.status}`);
                }

                const unificados = await responseUnificado.json();
                setListaUnificados(unificados);

                let reclamosFinales = reclamos;

                if (unificados.length > 0) {
                    reclamosFinales = reclamos.filter(
                        reclamo => !unificados.some(unificado => reclamo.idReclamoUnificado === unificado.idReclamoUnificado)
                    );
                    reclamosFinales = [...reclamosFinales, ...unificados];
                }

                setListaReclamos(reclamosFinales);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Cambia el estado de carga a false cuando termina
            }
        }

        fetchReclamosVecinos();
    }, []);

    function redireccion(reclamo) {
        if (reclamo.idReclamoUnificado === null) {
            navigation.navigate('DetalleReclamoVecino', {
                idReclamo: reclamo.idReclamo,
                documento: reclamo.documentoVecino,
                calleSitio: reclamo.calleSitio,
                numeroSitio: reclamo.numeroSitio,
                estado: reclamo.estado,
                desperfecto: reclamo.desperfecto,
                descripcion: reclamo.descripcion,
                idReclamoUnificado: reclamo.idReclamoUnificado
            });
        } else {
            navigation.navigate('DetalleReclamoUnificadoVecino', {
                idReclamoUnificado: reclamo.idReclamoUnificado,
                calleSitio: reclamo.calleSitio,
                numeroSitio: reclamo.numeroSitio,
                estado: reclamo.estado,
                desperfecto: reclamo.desperfecto,
            });
        }
    }

    // Si está cargando, muestra un indicador de carga
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" style={{position:'absolute', top:250, left:'50%'}}/>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
    scrollContent: {
        paddingBottom: 80, // Ajusta este valor según la altura de tu navbar
    },
    botonReclamo: {
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

export default ListaReclamosAllVecinos;
