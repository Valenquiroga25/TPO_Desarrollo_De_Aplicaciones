import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal } from "react-native";
import Navbar from '../../components/Navbar';
import CheckBox from 'react-native-check-box'
import { ipLocal } from '../../global/ipLocal';

function CrearDenuncia({navigation}){
  
  const [nombreSitio, setNombreSitio] = useState('');
  const [documento, setDocumento] = useState('');
  const [textoExplicativo, setTextoExplicativo] = useState('');
  const [Estado, setEstado] = useState('');
  const [imagen, setImagen] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [aceptoDeclaracion, setAceptoDeclaracion] = useState(false);

  const isFormComplete = nombreSitio && documento && Estado && textoExplicativo && aceptoDeclaracion;

  const handleSubmit = async () => {
    if (!isFormComplete) {
      alert('Todos los campos son obligatorios y debes aceptar la declaración jurada');
      return;
    }

    try {
      const data = {
        documentoVecino: documento, 
        idSitio: nombreSitio,
        descripcion: textoExplicativo,
        idReclamoUnificado: Estado,
        imagenes: imagen ? [imagen] : []
      };

      const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/reclamos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  return (
    <View style={styles.container}>
      <View style={styles.containerDatos}>
        <Image style={styles.imagen} resizeMode="cover" source={require('../../../assets/BuenosAiresCiudad.png')} />
        
        <Text style={styles.enviarDenuncia}>Crear Denuncia</Text>
        
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setDocumento}
          value={documento}
          placeholder="Documento"
        />
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setNombreSitio}
          value={nombreSitio}
          placeholder="Nombre Sitio"
        />
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setEstado}
          value={Estado}
          placeholder="Estado"
        />
        <TextInput
          style={[styles.input, styles.textInput, styles.textArea]}
          placeholder="Texto explicativo"
          onChangeText={setTextoExplicativo}
          value={textoExplicativo}
          multiline={true}
          numberOfLines={4} 
        />

        {/* Declaración jurada */}
        <View style={styles.declaracionContainer}>
          <CheckBox
            value={aceptoDeclaracion}
            onValueChange={setAceptoDeclaracion}
            style={styles.checkbox}
          />
          <Text style={styles.declaracionText}>
            Acepto en carácter de declaración jurada que lo indicado en el objeto de la denuncia y pruebas aportadas, en caso de falsedad, puede dar lugar a una acción judicial por parte del municipio y/o los denunciados.
          </Text>
        </View>

        {/* Enlace al PDF */}
        <TouchableOpacity onPress={openPDF}>
          <Text>Leer declaración jurada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.crearReclamoChild, { backgroundColor: isFormComplete ? '#ffd600' : 'grey' }]}
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

      <Navbar />
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
  checkbox: {
    alignSelf: 'center',
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
