import React from 'react';
import { View, Image } from 'react-native';
import Navbar from '../components/Navbar';
import styles from '../styles/style';

const MenuDenuncias = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../assets/BuenosAires.png')} />
        </View>
      </View>

      <Navbar title='Navbar' />
    </View>
  );
};

export default MenuDenuncias;
