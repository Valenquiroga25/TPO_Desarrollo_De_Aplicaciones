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
        <Image style={styles.imageLogo} resizeMode="cover" source={('../../../assets/BuenosAiresCiudad.png')} />
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.detalle}>{`DIRECCION: ${direccion}`}</Text>
        <Text style={styles.detalle}>{`TELEFONO: ${telefono}`}</Text>
        <Text style={styles.detalle}>{`RUBRO: ${rubro}`}</Text>
        <Text style={styles.descripcion}>{'DESCRIPCION'}</Text>
        <View style={{borderWidth:2,borderColor:'black',height:160, padding:10}}>
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
            <View style={{ width: espacio_contendor }}>
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
      fontWeight: 'bold',
      marginBottom:20,
    },
    detalle: {
      fontSize:18,
      color: '#4D4D4D',
      paddingTop:10,
      paddingBottom:10, 
    },
    descripcion:{
      fontSize:20,
      color:'#4D4D4D',
      marginTop:40,
      marginBottom:20
    },
    textDescripcion:{
      fontSize:16,
      marginTop:10,
      marginBottom:10,
      marginLeft:5
    },
    imageLogo: {
      width: 140,
      height: 45,
      marginBottom: 20,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
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
      width:250,
      height:250,
      resizeMode: "cover",
      borderRadius:20,
      borderWidth:1,
      borderColor:'black'
    },
  });
export default DetalleServicio
