import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ipLocal } from '../global/ipLocal';

const CrearReclamo = () => {
  const [documentoVecino, setDocumentoVecino] = useState('');
  const [legajoPersonal, setLegajoPersonal] = useState('');
  const [calleSitio, setCalleSitio] = useState('');
  const [numeroSitio, setNumeroSitio] = useState('');
  const [idDesperfecto, setIdDesperfecto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [idReclamoUnificado, setIdReclamoUnificado] = useState('')
  const [isVisible, setIsVisible] = useState(false);

  const isFormComplete = (documentoVecino || legajoPersonal) && calleSitio && numeroSitio && idDesperfecto && descripcion;

  const handleSubmit = async () => {
    if (!isFormComplete) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const data = {documentoVecino, legajoPersonal, calleSitio, numeroSitio, idDesperfecto, descripcion, imagenes, idReclamoUnificado};

      const token = await AsyncStorage.getItem('token');
      console.log(data)

      const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/reclamos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   "Authorization": `Bearer ${token}`},
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      console.log(result);
      openModal();
      
    } catch (error) {
      console.error(error);
      alert('Error al crear el reclamo: ' + error.message);
    }
  };

  function openModal(){
    setIsVisible(true);
  }

  function closeModal(){
    setIsVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerDatos}>
        <Image style={styles.imagen} resizeMode="cover" source={('../../assets/BuenosAiresCiudad.png')} />
        
        <Text style={styles.enviarReclamo}>Crear Reclamo</Text>
        
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setDocumentoVecino}
          value={documentoVecino}
          inputMode='numeric'
          placeholder="Documento"
        />
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setLegajoPersonal}
          value={legajoPersonal}
          inputMode='numeric'
          placeholder="Legajo"
        />
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setCalleSitio}
          value={calleSitio}
          placeholder="Calle sitio"
        />

        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setNumeroSitio}
          value={numeroSitio}
          inputMode='numeric'
          placeholder="Numeración sitio"
        />

        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setIdDesperfecto}
          value={idDesperfecto}
          inputMode='numeric'
          placeholder="Desperfecto"
        />
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setIdReclamoUnificado}
          value={idReclamoUnificado}
          inputMode='numeric'
          placeholder="idReclamoUnificado"
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
          style={[styles.crearReclamoChild2]}
          onPress={() => console.log('Insertar imagen')}>
          <Text style={styles.archivo}>Insertar imagen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.crearReclamoChild, { backgroundColor: isFormComplete ? '#ffd600' : 'grey' }]}
          onPress={handleSubmit}
          disabled={!isFormComplete}>
          <Text style={styles.enviarReclamoButtonText}>Enviar Reclamo</Text>
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={true}
          visible={isVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Reclamo creado con éxito!</Text>
              <Text style={styles.text}>Gracias por enviar su reclamo.</Text>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text>Continuar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF',
  },
  containerDatos:{
    padding:20
  },
  imagen: {
    width: 140,
    height: 45,
    marginBottom: 20,
  },
  enviarReclamo: {
    fontSize: 25,
    marginBottom: 25,
    fontFamily: "Gotham Rounded",
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
      height: 4
    },
    shadowColor: "rgba(0, 0, 0, 0.25)"
  },
  textInput: {
    height: 40,
  },
  textArea: {
    height: 100,
  },
  archivo: {
    fontSize: 17,
    textAlign: "center",
    color: "#000",
    fontFamily: "Gotham Rounded"
  },
  crearReclamoChild2: {
    top: 670,
    borderRadius: 50,
    width: 148,
    left: 20,
    height: 37,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "rgba(255, 214, 0, 0.6)",
    position: "absolute",
    justifyContent: 'center',
    alignItems: 'center'
  },
  crearReclamoChild: {
    top: 690,
    left: 167,
    borderRadius: 5,
    width: 182,
    height: 38,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "rgba(255, 214, 0, 0.6)",
    position: "absolute",
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowColor: "rgba(0, 0, 0, 0.25)"
  },
  enviarReclamoButtonText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Gotham Rounded"
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
    marginLeft:20,
    marginRight:20,
    borderRadius:5,
    padding:15
  },
  modalTitle: {
    fontSize:20,
    textAlign:'center'
  },
  text: {
    fontSize:17,
    marginTop:25
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
    marginTop:20
  },
  navbar:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0
  }
});

export default CrearReclamo;