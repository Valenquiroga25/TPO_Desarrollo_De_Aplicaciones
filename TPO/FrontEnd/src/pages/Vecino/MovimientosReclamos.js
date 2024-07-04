import { React, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { ipLocal } from "../../global/ipLocal";


function MovimientosReclamos({ route }) {
  const [listaMovimientosReclamo, setListaMovimientosReclamo] = useState([]);
  const {idReclamo} = route.params;
  console.log(idReclamo);
  useEffect(() => {
    async function fetchMovimientoReclamos() {
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await fetch(
          `http://${ipLocal}:8080/tpo-desarrollo-mobile/reclamos/movimientoReclamo/${idReclamo}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Error en la respuesta del servidor: ${errorText} ${response.status}`
          );
        }
        const reclamos = await response.json();
        setListaMovimientosReclamo(reclamos);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovimientoReclamos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerDatos}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("../../../assets/BuenosAiresCiudad.png")}
        />
      </View>
      <ScrollView contentContainerStyle={styles.containerReclamos}>
        {listaMovimientosReclamo.map((reclamo, indice) => (
          <TouchableOpacity key={indice} style={styles.botonReclamo}>
            <Text style={{ fontFamily: "GothamBook", fontSize:20,margin:10}}>
              {reclamo.descripcion}
            </Text>
            <Text style={{ fontFamily: "GothamBook", fontSize:16,margin:10}}>
              Estado: {reclamo.estado}
            </Text>
            <Text style={{ fontFamily: "GothamBook",margin:10}}>
              fecha: {reclamo.fecha}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  containerDatos: {
    padding: 20,
  },
  image: {
    width: 140,
    height: 45,
    marginTop: 20,
  },
  containerReclamos: {
    paddingBottom: 80, // Ajusta este valor según la altura de tu navbar
  },
  botonReclamo: {
    height: 150,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFD600",
    borderRadius: 10,
    marginTop: 10,
  },
});
export default MovimientosReclamos;
