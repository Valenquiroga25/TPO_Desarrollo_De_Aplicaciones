import {React} from 'react'
import { View, StyleSheet, TextInput, Image} from 'react-native'
import ListaServicios from '../components/ListaServicios';

function MenuNR({navigation}) {

  return (
    <View style={styles.container}>
        <View style={styles.containerDatos}>
            <Image style={styles.imagen} resizeMode="contain" source={require('../../assets/BuenosAiresCiudad.png')}></Image>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.dengueImage} resizeMode="contain" source={require('../../assets/dengue.png')} />
        </View>

        <View style={styles.containerInput}>
            <TextInput style={styles.input} placeholder='Buscar...'></TextInput>
        </View>

        <ListaServicios navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    containerInput:{
      paddingTop:20,
      paddingLeft:20,
      paddingRight:20
    },
    imagen:{
        position:'absolute',
        top:0,
        left:15,
        width:170, 
        height:100,
        marginTop:30
    },
    imageContainer: {
        alignItems: 'center',
    },
    dengueImage: {
        width: '100%',
        height: 200,
        marginTop: 110,
    },
    containerDatos:{
        padding:20  
    },
    input:{
      padding:10,
      marginTop:7,
      height: 40,
      borderWidth:1,
      borderColor: "black",
      backgroundColor: '#FFFFFF'
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
      textAlign:'center'
  },
  text:{
      fontSize:17,
      marginTop:25
},
    botonServicio:{
        height:70,
        margin:10,
        backgroundColor: '#E6E6E6',
        alignItems: 'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:"#FFD600",
        borderRadius: 10,
        marginTop:130
    }
  })

export default MenuNR
