import React from 'react'
import { Text, View, StyleSheet,Image,FlatList,Dimensions, ScrollView} from 'react-native'
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const espacio_contendor = width * 0.7;
const espacio = 10;

function DetalleServicio({ route }) {
    const { titulo, direccion, telefono, rubro, descripcion, imagenes } = route.params;

    const imageness = ['assets/ImagenDenunciaDefinitivo2.jpg','assets/ImagenServicioDefinitiva2.png']
    
    return (
      <View style={styles.container}>
        <ScrollView>
        <Image style={styles.imageLogo} resizeMode="cover" source={('../../../assets/BuenosAiresCiudad.png')} />
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.detalle}>{`DIRECCION: ${direccion}`}</Text>
        <Text style={styles.detalle}>{`TELEFONO: ${telefono}`}</Text>
        <Text style={styles.descripcion}>{'DESCRIPCION'}</Text>
        <View style={{borderWidth:2,borderColor:'black',marginBottom:20,height:160}}>
          <Text style={styles.textDescripcion}> {`${descripcion}`}</Text>
        </View>

        <FlatList 
        data={imageness}//cambiar parametro
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
export default DetalleServicio
