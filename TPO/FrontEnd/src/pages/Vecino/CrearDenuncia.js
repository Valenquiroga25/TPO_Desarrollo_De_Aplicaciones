import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal } from "react-native";
import CheckBox from 'react-native-check-box'
import { ipLocal } from '../../global/ipLocal';
import AsyncStorage from "@react-native-async-storage/async-storage";

function CrearDenuncia({navigation}){
  const [documentoVecino, setDocumento] = useState('');
  const [calleSitio, setCalleSitio] = useState('');
  const [numeroSitio, setNumeroSitio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [aceptoResponsabilidad, setAceptoResponsabilidad] = useState(0);
  const [checked, setChecked] = useState(true);
  const isFormComplete = documentoVecino && calleSitio && numeroSitio && descripcion && aceptoResponsabilidad;

  const handleSubmit = async () => {
    if (!isFormComplete) {
      alert('Todos los campos son obligatorios y debes aceptar la declaración jurada');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token'); // Guardar el token en AsyncStorage como una cadena de texto

      const data = {documentoVecino, calleSitio, numeroSitio, descripcion, aceptoResponsabilidad};

      console.log(JSON.stringify(data))
      
      const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/denuncias/`, {
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
      alert('Error al crear la denuncia: ' + error.message);
    }
  };

  function openModal(){
    setIsVisible(true);
  }

  function closeModal(){
    setIsVisible(false);
  }

  function openPDF() {
    navigation.navigate('LeerPdf')
  }

  function handleResponsabilidad(){
    if(aceptoResponsabilidad === 0){
      setAceptoResponsabilidad(1);
      setChecked(true)
      console.log(aceptoResponsabilidad);
  }
    else{
      setAceptoResponsabilidad(0);
      setChecked(false);
      console.log(aceptoResponsabilidad);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerDatos}>
        <Image style={styles.imagen} resizeMode="cover" source={require('../../../assets/BuenosAiresCiudad.png')} />
        
        <Text style={styles.enviarDenuncia}>Crear Denuncia</Text>
        
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setDocumento}
          inputMode='numeric'
          value={documentoVecino}
          placeholder="Documento"
        />
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setCalleSitio}
          value={calleSitio}
          placeholder="Calle del Sitio"
        />
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setNumeroSitio}
          value={numeroSitio}
          placeholder="Número del Sitio"
        />
        <TextInput
          style={[styles.input, styles.textInput, styles.textArea]}
          placeholder="Descripción"
          onChangeText={setDescripcion}
          value={descripcion}
          multiline={true}
          numberOfLines={4} 
        />

        {/* Declaración jurada */}
        <View style={styles.declaracionContainer}>
          {checked ? 
          (<CheckBox
            value={aceptoResponsabilidad}
            onClick={handleResponsabilidad}
            style={styles.checkboxFalse}
          />)
        :
          (<CheckBox
          value={aceptoResponsabilidad}
          onClick={handleResponsabilidad}
          style={styles.checkboxTrue}
        />)}

          <Text style={styles.declaracionText}>
            Acepto en carácter de declaración jurada que lo indicado en el objeto de la denuncia y pruebas aportadas, en caso de falsedad, puede dar lugar a una acción judicial por parte del municipio y/o los denunciados.
          </Text>
        </View>

        {/* Enlace al PDF */}
        <TouchableOpacity onPress={openPDF}>
          <Text>Leer declaración jurada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.crearReclamoChild, { backgroundColor: isFormComplete ? '#ffd600' : 'lightgrey' }]}
          onPress={handleSubmit}
          disabled={!isFormComplete}>
          <Text style={styles.enviarReclamoButtonText}>Enviar Denuncia</Text>
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={true}
          visible={isVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Denuncia creada con éxito!</Text>
              <Text style={styles.text}>Te mantendremos al tanto ante cualquier noticia.</Text>
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
    flex:1,
    padding:20,
    marginTop:50
  },
  imagen: {
    width: 140,
    height: 45,
    marginBottom: 20,
  },
  enviarDenuncia: {
    fontSize: 18,
    marginBottom: 10,
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
    textAlignVertical: 'top',
  },
  archivo: {
    fontSize: 17,
    textAlign: "center",
    color: "#000",
    fontFamily: "Gotham Rounded"
  },
  crearReclamoChild2: {
    top: 630,
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
    top: 675,
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
  declaracionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxFalse: {
    alignSelf: 'center',
  },
  checkboxTrue:{
    backgroundColor:'#FFD600',
  },
  declaracionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: "Gotham Rounded",
  },
  pdfLink: {
    color: 'blue',
    fontSize: 14,
    fontFamily: "Gotham Rounded",
    textDecorationLine: 'underline',
    marginTop: 10,
  }
});

export default CrearDenuncia;
