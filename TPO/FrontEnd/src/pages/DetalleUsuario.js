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
          <Text style={styles.detalle}><Text style={styles.detalle2}>NOMBRE:</Text><Text style={styles.datoText}>{` ${nombre}`}</Text></Text>
          <Text style={styles.detalle}><Text style={styles.detalle2}>APELLIDO:</Text><Text style={styles.datoText}>{` ${apellido}`}</Text></Text>
          <Text style={styles.detalle}><Text style={styles.detalle2}>DOCUMENTO:</Text><Text style={styles.datoText}>{` ${documento}`}</Text></Text>
          <Text style={styles.detalle}><Text style={styles.detalle2}>DIRECCION:</Text><Text style={styles.datoText}>{` ${direccion}`}</Text></Text>
          <Text style={styles.detalle}><Text style={styles.detalle2}>CODIGO DE BARRIO:</Text><Text style={styles.datoText}>{` ${codigoDeBarrio}`}</Text></Text>
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
    navbar:{
      position:'absolute',
      bottom:0,
      left:0,
      right:0,
    },
  });

export default DetalleUsuario