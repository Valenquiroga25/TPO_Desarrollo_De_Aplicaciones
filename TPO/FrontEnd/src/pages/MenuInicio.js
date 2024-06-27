import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

function MenuInicio({ navigation }) {
  const imagenes = [
    { id: 1, source: require('../../assets/menu1.png') },
    { id: 2, source: require('../../assets/menu2.png') },
    { id: 3, source: require('../../assets/menu3.png') },
    // Agrega más imágenes según sea necesario
  ];

  return (
    <View style={styles.container}>
      <View style={styles.datosContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image style={styles.imagenLogo} source={require('../../assets/BuenosAires.png')} />
        </View>

        <View style={styles.imageContainer}>
          <FlatList
            data={imagenes}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Image style={styles.imagenesMenu} resizeMode='contain' source={item.source} />
            )}
            getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
          />
        </View>

        <View style={styles.botonesContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={{
                height: 80,
                margin: 30,
                backgroundColor: '#FFD600',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 20,
                marginTop: 50,
              }}
              onPress={() => navigation.navigate('MenuNR')}
            >
              <Text style={styles.buttonText}>Servicios</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ textAlign: 'center', marginTop: 70 }}>No tienes una cuenta?</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={{
                height: 50,
                margin: 30,
                backgroundColor: '#E6E6E6',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 20,
                marginTop: 20,
              }}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  datosContainer: {
    marginTop: 20,
  },
  imagenLogo: {
    position: 'absolute',
    top: 50,
    right: 107,
    width: 150,
    height: 65,
    marginRight: 25,
    marginTop: 15,
  },
  imageContainer: {
    marginTop: 170,
    width: '100%',
    height: 200,
  },
  imagenesMenu: {
    width: width * 0.9, 
    height: 200,
    marginLeft:18,
  },
  botonesContainer: {
    marginTop: 30,
  },
  buttonWrapper: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default MenuInicio;
