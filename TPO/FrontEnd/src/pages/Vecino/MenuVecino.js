import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import NavbarVecino from '../../components/NavbarVecino';

const width = Dimensions.get('window').width;

const MenuVecino = ({ navigation }) => {
  const imagenes = [
    { id: 1, source: require('../../../assets/menu1.png') },
    { id: 2, source: require('../../../assets/menu2.png') },
    { id: 3, source: require('../../../assets/menu3.png') },
    
  ];

  return (
    <View style={styles.container}>
      <View style={styles.datosContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.imagenLogo} source={require('../../../assets/BuenosAires.png')} />
        </View>
        <View style={styles.imageContainer}>
          <FlatList
            data={imagenes}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Image style={styles.dengueImage} resizeMode='contain' source={item.source} />
            )}
            getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
          />
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
    width: width * 0.7, 
    height: 200,
    marginTop: 140,
    marginLeft: 60,
    borderRadius: 15,
},
botonesContainer:{
    marginTop:30
},
navbar:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0
  },
});

const buttonStyles = StyleSheet.create({
  buttonWrapper: {
    padding: 10,
  },
  clickableImage: {
    width: "100%", 
    height: 110, 
    borderRadius: 10,
    borderColor: '#333333',
    borderWidth: 1,
  },
});

export default MenuVecino;
