import AsyncStorage from '@react-native-async-storage/async-storage';
import {React, useState} from 'react'
import {Text, TextInput, View, TouchableOpacity, StyleSheet, Modal} from 'react-native'
import {jwtDecode} from 'jwt-decode';
import { ipLocal } from '../global/ipLocal';

function PaginaAcceso({route, navigation}){
    const {tipoDeUsuario} = route.params;
    const [contrasenia, setContrasenia] = useState('')
    const [isVisible, setIsVisible] = useState(false);
    
    const handleSubmit = async(event) =>{
        try{
            event.preventDefault();
      
            if(contrasenia === '')
              throw new Error('Complete todos los campos para registrarse!')
            
            const token = await AsyncStorage.getItem('token'); // Guardar el token en AsyncStorage como una cadena de texto
            const decodeToken = jwtDecode(token); // Decodificar el token usando jwtDecode

            console.log(JSON.stringify(tipoDeUsuario))
            const response = await fetch(`http://${ipLocal}:8080/auth/generarContrasenia/${decodeToken.id}`,{
              method: 'PUT',
              headers: 
              {'Content-Type' : 'application/json',
              "Authorization": `Bearer ${token}`},
              body: contrasenia
            })
            
            if(response.ok){
              console.log("Contraseña creada con éxito!")
              console.log(await response.text())
        
              openModal();
            
            }
          }
          catch(error){
            alert(error);
            console.error(error);
          }
    }

    
  function openModal(){
    setIsVisible(true);
  }

  function closeModal(){
      setIsVisible(false);
  }


  function handleContrasenia(event){
      setContrasenia(event);
  }

  function redireccion(tipoDeUsuario){
    if(tipoDeUsuario === 'Vecino')
      navigation.navigate('MenuVecino')
    else
      navigation.navigate('MenuPersonal')
  }
    
    return(
        <View style={styles.container}>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}>Genere su contraseña!</Text>
            </View>
            <View style={{backgroundColor:'#FFD600', marginTop:75}}>
                <TextInput 
                inputMode='text'
                style={styles.input}
                placeholder='Contraseña'
                onChangeText={handleContrasenia} value={contrasenia}></TextInput>
            </View>

            <TouchableOpacity style={{
                width:300,
                height:60,
                marginLeft:22,
                backgroundColor: '#FFD600',
                alignItems: 'center',
                justifyContent:'center',
                borderWidth:1,
                borderRadius: 10,
                marginTop:80}} onPress={handleSubmit}>
                <Text>Generar</Text>
            </TouchableOpacity>

            <Modal
            animationType='slide'
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
            >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Contraseña generada con éxito!</Text>
                    <Text style={styles.text}>Aprete "Continuar" para ser redirigido a la página principal.</Text>
                </View>
                <View style={styles}>
                  <TouchableOpacity style={{
                          width:300,
                          height:60,
                          margin:10,
                          backgroundColor: '#FFD600',
                          alignItems: 'center',
                          justifyContent:'center',
                          borderWidth:1,
                          borderRadius: 10,
                          marginTop:80}} onPress={() => redireccion(tipoDeUsuario)}>
                          <Text>Continuar</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </Modal>
        </View>
    )
}

  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#FFFFFF',
      padding:20,
      marginTop:30
    },
    containerTitulo:{
      alignItems:'center',
      padding:15,
      marginTop:50,
    },
    titulo:{
      fontSize:30,
      fontWeight:'bold',
      alignItems:'center'
    },
    input:{
      padding:10,
      margin:7,
      height: 40,
      borderColor: "#FFFFFF",
      backgroundColor: '#FFFFFF'
    },
    containerBoton:{
      marginTop:55
    },
    modalContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con 50% de opacidad
  },
  modalContent:{
      backgroundColor:'#FFD600',
      height:150,
      marginLeft:20,
      marginRight:20,
      borderRadius:5,
      padding:15
  },
  modalTitle:{
      fontSize:20,
      textAlign:'center'
  },
  text:{
      fontSize:17,
      marginTop:25
  }
  });

export default PaginaAcceso;