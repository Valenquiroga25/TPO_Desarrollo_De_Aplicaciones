import React, { useState } from "react";
import {StyleSheet,View,Text,TextInput,TouchableOpacity,Image,Modal,FlatList,} from "react-native";
import { ipLocal } from "../../global/ipLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";

function EditarReclamoPersonal({ navigation, route }) {
  const {idReclamo, legajoReclamo, calleSitioReclamo, numeroSitioReclamo, estado, desperfectoReclamo, descripcionReclamo} = route.params;
  
  const [legajoPersonal, setLegajoPersonal] = useState(legajoReclamo);
  const [calleSitio, setCalleSitio] = useState(calleSitioReclamo);
  const [numeroSitio, setNumeroSitio] = useState(numeroSitioReclamo);
  const [idDesperfecto, setIdDesperfecto] = useState(null);
  const [descripcion, setDescripcion] = useState(descripcionReclamo);
  const [imagenes, setImagenes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const isFormComplete = calleSitio && numeroSitio && descripcion;

  const handleSubmit = async () => {
    if (!isFormComplete) {
      alert("Todos los campos son obligatorios");
      return;
    }
    try {
      const token = await AsyncStorage.getItem("token"); // Guardar el token en AsyncStorage como una cadena de texto

      const data = {
        legajoPersonal,
        calleSitio,
        numeroSitio,
        idDesperfecto,
        descripcion,
        imagenes
      };

      console.log(data)
      const response = await fetch(
        `http://${ipLocal}:8080/tpo-desarrollo-mobile/reclamos/${idReclamo}`,{
          method: 'PUT',
          headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,},
          body: JSON.stringify(data)
        }
      );

      const responseText = await response.text();
      console.log(responseText);

      if (!response.ok) {
        throw new Error(responseText);
      }

      openModal();
    } catch (error) {
      console.error(error);
      alert("Error al editar el reclamo: " + error.message);
    }
  };

  function openModal() {
    setIsVisible(true);
  }

  function closeModal() {
    setIsVisible(false);
    navigation.navigate("MenuPersonal");
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerDatos}>
        <Text style={styles.titulo}>Editar Reclamo</Text>

        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setCalleSitio}
          value={calleSitio}
          placeholder="Calle sitio"
        />

        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setNumeroSitio}
          value={numeroSitio.toString()}
          inputMode="numeric"
          placeholder="Numeración sitio"
        />

        <TextInput
          style={[styles.input, styles.textInput, styles.textArea]}
          placeholder="Descripción"
          onChangeText={setDescripcion}
          value={descripcion}
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity
          style={[
            styles.crearReclamoChild,
            { backgroundColor: isFormComplete ? "#ffd600" : "lightgrey" },
          ]}
          onPress={handleSubmit}
          disabled={!isFormComplete}
        >
          <Text style={styles.enviarReclamoButtonText}>Editar Reclamo</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Reclamo Editado con éxito!</Text>
              <Text style={styles.text}>Gracias por enviar su reclamo.</Text>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={{fontFamily:'GothamBook'}}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerDatos: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  titulo: {
    fontSize: 25,
    marginBottom: 25,
    fontFamily: "GothamBold",
  },
  containerAddImage: {
    width: 100,
    height: 100,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ffd600",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: "#fff",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    fontFamily: "GothamBook",
  },
  textInput: {
    height: 40,
    justifyContent: "center",
  },
  textArea: {
    height: 100,
    textAlign: "center",
  },
  crearReclamoChild: {
    top: 675,
    left: 167,
    borderRadius: 5,
    width: 182,
    height: 38,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "rgba(255, 214, 0, 0.6)",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  enviarReclamoButtonText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "GothamBook",
  },
  modalContainer: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con 80% de opacidad
  },
  modalContent: {
    backgroundColor:'#FFD600',
    height:150,
    marginLeft:15,
    marginRight:20,
    borderRadius:5,
    padding:15
  },
  modalTitle: {
    fontSize:20,
    textAlign:'center',
    fontFamily:'GothamBold'
  },
  text: {
    fontSize:17,
    marginTop:25,
    textAlign:'center',
    fontFamily:'GothamBook'
  },
  modalButton: {
    width:300,
    height:60,
    margin:10,
    backgroundColor: '#FFD600',
    alignItems: 'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius: 10,
    marginTop:20,
  },
});

export default EditarReclamoPersonal;
