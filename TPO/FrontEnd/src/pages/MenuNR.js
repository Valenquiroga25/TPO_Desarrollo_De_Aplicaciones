import React from 'react';
import { View, StyleSheet, TextInput, Image, FlatList, Dimensions } from 'react-native';
import ListaServiciosNR from '../components/ListaServiciosNR';

const width = Dimensions.get('window').width;

function MenuNR({ navigation }) {
  const imagenes = [
    { id: 1, source: require('../../assets/menu1.png') },
    { id: 2, source: require('../../assets/menu2.png') },
    { id: 3, source: require('../../assets/menu3.png') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.containerDatos}>
        <Image style={styles.imagen} resizeMode="contain" source={require('../../assets/BuenosAiresCiudad.png')} />
      </View>

      <View style={styles.imageContainer}>
        <FlatList
          data={imagenes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Image style={styles.imagenesMenu} resizeMode="contain" source={item.source} />
          )}
          getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
        />
      </View>

      <View style={styles.containerInput}>
        <TextInput style={styles.input} placeholder='Buscar...' />
      </View>

      <ListaServiciosNR navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerDatos: {
    padding: 20,
  },
  imagen: {
    position: 'absolute',
    top: 0,
    left: 15,
    width: 170,
    height: 100,
    marginTop: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 110,
  },
  imagenesMenu: {
    width: width * 0.9, 
    height: 200,
    marginLeft:18,
  },
  containerInput: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    padding: 10,
    marginTop: 7,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#FFFFFF',
    fontFamily:'GothamBook'
  },
  botonServicio: {
    height: 70,
    margin: 10,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFD600',
    borderRadius: 10,
    marginTop: 130,
  },
});

export default MenuNR;
