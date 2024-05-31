import {React, useState} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import Navbar from '../components/Navbar';

function Login({navigation}) {
  const [identificador, setIdentificador] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleSubmit =  async(event) => {
    try{
      event.preventDefault();
      
      const data = {identificador, contrasenia}
      console.log(data);

      const response = await fetch('/auth/login',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })
      
      if(!response.ok){
        throw new Error(await response.Text)
      }

      const token = response.Text;
      localStorage.setItem('token', token);
      const decodeToken = token.decodeToken;

      if(!isExpired(decodeToken)){
        console.log(decodeToken);

        if(decodeToken.rol === 'Vecino'){
          navigation.navigate('DashboardNeighbor')
        }
        else{
          navigation.navigate('DashboardPersonal')
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
    <View>
      <View style={styles.container}>
        
        <View style={{alignItems:'center'}}>
          <Image style={{width:150, height:65, marginRight:25, marginTop:15}} source={require('../../assets/BuenosAires.png')}/>
        </View>

        <View style={styles.containerTitulo}>
          <Text style={styles.titulo}>Bienvenido!</Text>
        </View>

        <View style={{backgroundColor:'#FFD600', marginTop:50}}>
          <TextInput 
          inputMode='text'
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
      
      <Navbar title='Navbar' navigation={navigation}/>
    
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
    marginTop:35,
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
    marginTop:50,
  },
  "boton":{
    backgroundColor:'red',
    width:100
  }
});

export default Login

