import {React, useState} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import Navbar from '../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { isExpired } from 'react-jwt';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

function Login({navigation}) {
  const [identificador, setIdentificador] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleSubmit =  async() => {
    try{
      
      const data = {identificador, contrasenia}
      console.log(data);

      const response = await fetch('http://192.168.0.199:8080/auth/login',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })
      
      if(!response.ok){
        throw new Error(await response.text())
      }

      const token = await response.text(); 
      await AsyncStorage.setItem('token', token); 
      const decodeToken = jwtDecode(token); 
      console.log(token);
      const tipoUsuario = decodeToken.rol;

      if(!isExpired(token)){
        console.log(decodeToken);

        if(decodeToken.isPasswordNull){
          navigation.navigate('PaginaAcceso', {tipoDeUsuario: tipoUsuario})
        }else{
          if(tipoUsuario === 'Vecino'){
            navigation.navigate('MenuVecino');
          }
          else{
            navigation.navigate('MenuPersonal');
          }
        }
      }

    }catch(error){
      alert(error);
      console.error(error);
    }
  } 

  function handleIdentificador(event){
    setIdentificador(event);
  }

  function handleContrasenia(event){
    setContrasenia(event);
  }

  return (
    <View style={styles.container}>
       
        <View style={{alignItems:'center'}}>
          <Image style={styles.imagen} source={require('../../assets/BuenosAires.png')}/>
        </View>
      
      <View style={styles.containerDatos}>
        <View style={styles.containerTitulo}>
          <Text style={styles.titulo}>Bienvenido!</Text>
        </View>

        <View style={{backgroundColor:'#FFD600', marginTop:50}}>
          <TextInput 
          inputMode='numeric'
          style={styles.input}
          placeholder='Identificador'
          onChangeText={handleIdentificador} value={identificador}></TextInput>
        </View>

        <View style={{backgroundColor:'#FFD600', marginTop:50}}>
          <TextInput
          secureTextEntry={true}
          inputMode='text' 
          style={styles.input}
          placeholder='Contraseña'
          onChangeText={handleContrasenia} value={contrasenia}></TextInput>
        </View>

        <TouchableOpacity onPress={handleSubmit}>
          <View
            title='Botón ingresar' 
            type='submit'
            style={{    
            height:60,
            margin:10,
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

        <TouchableOpacity style={styles.containerBoton} onPress={() => navigation.navigate('Registro','')}>
        <View
            title='Botón Registrarse' 
            style={{    
            marginTop:30,
            height:50,
            backgroundColor: '#E6E6E6',
            alignItems: 'center',
            justifyContent:'center',
            borderWidth:1,
            borderRadius: 10,
            marginLeft:25,
            marginRight:27
            }}>
            <Text>Registrarse</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <HideWithKeyboard style={styles.navbar}>
        <Navbar />
      </HideWithKeyboard>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF',
  },
  imagen:{
  position:'absolute',
  top:50,
  right:107,
  width:150,
  height:65,
  marginRight:25,
  marginTop:15
  },
  containerDatos:{
    marginTop:140,
    padding:20
  },
  containerTitulo:{
    alignItems:'center'
  },
  titulo:{
    marginTop:35,
    fontSize:30,
    fontWeight:'bold'
  },
  input:{
    padding:10,
    margin:7,
    marginTop:7,
    marginBottom:7,
    height: 40,
    borderColor: "#FFFFFF",
    backgroundColor: '#FFFFFF'
  },
  containerBoton:{
    marginTop:55
  },
  navbar:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0
  }
});

export default Login

