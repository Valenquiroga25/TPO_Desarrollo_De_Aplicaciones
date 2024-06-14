import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Navbar from '../../components/Navbar'
import HideWithKeyboard from 'react-native-hide-with-keyboard';

function MenuPersonal() {
  return (
    <View style={styles.container}>
        <View style={styles.datosContainer}>
            <View style={{alignItems:'center'}}>
                <Image style={styles.imagenLogo} source={require('../../../assets/BuenosAires.png')}/>
            </View>

            <View style={styles.imageContainer}>
                <Image style={styles.dengueImage} resizeMode='contain' source={require('../../../assets/dengue.png')} />
            </View>

            <View style={styles.botonesContainer}>
                <TouchableOpacity style={{
                    height:80,
                    margin:30,
                    backgroundColor: '#FFD600',
                    alignItems: 'center',
                    justifyContent:'center',
                    borderWidth:1,
                    borderRadius: 20,
                    marginTop:30
                }} onPress={() => navigation.navigate('')}>
                    <Text style={styles.buttonText}>Reclamos</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{
                    height:80,
                    margin:30,
                    backgroundColor: '#FFD600',
                    alignItems: 'center',
                    justifyContent:'center',
                    borderWidth:1,
                    borderRadius: 20,
                    marginTop:20
                }}  onPress={() => navigation.navigate('')}>
                    <Text style={styles.buttonText}>Servicios</Text>
                </TouchableOpacity>
            </View>
        </View> 


        <HideWithKeyboard style={styles.navbar}>
            <Navbar />
        </HideWithKeyboard> 

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF',
},
datosContainer:{
    marginTop:20
},
imagenLogo:{
    position:'absolute',
    top:50,
    right:107,
    width:150,
    height:65,
    marginRight:25,
    marginTop:15
  },
  dengueImage: {
    width: '100%',
    height: 200,
    marginTop: 170,
},
botonesContainer:{
    marginTop:30
},
navbar:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0
  }
})

export default MenuPersonal
