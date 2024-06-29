import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet,Image,FlatList,Dimensions,TouchableOpacity} from 'react-native';
import { ipLocal } from '../../global/ipLocal';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const espacio_contendor = width * 0.7;
function DetalleDenuncia({ route }) {
    const { idDenuncia,documento,calleSitio, numeroSitio, descripcion, estado} = route.params;
    const [listaImagenes, setListaImagenes] = useState([])

    useEffect(() => {
      async function getImagenes() {
        try {
          const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/imagenes/denuncia/${idDenuncia}`, {
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
        <Text style={styles.detalle}>{`DOCUMENTO: ${documento}`}</Text>
        <Text style={styles.detalle}>{`SITIO: ${calleSitio} ${numeroSitio}`}</Text>
        <Text style={styles.detalle}>{`ESTADO: ${estado}`}</Text>
        <Text style={styles.descripcion}>{'DESCRIPCION'}</Text>
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
            <View style={{ width: espacio_contendor }}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: `data:image/jpeg;base64,${item.datosImagen}`}}
                  style={styles.posterImage}
                />
              </View>
            </View>
    )}}/>
        
        <View>
          <TouchableOpacity 
            style={styles.floatingButton} 
            onPress={() => navigation.navigate('CrearDenuncia',{ idDenuncia: idDenuncia,
              documento: documentoVecino,
              calleSitio: calleSitio,
              numeroSitio: numeroSitio,
              descripcion: descripcion,
              estado: estado,})}>
              <Text style={styles.plusSign}>✎</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
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
        marginTop:25,
        position: 'relative',
    },
    image: {
        position: 'absolute',
        width: 300,
        height: 300,
        resizeMode: 'cover',
    },
    navbar:{
      position:'absolute',
      bottom:0,
      left:0,
      right:0,
    },
    posterImage: {
      width:200,
      height:200,
      resizeMode: "cover",
      borderRadius:20,
      borderWidth:1,
      borderColor:'black'
    },
    floatingButton: {
      position: 'absolute',
      bottom: 70,
      right: 10,
      backgroundColor: '#FFFFFF',
      borderRadius: 50,
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#000',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    plusSign: {
      fontSize: 30,
      color: '#000',
    },
  });

export default DetalleDenuncia
