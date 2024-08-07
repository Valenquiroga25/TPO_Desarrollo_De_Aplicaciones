import {React, useState, useEffect} from 'react';import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import NavbarPersonal from '../../components/NavbarPersonal';
import { useNavigation } from '@react-navigation/native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import ListaReclamosAllVecinos from '../../components/ListaReclamosAllVecinos';
import { useIsFocused } from '@react-navigation/native';

const MenuReclamosVecinosPersonal = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setRefresh(prev => !prev);
    }
  }, [isFocused]);
  
  return (
    <View style={styles.container}>
      <View style={styles.containerDatos}>
      <Image style={styles.image} resizeMode="contain" source={require('../../../assets/BuenosAiresCiudad.png')} />
      </View>
      
      <ListaReclamosAllVecinos key={refresh} navigation = {navigation}/>
      <HideWithKeyboard style={styles.navbar}>
        <NavbarPersonal navigation={navigation}/>
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
    padding: 20,
    marginTop:15
  },
  image: {
    width: 140,
    height: 45,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 10,
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
  text:{
    fontSize:17,
    marginTop:25
  },  
  containerServicios: {
    padding: 10,
    maxHeight:470
  },
  botonServicio: {
    height: 70,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#FFD600",
    borderRadius: 10,
    marginTop: 20
  }
});

export default MenuReclamosVecinosPersonal;
