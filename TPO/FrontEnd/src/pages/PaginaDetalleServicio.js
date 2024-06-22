import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

function PaginaDetalleServicio({ route }) {
    const { titulo, direccion, telefono, rubro, descripcion, imagenes } = route.params;


    return (
      <View style={styles.container}>
        <Text style={styles.title}>{titulo}</Text>
        <Text>{direccion}</Text>
        <Text>{telefono}</Text>
        <Text>{rubro}</Text>
        <Text>{descripcion}</Text>
        {imagenes.map((imagen, indice) => (
          <Image key={indice} source={{uri: imagen.datosImagen}}></Image>
        ))}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    }
  });

export default PaginaDetalleServicio
