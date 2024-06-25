import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import buttonStyles from '../../styles/styleMenu';
import NavbarPersonal from '../../components/NavbarPersonal';

function MenuPersonal({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.datosContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.imagenLogo}  source={require('../../../assets/BuenosAires.png')} />
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.dengueImage} resizeMode='contain' source={require('../../../assets/dengue.png')} />
        </View>
      </View>

      <View style={styles.botonesContainer}>

            <View style={buttonStyles.buttonWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('MenuReclamos')}>
                    <Image style={buttonStyles.clickableImage} source={require('../../../assets/ImagenReclamoDefinitiva.jpg')}></Image>
                </TouchableOpacity>
            </View>
            <View style={buttonStyles.buttonWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('MenuServiciosPersonal')}>
                    <Image style={buttonStyles.clickableImage} source={require('../../../assets/ImagenServicioDefinitiva2.png')}></Image>
                </TouchableOpacity>
            </View>
          </View>

        <NavbarPersonal title='Navbar' />
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
