import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import Navbar from '../components/Navbar';

function Login() {
  return (
    <View>
      <View style={styles.container}>
        
        <View style={{alignItems:'center'}}>
          <Image style={{width:150, height:65, marginRight:25, marginTop:15}} source={require('../../assets/BuenosAires.png')}/>
        </View>

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
            backgroundColor: '#E6E6E6',
            alignItems: 'center',
            justifyContent:'center',
            borderWidth:1,
            borderRadius: 10,
            marginTop:15,
            marginLeft:25,
            marginRight:27
            }}>
            <Text>Registrarse</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <Navbar title='Navbar'/>
    
    </View>
  );
}

const styles = StyleSheet.create({
  "container":{
    backgroundColor:'#FFFFFF',
    padding:20
  },
  "containerTitulo":{
    alignItems:'center'
  },
  "titulo":{
    marginTop:45,
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

