import React from 'react'
import { Text, View, StyleSheet,TextInput, TouchableOpacity } from 'react-native'
import Navbar from '../components/Navbar';

function Login() {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.containerTitulo}>
          <Text style={styles.titulo}>Bienvenido!</Text>
        </View>

        <View style={{backgroundColor:'#FFD600', marginTop:50}}>
          <TextInput inputMode='text' style={styles.input} placeholder='Identificador'></TextInput>
        </View>

        <View style={{backgroundColor:'#FFD600', marginTop:50}}>
          <TextInput inputMode='text' style={styles.input} placeholder='Contraseña'></TextInput>
        </View>

        <TouchableOpacity onPress={() => {}}>
          <View
            title='Botón ingresar' 
            style={{    
            height:60,
            margin:15,
            backgroundColor: '#FFD600',
            alignItems: 'center',
            justifyContent:'center',
            borderWidth:1,
            borderRadius: 10,
            marginTop:50
            }}>
            <Text>Ingresar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerBoton} onPress={() => {}}>
        <View
            title='Botón Registrarse' 
            style={{    
            height:50,
            margin:30,
            backgroundColor: '#E6E6E6',
            alignItems: 'center',
            justifyContent:'center',
            borderWidth:1,
            borderRadius: 10,
            marginTop:50
            }}>
            <Text>Registrarse</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <Navbar/>
    
    </View>
  );
}

const styles = StyleSheet.create({
  "container":{
    padding:20
  },
  "containerTitulo":{
    alignItems:'center'
  },
  "titulo":{
    marginTop:60,
    fontSize:30,
    fontWeight:'bold'
  },
  "input":{
    padding:10,
    margin:7,
    marginTop:7,
    marginBottom:7,
    height: 40,
    borderColor: "#FFFFFF",
    backgroundColor: '#FFFFFF'
  },
  "containerBoton":{
    marginTop:80,
  }
});

export default Login

