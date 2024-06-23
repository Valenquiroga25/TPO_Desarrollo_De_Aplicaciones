import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import NavbarVecino from '../../components/NavbarVecino';
import { useNavigation } from '@react-navigation/native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuDenuncias = () => {
  const navigation = useNavigation();
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

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error en la respuesta del servidor: ${errorText}`);
        }

        const denuncias = await response.json();
        setListaDenuncias(denuncias);
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
    <View style={styles.container}>
      <View style={styles.containerDatos}>
        <Image style={styles.image} resizeMode="cover" source={require('../../../assets/BuenosAiresCiudad.png')} />
        
        <TouchableOpacity 
          style={styles.floatingButton} 
          onPress={() => navigation.navigate('CrearDenuncia')}>
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>

        <ScrollView style={styles.containerDenuncias}>
          {listaDenuncias.map((denuncia, indice) => (
            <TouchableOpacity key={indice} style={styles.botonDenuncia} onPress={() => redireccion(denuncia)}>
              <Text>{denuncia.descripcion}</Text>
              <Text>Estado: {denuncia.estado}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <HideWithKeyboard style={styles.navbar}>
        <NavbarVecino />
      </HideWithKeyboard> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:'#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  containerDatos:{
    flex: 1,
    marginTop: 15,
    padding: 20
  },
  image: {
    width: 140,
    height: 45,
    marginBottom: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 120, 
    right: 30,
    backgroundColor: '#FFFFFF', 
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, 
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  plusSign: {
    fontSize: 30,
    color: '#000', 
  },
  navbar:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  containerDenuncias: {
    padding: 10,
    maxHeight: 470
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
  }
});

export default MenuDenuncias;
