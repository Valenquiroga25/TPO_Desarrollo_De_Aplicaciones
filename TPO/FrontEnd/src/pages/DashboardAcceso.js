import AsyncStorage from '@react-native-async-storage/async-storage';
import {React, useState} from 'react'
import {Text, TextInput, View, TouchableOpacity, StyleSheet} from 'react-native'
import {jwtDecode} from 'jwt-decode';

function DashboardAcceso({route, navigation}){
    const {tipoDeUsuario} = route.params;
    const [contrasenia, setContrasenia] = useState('')

    
    const handleSubmit = async(event) =>{
        try{
            event.preventDefault();
      
            if(contrasenia === '')
              throw new Error('Complete todos los campos para registrarse!')
            
            const token = await AsyncStorage.getItem('token'); // Guardar el token en AsyncStorage como una cadena de texto
            const decodeToken = jwtDecode(token); // Decodificar el token usando jwtDecode

            console.log(JSON.stringify(tipoDeUsuario))
            const response = await fetch(`http://192.168.0.48:8080/auth/generarContrasenia/${decodeToken.id}`,{
              method: 'PUT',
              headers: 
              {'Content-Type' : 'application/json',
              "Authorization": `Bearer ${token}`},
              body: contrasenia
            })
            
            if(response.ok){
              console.log("Contraseña creada con éxito!")
              console.log(await response.text())
        
              alert("Contraseña con exito!")
  
              if(tipoDeUsuario === 'Vecino')
                  navigation.navigate('DashboardNeighbor')
              else
                  navigation.navigate('DashboardPersonal')
            }
          }
          catch(error){
            alert(error);
            console.error(error);
          }
    }

    function handleContrasenia(event){
        setContrasenia(event);
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
        </View>
    )
}

  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#FFFFFF',
      padding:20
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
    }
  });

export default DashboardAcceso;