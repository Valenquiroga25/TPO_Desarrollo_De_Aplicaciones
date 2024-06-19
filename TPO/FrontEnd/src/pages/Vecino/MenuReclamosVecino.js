import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Navbar from '../../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

const MenuReclamosVecino = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerDatos}>
        <Image style={styles.image} resizeMode="cover" source={('../../../assets/BuenosAiresCiudad.png')} />
        
        <TouchableOpacity 
          style={styles.floatingButton} 
          onPress={() => navigation.navigate('CrearReclamo')}>
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>
      </View>

      <HideWithKeyboard style={styles.navbar}>
        <Navbar />
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
    flex:1,
    marginTop:15,
    padding:20
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
    position:'absolute',
    bottom:0,
    left:0,
    right:0
  }
});

export default MenuReclamosVecino;
