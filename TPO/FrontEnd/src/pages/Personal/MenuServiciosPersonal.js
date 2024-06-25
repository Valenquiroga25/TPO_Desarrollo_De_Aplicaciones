import React from 'react'
import { View, Image, StyleSheet, TextInput } from 'react-native';
import ListaServicios from '../../components/ListaServicios';

function MenuServiciosPersonal({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.containerDatos}>
            <Image style={styles.image} resizeMode="contain" source={require('../../../assets/BuenosAiresCiudad.png')}></Image>
        </View>

        <View style={styles.containerInput}>
            <TextInput style={styles.input} placeholder='Buscar...'></TextInput>
        </View>

        <ListaServicios navigation={navigation}/>
    </View>
  )
}

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
      marginBottom: 20,
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
    },
});

export default MenuServiciosPersonal
