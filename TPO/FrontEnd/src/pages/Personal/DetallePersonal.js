import React, { useEffect, useState } from 'react'
import NavbarPersonal from '../../components/NavbarPersonal';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { Text, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ipLocal } from '../../global/ipLocal';
import { jwtDecode } from 'jwt-decode';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const espacio_contendor = width * 0.7;
const espacio = 10;

function DetallePersonal({navigation}) {
    const [legajo, setLegajo] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [documento, setDocumento] = useState('');
    const [sector, setSector] = useState('');
    const [categoria, setCategoria] = useState('');

    useEffect(() => {
        async function fetchUsuario() {
            try {
                const token = await AsyncStorage.getItem('token');
                const decodeToken = jwtDecode(token);
                const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/personal/${decodeToken.id}`, {
                    method: 'GET',
                    headers:
                    {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error en la respuesta del servidor: ${errorText}`);
                }
                const datosPersonal = await response.json();
                setLegajo(datosPersonal.legajo);
                setNombre(datosPersonal.nombre);
                setApellido(datosPersonal.apellido);
                setDocumento(datosPersonal.documento);
                setSector(datosPersonal.sector);
                setCategoria(datosPersonal.categoria);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsuario();
    })

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image style={styles.imageLogo} resizeMode="cover" source={('../../../assets/BuenosAiresCiudad.png')} />
                <Text style={styles.title}>{'Sus datos'}</Text>
                <Text style={styles.detalle}>{'LEGAJO: '+legajo}</Text>
                <Text style={styles.detalle}>{'NOMBRE: ' + nombre}</Text>
                <Text style={styles.detalle}>{'APELLIDO: ' + apellido}</Text>
                <Text style={styles.detalle}>{'DOCUMENTO: ' + documento}</Text>
                <Text style={styles.detalle}>{'SECTOR: '+ sector}</Text>
                <Text style={styles.detalle}>{'CATEGORIA: '+categoria}</Text>
            </ScrollView>

            <HideWithKeyboard style={styles.navbar}>
                <NavbarPersonal navigation={navigation}/>
            </HideWithKeyboard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detalle: {
        fontSize: 18,
        color: '#4D4D4D',
        paddingTop: 10,
        paddingBottom: 10,
    },
    imageLogo: {
        width: 140,
        height: 45,
        marginBottom: 20,
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default DetallePersonal;