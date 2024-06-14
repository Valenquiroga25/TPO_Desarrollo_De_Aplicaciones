import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Navbar from '../../components/Navbar';
import { useNavigation } from '@react-navigation/native';

const MenuServicios = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode="cover" source={('../../../assets/BuenosAiresCiudad.png')} />
      
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => navigation.navigate('CrearServicio')}>
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>

      <Navbar title='Navbar' />
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
  image: {
    width: 140,
    height: 45,
    marginBottom: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 80, 
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
});

export default MenuServicios;
