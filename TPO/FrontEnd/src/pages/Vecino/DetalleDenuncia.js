import {React, useEffect, useState} from 'react'
import { Text, View, StyleSheet,Image,FlatList,Dimensions,TouchableOpacity} from 'react-native';
import { ipLocal } from '../../global/ipLocal';

const width = Dimensions.get("window").width;
const espacio_contendor = width * 0.7;

function DetalleDenuncia({ navigation,route }) {
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
    function editarDenuncia(){
      navigation.navigate('EditarDenuncia',
        {idDenuncia,
        documento: documento,
        calleSitioDenuncia: calleSitio,
        numeroSitioDenuncia: numeroSitio,
        descripcionDenuncia: descripcion,
        estado,})
}
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Denuncia</Text>
        <View style={styles.containerDatos}>
          <Text style={styles.detalle}><Text style={styles.detalle2}>DOCUMENTO:</Text><Text style={styles.datoText}>{` ${documento}`}</Text></Text>
          <Text style={styles.detalle}><Text style={styles.detalle2}>SITIO:</Text><Text style={styles.datoText}>{` ${calleSitio} ${numeroSitio}`}</Text></Text>
          <Text style={styles.detalle}><Text style={styles.detalle2}>ESTADO:</Text><Text style={styles.datoText}>{` ${estado}`}</Text></Text>

          <Text style={styles.descripcion}>{'DESCRIPCION'}</Text>
          <View style={{borderWidth:2,borderColor:'black',height:160}}>
            <Text style={styles.textDescripcion}> {`${descripcion}`}</Text>
          </View>
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
        
        <View>
          <TouchableOpacity 
            style={styles.floatingButton} 
            onPress={editarDenuncia}>
              <Text style={styles.editSign}>✎</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  } 
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#FFFFFF',
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
  descripcionContainer: {
      borderWidth: 1,
      borderColor: '#ced4da',
      borderRadius: 10,
      padding: 10,
      height: 160,
  },
  textDescripcion: {
      fontSize: 16,
      color: '#495057',
      padding:10
  },
  imageContainer: {
    marginTop:20,
    flex: 1,
    marginRight:10
      },
  posterImage: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ced4da',
  },
  floatingButton: {
      position: 'absolute',
      bottom: 40,
      right: 10,
      backgroundColor: '#FFE661',
      borderRadius: 50,
      width: 60,
      height: 60,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
  },
  editSign: {
      fontSize: 30,
      color: 'black',
      marginTop:7
  },
  });

export default DetalleDenuncia
