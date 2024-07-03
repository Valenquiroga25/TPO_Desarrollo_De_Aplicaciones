import {React, useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import NavbarVecino from '../../components/NavbarVecino';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import ListaReclamosVecino from '../../components/ListaReclamosVecino';
import { useIsFocused } from '@react-navigation/native';

const MenuReclamos = ({navigation}) => {
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

      <ListaReclamosVecino key={refresh} navigation = {navigation}/>
      
      <View style={styles.floatingButton}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('CrearReclamo')}>
          <Text style={styles.plusSign}>+</Text>
        </TouchableOpacity>
      </View>
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
  listaReclamos:{
    paddingBottom:60
  }
});

export default MenuReclamos;