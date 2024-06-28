import React from 'react'
import { Text, View, StyleSheet,Image,FlatList,Dimensions,ScrollView, TouchableOpacity} from 'react-native';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const espacio_contendor = width * 0.7;
const espacio = 10;
function DetalleDenuncia({ route }) {
    const { idDenuncia,documento,calleSitio, numeroSitio, descripcion, estado} = route.params;

    return (
      <View style={styles.container}>
        <ScrollView>
        <Image style={styles.imageLogo} resizeMode="cover" source={('../../../assets/BuenosAiresCiudad.png')} />
        <Text style={styles.detalle}>{`DOCUMENTO: ${documento}`}</Text>
        <Text style={styles.detalle}>{`SITIO: ${calleSitio} ${numeroSitio}`}</Text>
        <Text style={styles.detalle}>{`ESTADO: ${estado}`}</Text>
        <Text style={styles.descripcion}>{'DESCRIPCION'}</Text>
        <View style={{borderWidth:2,borderColor:'black',marginBottom:20,height:160}}>
          <Text style={styles.textDescripcion}> {`${descripcion}`}</Text>
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
