import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Navbar from '../../components/Navbar';
import styles from '../../styles/style';

const MenuServicios = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../../../assets/BuenosAires.png')} />
        </View>
        
      </View>

      <Navbar title='Navbar' />
    </View>
  );
};

export default MenuServicios;
