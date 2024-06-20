import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Navbar from '../../components/Navbar';
import styles from '../../styles/style';
import buttonStyles from '../../styles/styleMenu';


const MenuVecino = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../../assets/BuenosAires.png')} />
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.dengueImage} source={require('../../../assets/dengue.png')} />
        </View>
      </View>

      <View title='Botones'>

        <View style={buttonStyles.buttonWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('MenuReclamosVecino')}>
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

      <Navbar title='Navbar' />
    </View>
  );
};

export default MenuVecino;
