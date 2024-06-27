import React, { useEffect, useState } from 'react'
import NavbarVecino from '../../components/NavbarVecino';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { Text, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ipLocal } from '../../global/ipLocal';
import { jwtDecode } from 'jwt-decode';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const espacio_contendor = width * 0.7;
const espacio = 10;

function DetalleVecino({navigation}) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [documento, setDocumento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [codigoBarrio, setCodigoBarrio] = useState('');

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const token = await AsyncStorage.getItem('token');
        const decodeToken = jwtDecode(token);
        const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/vecinos/${decodeToken.id}`, {
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
        const datosVecino = await response.json();
        setNombre(datosVecino.nombre);
        setApellido(datosVecino.apellido);
        setDocumento(datosVecino.documento);
        setDireccion(datosVecino.direccion);
        setCodigoBarrio(datosVecino.codigoBarrio);
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
        <Text style={styles.detalle}>{'NOMBRE: ' + nombre}</Text>
        <Text style={styles.detalle}>{'APELLIDO: ' + apellido}</Text>
        <Text style={styles.detalle}>{'DOCUMENTO: ' + documento}</Text>
        <Text style={styles.detalle}>{'DIRECCION: ' + direccion}</Text>
        <Text style={styles.detalle}>{'CODIGO DE BARRIO: ' + codigoBarrio}</Text>
      </ScrollView>

      <HideWithKeyboard style={styles.navbar}>
        <NavbarVecino navigation={navigation} />
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

export default DetalleVecino;