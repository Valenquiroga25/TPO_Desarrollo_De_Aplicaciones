import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal} from "react-native";
import NavbarVecino from '../../components/NavbarVecino';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import {launchImageLibrary} from 'react-native-image-picker'
import {Picker} from '@react-native-picker/picker'
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AbrirGaleria from "../../components/AbrirGaleria";

const CrearServicio = ({navigation}) => {
  const [titulo, setTitulo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [idRubro, setIdRubro] = useState('');
  const [tipoServicio, setTipoServicio] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  //cconst [selectImage, setSelectImage] = useState('')   
  const isFormComplete = titulo && direccion && telefono && descripcion && idRubro && tipoServicio;

  const handleSubmit = async (event) => {
    event.persist();
    if (!isFormComplete) {
      alert('Todos los campos son obligatorios');
      return;
    }
    
    try {
      const token = await AsyncStorage.getItem('token'); // Guardar el token en AsyncStorage como una cadena de texto
      const decodeToken = jwtDecode(token);
      const documentoVecino = decodeToken.sub
      
      const data = {documentoVecino, titulo, direccion, telefono, descripcion, idRubro, tipoServicio, imagenes};
      console.log(JSON.stringify(data))

      const response = await fetch('http://192.168.0.48:8080/tpo-desarrollo-mobile/servicios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   "Authorization": `Bearer ${token}`},
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const formData = new FormData();
      imagenes.forEach((imagen, index) => {
        formData.append('archivo', {
          uri: imagen,
          type: 'image/jpeg', // Asegúrate de que el tipo coincida con el tipo de imagen seleccionado
          name: `image${index}.jpg`
        });
      });

      //fetch de las imagenes
      const imageResponse = await fetch("http://192.168.0.48:8080/tpo-desarrollo-mobile/imagenes", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      if (!imageResponse.ok) {
          throw new Error(await imageResponpse.text())
      }
      console.log("Reclamo Creado!");

      const result = await response.json();
      console.log(result);
      openModal();
    } catch (error) {
      console.error(error);
      alert('Error al crear el servicio: ' + error.message);
    }
  };

  const handleImageSelect = (uri) => {
    setImagenes([...imagenes, uri]);
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
        
        <Text style={styles.enviarReclamo}>Crear Servicio</Text>
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setTitulo}
          value={titulo}
          placeholder="Titulo"
        />
        <TextInput
          style={[styles.input, styles.textInput]}
          onChangeText={setDireccion}
          value={direccion}
          placeholder="Dirección"
        />
        
        <View style={[styles.input, styles.pickerContainer]}>
          <Picker
              selectedValue={tipoServicio}
              onValueChange={(itemValue) => setTipoServicio(itemValue)}
              style={styles.picker}
          >
          <Picker.Item label="Seleccione el tipo de servicio" value="" />
          <Picker.Item label="Comercio" value="Comercio" />
          <Picker.Item label="Servicio profesional" value="Servicio profesional" />
          </Picker>
        </View>
        
        <TextInput
          style={[styles.input, styles.textInput]}
          inputMode='numeric'
          onChangeText={setTelefono}
          value={telefono}
          placeholder="Teléfono"
        />

        <TextInput 
          style={[styles.input, styles.textInput]}
          onChangeText={setIdRubro}
          value={idRubro}
          inputMode='numeric'
          placeholder="Rubro"/>

        <TextInput
          style={[styles.input, styles.textInput, styles.textArea]}
          placeholder="Descripción"
          onChangeText={setDescripcion}
          value={descripcion}
          multiline={true}
          numberOfLines={4} 
        />

        <AbrirGaleria onImageSelect={handleImageSelect}/>

        <TouchableOpacity
          style={[styles.crearReclamoChild, { backgroundColor: isFormComplete ? '#ffd600' : 'grey' }]}
          onPress={handleSubmit}
          disabled={!isFormComplete}>
          <Text style={styles.enviarReclamoButtonText}>Publicar Servicio</Text>
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={true}
          visible={isVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Servicio creado con éxito!</Text>
              <Text style={styles.text}>Gracias por enviar su servicio. Lo publicaremos en el menu de Servicios! </Text>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={() => navigation.goBack()}>
              <Text>Continuar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>

      <HideWithKeyboard style={styles.navbar}>
        <NavbarVecino navigation={navigation}/>
      </HideWithKeyboard>    
      </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  containerDatos:{
    flex:1,
    backgroundColor:'#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  imagen: {
    width: 140,
    height: 45,
    marginBottom: 20,
  },
  enviarReclamo: {
    fontSize: 22,
    marginBottom: 10,
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
    textAlign: 'center',
  },
  archivo: {
    fontSize: 17,
    textAlign: "center",
    color: "#000",
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
  },
  picker: {
    height: 50,
    width: 340,
  },
  pickerContainer:{
    justifyContent:'center',
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

export default CrearServicio;
