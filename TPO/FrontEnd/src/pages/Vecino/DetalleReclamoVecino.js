import { React, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ipLocal } from "../../global/ipLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const espacio_contendor = width * 0.7;

function DetalleReclamoVecino({ navigation, route }) {
  const {
    idReclamo,
    documento,
    calleSitio,
    numeroSitio,
    estado,
    desperfecto,
    descripcion,
  } = route.params;
  const [listaImagenes, setListaImagenes] = useState([]);
  const [esVecino, setEsVecino] = useState(true);

  useEffect(() => {
    async function checkEsVecino() {
      const token = await AsyncStorage.getItem("token");
      const decodeToken = jwtDecode(token);
      console.log(token);
      const tipoUsuario = decodeToken.rol;

      if (tipoUsuario === "Inspector") setEsVecino(false);
    }

    checkEsVecino();
  }, []);

  useEffect(() => {
    async function getImagenes() {
      try {
        const response = await fetch(
          `http://${ipLocal}:8080/tpo-desarrollo-mobile/imagenes/reclamo/${idReclamo}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error al obtener las imágenes: ${response.status} ${response.statusText}`
          );
        }

        const imagenes = await response.json();
        setListaImagenes(imagenes);
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
        alert("Error al obtener las imágenes: " + error.message);
      }
    }

    getImagenes();
  }, []);

  return (
    <View style={styles.container}>
      {esVecino ? (
        <View>
          <Text style={styles.title}>{"Reclamo"}</Text>
          <Text style={styles.detalle}>
            <Text style={styles.detalle2}>ID RECLAMO:</Text>
            <Text style={styles.datoText}>{` ${idReclamo}`}</Text>
          </Text>
          <Text style={styles.detalle}>
            <Text style={styles.detalle2}>DOCUMENTO:</Text>
            <Text style={styles.datoText}>{` ${documento}`}</Text>
          </Text>
          <Text style={styles.detalle}>
            <Text style={styles.detalle2}>SITIO:</Text>
            <Text
              style={styles.datoText}
            >{` ${calleSitio} ${numeroSitio}`}</Text>
          </Text>
          <Text style={styles.detalle}>
            <Text style={styles.detalle2}>ESTADO:</Text>
            <Text style={styles.datoText}>{` ${estado}`}</Text>
          </Text>
          <Text style={styles.detalle}>
            <Text style={styles.detalle2}>DESPERFECTO:</Text>
            <Text style={styles.datoText}>{` ${desperfecto}`}</Text>
          </Text>
          <Text style={styles.descripcion}>{"DESCRIPCION"}</Text>
          <View style={{ borderWidth: 2, borderColor: "black", height: 160 }}>
            <Text style={styles.textDescripcion}> {`${descripcion}`}</Text>
          </View>

          <FlatList
            data={listaImagenes}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ width: espacio_contendor }}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${item.datosImagen}`,
                      }}
                      style={styles.posterImage}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>{"Reclamo"}</Text>
          <Text style={styles.detalle}>
            <Text style={styles.detalle2}>ID RECLAMO:</Text>
            <Text style={styles.datoText}>{` ${idReclamo}`}</Text>
          </Text>
          <Text style={styles.detalle}>
            <Text style={styles.detalle2}>DOCUMENTO:</Text>
            <Text style={styles.datoText}>{` ${documento}`}</Text>
          </Text>
          <Text style={styles.detalle}>
            <Text style={styles.detalle2}>SITIO:</Text>
            <Text
              style={styles.datoText}
            >{` ${calleSitio} ${numeroSitio}`}</Text>
          </Text>
          <Text style={styles.detalle}>
            <Text style={styles.detalle2}>ESTADO:</Text>
            <Text style={styles.datoText}>{` ${estado}`}</Text>
          </Text>
          <Text style={styles.detalle}>
            <Text style={styles.detalle2}>DESPERFECTO:</Text>
            <Text style={styles.datoText}>{` ${desperfecto}`}</Text>
          </Text>
          <Text style={styles.descripcion}>{"DESCRIPCION"}</Text>
          <View style={{ borderWidth: 2, borderColor: "black", height: 160 }}>
            <Text style={styles.textDescripcion}> {`${descripcion}`}</Text>
          </View>

          <FlatList
            data={listaImagenes}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ width: espacio_contendor }}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${item.datosImagen}`,
                      }}
                      style={styles.posterImage}
                    />
                  </View>
                </View>
              );
            }}
          />
          
        </View>
        
      )}
      <View>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() =>
            navigation.navigate("EditarReclamoVecino", {
              idReclamo: idReclamo,
              documentoReclamo: documento,
              calleSitioReclamo: calleSitio,
              numeroSitioReclamo: numeroSitio,
              estado: estado,
              desperfectoReclamo: desperfecto,
              descripcionReclamo: descripcion,
            })
          }
        >
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
  paddingRight: 10,
  },
posterImage: {
    width: 180,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
},
floatingButton: {
    position: 'absolute',
    bottom: -275,
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

export default DetalleReclamoVecino;
