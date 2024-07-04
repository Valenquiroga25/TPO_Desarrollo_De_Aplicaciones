import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import NavbarVecino from '../../components/NavbarVecino';
import { useNavigation } from '@react-navigation/native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import ListaServicios from '../../components/ListaServicios';

const MenuServiciosVecino = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerDatos}>
      <Image style={styles.image} resizeMode="contain" source={require('../../../assets/BuenosAiresCiudad.png')} />
      </View>
      
      <ListaServicios navigation = {navigation}/>

      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => navigation.navigate('CrearServicio')}>
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>

      <HideWithKeyboard style={styles.navbar}>
        <NavbarVecino navigation={navigation}/>
      </HideWithKeyboard>    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  containerDatos: {
    padding: 20
  },
  image: {
    width: 140,
    height: 45,
    marginTop:20
  },
  floatingButton: {
    position: 'absolute',
    bottom: 100,
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
  input:{
    padding:10,
    marginTop:7,
    marginBottom:7,
    height: 40,
    borderWidth:1,
    borderColor: "black",
    backgroundColor: '#FFFFFF'
  },
  plusSign: {
    fontSize: 30,
    color: '#000',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
});

export default MenuServiciosVecino;
