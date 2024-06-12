import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Navbar from '../../components/Navbar';
import styles from '../../styles/style';

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

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MenuReclamosVecino')}>
            <Text style={styles.buttonText}>Reclamos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MenuServiciosVecino')}>
            <Text style={styles.buttonText}>Servicios</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MenuDenuncias')}>
            <Text style={styles.buttonText}>Denuncias</Text>
          </TouchableOpacity>
        </View>
        
      </View>

      <Navbar title='Navbar' />
    </View>
  );
};

export default MenuVecino;
