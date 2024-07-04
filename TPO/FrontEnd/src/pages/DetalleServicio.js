import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet,Image,FlatList,Dimensions} from 'react-native'
import { ipLocal } from '../global/ipLocal';

const width = Dimensions.get("window").width;
const espacio_contendor = width * 0.7;

function DetalleServicio({ route }) {
    const { idServicio, titulo, direccion, telefono, rubro, descripcion } = route.params;
    const [listaImagenes, setListaImagenes] = useState([])
    
    useEffect(() => {
      async function getImagenes() {
        try {
          const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/imagenes/servicio/${idServicio}`, {
            method: 'GET',
          });
      
          if (!response.ok) {
            throw new Error(`Error al obtener las imágenes: ${response.status} ${response.statusText}`);
          }
      
          const imagenes = await response.json();
          setListaImagenes(imagenes);
      
        } catch (error) {
          console.error('Error al obtener las imágenes:', error);
          alert('Error al obtener las imágenes: ' + error.message);
        }
      }
      

      getImagenes()
    }, [])

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.detalle}><Text style={styles.detalle2}>DIRECCIÓN:</Text><Text style={styles.datoText}>{` ${direccion}`}</Text></Text>
        <Text style={styles.detalle}><Text style={styles.detalle2}>TELÉFONO:</Text><Text style={styles.datoText}>{` ${telefono}`}</Text></Text>
        <Text style={styles.detalle}><Text style={styles.detalle2}>RUBRO:</Text><Text style={styles.datoText}>{` ${rubro}`}</Text></Text>
        <Text style={styles.descripcion}>{'DESCRIPCIÓN'}</Text>
          <View style={{borderWidth:2,borderColor:'black',height:160}}>
            <Text style={styles.textDescripcion}> {`${descripcion}`}</Text>
          </View>

        <FlatList 
        data={listaImagenes}//cambiar parametro
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        scrollEventThrottle={16}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: `data:image/jpeg;base64,${item.datosImagen}`}}
                  style={styles.posterImage}
                />
              </View>
            </View>
    )}}/>
    </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 25,
      marginTop:40,
      fontFamily:'GothamBold'
    },
    detalle: {
      marginTop: 22,
      fontFamily:'GothamBook',
    },
    detalle2:{
      fontSize: 18,
      color: '#343a40',
      marginBottom: 10,
      fontFamily:'GothamBold'
    },
    datoText:{
      fontSize:17,
    },
    descripcion:{
      fontSize:18,
      color:'#343a40',
      marginTop:25,
      marginBottom:15,
      fontFamily: 'GothamBold',
    },
    textDescripcion:{
      fontSize:16,
      marginTop:10,
      marginBottom:10,
      marginLeft:5,
      fontFamily:'GothamBook'
    },
    imageContainer: {
        flex: 1,
        marginRight:10
    },
    image: {
        position: 'absolute',
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    navbar:{
      position:'absolute',
      bottom:0,
      left:0,
      right:0,
    },
    posterImage: {
      width:230,
      height:230,
      resizeMode: "cover",
      borderRadius:20,
      borderWidth:1,
      borderColor:'black',
      marginTop: 20,

    },
  });
export default DetalleServicio
