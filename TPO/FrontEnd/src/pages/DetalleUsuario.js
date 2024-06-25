import React from 'react'
import Navbar from '../components/Navbar'
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { Text, View, StyleSheet,Image,FlatList,Dimensions,SafeAreaView,ScrollView, TouchableOpacity} from 'react-native'
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const espacio_contendor = width * 0.7;
const espacio = 10;

function DetalleUsuario ({route}) {
    const { nombre,apellido,documento,direccion,codigoDeBarrio} = route.params;
    return (
      <View style={styles.container}>
        <ScrollView> 
        <Image style={styles.imageLogo} resizeMode="cover" source={('../../../assets/BuenosAiresCiudad.png')} />
        <Text style={styles.title}>{'Datos del usuario'}</Text>
        <Text style={styles.detalle}>{'NOMBRE: '+nombre}</Text>
        <Text style={styles.detalle}>{'APELLIDO: '+apellido}</Text>
        <Text style={styles.detalle}>{'DOCUMENTO: '+documento}</Text>
        <Text style={styles.detalle}>{'DIRECCION: '+direccion}</Text>
        <Text style={styles.detalle}>{'CODIGO DE BARRIO:'+codigoDeBarrio}</Text>
        </ScrollView>
        
        <View>
          <TouchableOpacity 
            style={styles.floatingButton} 
            onPress={() => navigation.navigate('CrearDenuncia')}>
              <Text style={styles.plusSign}>✎</Text>
            </TouchableOpacity>
        </View>

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
    imageLogo: {
      width: 140,
      height: 45,
      marginBottom: 20,
    },
    navbar:{
      position:'absolute',
      bottom:0,
      left:0,
      right:0,
    },
  });

export default DetalleUsuario