import React, { useEffect, useState } from 'react'
import NavbarPersonal from '../../components/NavbarPersonal';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ipLocal } from '../../global/ipLocal';
import { jwtDecode } from 'jwt-decode';
import { TouchableOpacity } from 'react-native';

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

    function cerrarSesion(){
        navigation.navigate('MenuInicio')
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>{'Mi perfil'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalle2}>LEGAJO:</Text><Text style={styles.datoText}>{` ${legajo}`}</Text></Text>
                <Text style={styles.detalle}><Text style={styles.detalle2}>NOMBRE:</Text><Text style={styles.datoText}>{` ${nombre}`}</Text></Text>
                <Text style={styles.detalle}><Text style={styles.detalle2}>APELLIDO:</Text><Text style={styles.datoText}>{` ${apellido}`}</Text></Text>
                <Text style={styles.detalle}><Text style={styles.detalle2}>DOCUMENTO:</Text><Text style={styles.datoText}>{` ${documento}`}</Text></Text>
                <Text style={styles.detalle}><Text style={styles.detalle2}>SECTOR:</Text><Text style={styles.datoText}>{` ${sector}`}</Text></Text>
                <Text style={styles.detalle}><Text style={styles.detalle2}>CATEGORIA:</Text><Text style={styles.datoText}>{` ${categoria}`}</Text></Text>
            </ScrollView>

            <TouchableOpacity style={styles.cerrarSesion} onPress={cerrarSesion}>
                    <Text style={styles.textCerrarSesion}>CERRAR SESIÓN</Text>
            </TouchableOpacity>
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
        marginTop:40,
        fontFamily:'GothamBold'
      },
      detalle: {
        marginTop: 22,
        fontFamily:'GothamBook',
        marginTop:40
      },
      detalle2:{
        fontSize: 18,
        color: '#343a40',
        marginBottom: 10,
        fontFamily:'GothamBold'
      },
      datoText:{
        fontSize:17,
      },
      cerrarSesion:{
        position:'absolute',
        bottom:70,
        left:113.4
    },
      textCerrarSesion:{
        fontSize:18,
        fontFamily:'GothamBold',
        color: '#900040',
        textAlign:'center'
      },
});

export default DetallePersonal;