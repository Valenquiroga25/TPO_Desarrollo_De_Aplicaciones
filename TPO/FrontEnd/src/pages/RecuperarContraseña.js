import React from 'react'
import { View,Text,Image,StyleSheet,SafeAreaView,TouchableOpacity,TextInput} from 'react-native'

const RecuperarContraseña = () => {
  return (
    <SafeAreaView>
        <View style={styles.containerDatos}>
        <View style={styles.containerTitulo}>
          <Text style={styles.titulo}>Recuperar Contraseña</Text>
        </View>

        <View style={{backgroundColor:'#FFD600', marginTop:50}}>
          <TextInput 
          inputMode='numeric'
          style={styles.input}
          placeholder='Identificador'
          ></TextInput>
        </View>

        <View style={{backgroundColor:'#FFD600', marginTop:50}}>
          <TextInput
          secureTextEntry={true}
          inputMode='text' 
          style={styles.input}
          placeholder='Mail'
          ></TextInput>
        </View>

        <TouchableOpacity >
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
            <Text>Recuperar</Text>
          </View>
        </TouchableOpacity>
        </View>

    </SafeAreaView>
    
  )
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
})
export default RecuperarContraseña