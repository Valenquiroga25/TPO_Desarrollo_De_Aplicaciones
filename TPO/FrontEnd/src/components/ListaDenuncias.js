import { React, useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ListaDenuncias({ navigation }) {
    const [listaDenuncias, setListaDenuncias] = useState([]);
    const [documento, setDocumento] = useState('');

    useEffect(() => {
        async function fetchDenuncias() {
            try {
                const identificador = await AsyncStorage.getItem('identificador');
                setDocumento(identificador);

                const response = await fetch(`http://192.168.0.34:8080/tpo-desarrollo-mobile/denuncias/allDenunciasFromVecino/${identificador}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const denuncias = await response.json();
                    setListaDenuncias(denuncias);
                } else {
                    throw new Error('Failed to fetch denuncias');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchDenuncias();
    }, []);

    function redireccion(denuncia) {
        navigation.navigate('DetalleDenuncia', {
            sitio: denuncia.sitio,
            documento: denuncia.vecino.documento,
            estado: denuncia.estado,
            descripcion: denuncia.descripcion,
            imagenes: denuncia.imagenes,
        });
    }

    return (
        <ScrollView style={styles.containerDenuncias}>
            {listaDenuncias.map((denuncia, indice) => (
                <TouchableOpacity key={indice} style={styles.botonDenuncia} onPress={() => redireccion(denuncia)}>
                    <Text>{denuncia.descripcion}</Text>
                    <Text>Estado: {denuncia.estado}</Text>
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
