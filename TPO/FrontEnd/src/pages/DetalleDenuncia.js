import React from 'react'
import Navbar from '../components/Navbar'
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { Text, View, StyleSheet,Image,FlatList,Dimensions,SafeAreaView} from 'react-native'
import { ScrollView } from 'react-native-web';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const espacio_contendor = width * 0.7;
const espacio = 10;
function DetalleDenuncia({ route }) {
    //const { titulo, sitio, documento, estado, descripcion, imagenes } = route.params;
    const imagenes = ['assets/ImagenDenunciaDefinitivo2.jpg','assets/ImagenServicioDefinitiva2.png','assets/ImagenServicioDefinitiva2.png']
    return (
      <View style={styles.container}>
        <ScrollView>
        <Image style={styles.imageLogo} resizeMode="cover" source={('../../../assets/BuenosAiresCiudad.png')} />
        <Text style={styles.title}>{'Denuncia'}</Text>
        <Text style={styles.detalle}>{'SITIO: '}</Text>
        <Text style={styles.detalle}>{'DOCUMENTO: '}</Text>
        <Text style={styles.detalle}>{'ESTADO: '}</Text>
        <Text style={styles.descripcion}>{'DESCRIPCION'}</Text>
        <View style={{borderWidth:2,borderColor:'black',marginBottom:20,}}>
          <Text style={styles.textDescripcion}> {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla risus justo, ultricies vel tortor et, facilisis pulvinar justo. Pellentesque egestas metus id dolor venenatis, sit amet pellentesque dui pretium. Integer posuere dui ac massa rhoncus pretium. Nam ac diam ultricies, tempor neque et, dictum diam. '}</Text>
        </View>

        <FlatList 
        data={imagenes}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        scrollEventThrottle={16}
        keyExtractor={(item)=> item}
        renderItem={({item,index})=> {
          return(
          <View style={{width:espacio_contendor}}>
            <View style={{
              marginHorizontal:espacio,
              padding:espacio,
              borderRadius:34,
              backgroundColor: "#fff",
              alignItems:'center',
            }}>
              <Image
                source={{ uri: item }}
                style={styles.posterImage}
              />
            </View>
          
            </View>
    )}}/>
        </ScrollView>
        

        <HideWithKeyboard style={styles.navbar}>
            <Navbar />
        </HideWithKeyboard>
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
        justifyContent: 'center',
        alignItems: 'center',
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
      width: width * 0.6, 
      height: height * 0.4,
      resizeMode: "cover",
      borderRadius: 10,
      marginBottom:10,
    },
  });

export default DetalleDenuncia
