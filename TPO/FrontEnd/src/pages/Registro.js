import React, { useState } from 'react'
import { Text, TextInput, View, Image, StyleSheet, TouchableOpacity, Modal} from 'react-native'
import { ipLocal } from '../global/ipLocal';

function Registro({navigation}) {

  const [identificador, setIdentificador] = useState('');
  const [mail, setMail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async(event) =>{
    try{
      event.preventDefault();

      if(identificador === '' || mail === '')
        throw new Error('Complete todos los campos para registrarse!')
      
      if(!isValidEmail(mail))
        alert("Indique un email válido (debe contener '@')")
      else{
        const data = {identificador, mail}
        console.log(data);
  
        const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/usuarios/signUp`,{
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify(data)
        })
        
        if(!response.ok){     
          throw new Error(await response.text())
        }
  
        console.log("Usuario registrado con exito!")
        console.log(await response.json())
  
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

  function handleIdentificador(event){
    setIdentificador(event);
  }

  function handleEmail(event){
    setMail(event);
    console.log(event)
  }

  function isValidEmail(event) {
    return event.includes('@');
  }

  return (
    <View style={styles.container}>
      
      <Image style={styles.imagen} resizeMode='contain' source={require('../../assets/BuenosAiresCiudad.png')}></Image>
      
      <View style={styles.containerDatos}>
        <View style={{backgroundColor:'#FFD600', marginTop:80}}>
            <TextInput 
            inputMode='numeric'
            style={styles.input}
            placeholder='Identificador'
            onChangeText={handleIdentificador} value={identificador}></TextInput>
          </View>

          <View style={{backgroundColor:'#FFD600', marginTop:50}}>
            <TextInput
            inputMode='email' 
            style={styles.input}
            placeholder='Email'
            onChangeText={handleEmail} value={mail}></TextInput>
          </View>

          <Modal
            animationType='slide'
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
            >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Registro exitoso!</Text>
                    <Text style={styles.text}>Revise su mail para obtener la clave de acceso.</Text>
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
                          marginTop:80}} onPress={() => navigation.goBack()}>
                          <Text style={{fontFamily:'GothamBook'}}>Continuar</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </Modal>

          <TouchableOpacity style={styles.containerBoton} onPress={handleSubmit}>
            <View
              title='Botón Registrarse' 
              style={{    
                height:60,
                margin:10,
                backgroundColor: '#FFD600',
                alignItems: 'center',
                justifyContent:'center',
                borderWidth:1,
                borderRadius: 10,
                  marginTop:130
              }}>
              <Text style={{fontFamily:'GothamBook'}}>Registrarse</Text>
            </View>
        </TouchableOpacity>
      </View>
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
    bottom:0,
    left:10,
    width:180, 
    height:100
  },
  containerDatos:{
    flex:1,
    padding:20,
    marginTop:170
  },
  input:{
    padding:10,
    margin:7,
    marginTop:7,
    marginBottom:7,
    height: 40,
    borderColor: "#FFFFFF",
    backgroundColor: '#FFFFFF',
    fontFamily:'GothamBook'
  },
  containerBoton:{
    marginTop:55,
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
    textAlign:'center',
    fontFamily:'GothamBook'
},
text:{
    fontSize:17,
    marginTop:25,
    fontFamily:'GothamBook'
},
navbar:{
  position:'absolute',
  bottom:0,
  left:0,
  right:0
}
})

export default Registro
