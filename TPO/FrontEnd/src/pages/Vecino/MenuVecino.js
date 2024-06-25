import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import buttonStyles from '../../styles/styleMenu';
import NavbarVecino from '../../components/NavbarVecino';


const MenuVecino = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.datosContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.imagenLogo} source={require('../../../assets/BuenosAires.png')} />
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.dengueImage} resizeMode='contain' source={require('../../../assets/dengue.png')} />
        </View>
      </View>

      <View title='Botones'>

        <View style={buttonStyles.buttonWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('MenuReclamos')}>
            <Image style={buttonStyles.clickableImage} source={require('../../../assets/ImagenReclamoDefinitiva.jpg')}></Image>
          </TouchableOpacity>
        </View>
        <View style={buttonStyles.buttonWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('MenuServiciosVecino')}>
          <Image style={buttonStyles.clickableImage} source={require('../../../assets/ImagenServicioDefinitiva2.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={buttonStyles.buttonWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('MenuDenuncias')}>
          <Image style={buttonStyles.clickableImage} source={require('../../../assets/ImagenDenunciaDefinitivo2.jpg')}></Image>
          </TouchableOpacity>
        </View>
        
      </View>

      <NavbarVecino navigation={navigation}/>

    </View>
  );
};


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
  },
  dengueImage: {
    width: '70%',
    height: 200,
    marginTop: 140,
    marginLeft:60,
    borderRadius:15
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

export default MenuVecino;
