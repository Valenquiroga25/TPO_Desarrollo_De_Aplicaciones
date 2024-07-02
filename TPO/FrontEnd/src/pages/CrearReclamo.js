import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal, FlatList } from "react-native";
import {Picker} from '@react-native-picker/picker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ipLocal } from '../global/ipLocal';
import {jwtDecode} from 'jwt-decode';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";
import NetInfo from "@react-native-community/netinfo";

const CrearReclamo = ({navigation}) => {
  const [documentoVecino, setDocumentoVecino] = useState('');
  const [legajoPersonal, setLegajoPersonal] = useState('');
  const [calleSitio, setCalleSitio] = useState('');
  const [numeroSitio, setNumeroSitio] = useState('');
  const [idDesperfecto, setIdDesperfecto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
	const [isConnected, setConnected] = useState(true);

  const isFormComplete = (documentoVecino || legajoPersonal) && calleSitio && numeroSitio && idDesperfecto && descripcion;

  const handleSubmit = async () => {
    if (!isFormComplete) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const unsuscribe = NetInfo.addEventListener((state) => { // Verificamos si estamos conectados a WIFI.
      setConnected(state.isConnected)
      console.log(isConnected)
    })

    if(!unsuscribe){
      
    }

    try {
      const data = {documentoVecino, legajoPersonal, calleSitio, numeroSitio, idDesperfecto, descripcion};

      const token = await AsyncStorage.getItem('token');
      const decodeToken = jwtDecode(token);

      if(decodeToken.rol === 'Inspector'){
        if(documentoVecino){
          alert('El inspector no puede indicar un documento de vecino!');
          return;
        }
      }else{
        if(legajoPersonal){
          alert('El vecino no puede indicar un legajo de personal!');
          return;
        }
      }

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
      const idReclamo = result.idReclamo 

      for(const imagen of imagenes){
        const formData = new FormData();

        const fileInfo = await FileSystem.getInfoAsync(imagen)
        const fileUri = fileInfo.uri
        const fileName = fileUri.substring(fileUri.lastIndexOf("/") + 1);
        const fileType = fileUri.substring(fileUri.lastIndexOf(".") + 1)
  
        formData.append('archivo', {uri: fileUri, name: fileName, type: `image/${fileType}`});
        formData.append('idReclamo', idReclamo.toString());
        
        console.log("FormData content:", JSON.stringify(formData._parts));
  
        //fetch de las imagenes
        const imageResponse = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/imagenes/reclamo/`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}`},
          body: formData
        });
        
        if (!imageResponse.ok) {
          const message = await imageResponse.text()
          throw new Error(message)
        }
      }

      console.log("Reclamo Creado!");
      openModal();

    } catch (error) {
      console.error(error);
      alert('Error al crear el reclamo: ' + error.message);
    }
  };

  const abrirGaleria = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });

    if (!result.canceled){
      const newImage = result.assets[0].uri;
      console.log("Nueva imagen seleccionada:", newImage);
      setImagenes((imagenesPrevias) => [...imagenesPrevias, newImage]);
    }
  }

  const abrirGaleria2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });

    if (!result.canceled){
      const newImage = result.assets[0].uri;
      imagenes.pop()
      setImagenes((imagenesPrevias) => [...imagenesPrevias, newImage]);
    }
  }

  function openModal(){
    setIsVisible(true);
  }

  async function closeModal(){
    setIsVisible(false);
    const token = await AsyncStorage.getItem('token');
    const decodeToken = jwtDecode(token);
    if(decodeToken.rol === "Vecino")
      navigation.navigate('MenuVecino')
    else
    navigation.navigate('MenuPersonal')

  }

  return (
    <View style={styles.container}>
      <Image style={styles.imagenLogo} resizeMode="contain" source={require('../../assets/BuenosAiresCiudad.png')} />
      <View style={styles.containerDatos}>
        <Text style={styles.titulo}>Crear Reclamo</Text>
        
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


        <View style={[styles.input, styles.pickerContainer]}>
          <Picker
              selectedValue={idDesperfecto}
              onValueChange={(itemValue) => setIdDesperfecto(itemValue)}
              style={styles.picker}
          >
          <Picker.Item label="Desperfecto" value="" />
          <Picker.Item label="Fuga de agua en la tuberia principal" value="1" />
          <Picker.Item label="Corte de energia en zona norte" value="2" />
          <Picker.Item label="Obstrucción en el sistema de alcantarillado" value="3" />
          <Picker.Item label="Pérdida de señal en el servicio de internet" value="4" />
          <Picker.Item label="Desperfecto en el semáforo de la avenida principal" value="5" />
          <Picker.Item label="Baches en la carretera" value="6" />
          <Picker.Item label="Mal funcionamiento del sistema de calefacción" value="7" />
          <Picker.Item label="Ruidos extraños provenientes del transformador eléctrico" value="8" />
          <Picker.Item label="Rotura de vidrios en la entrada del edificio" value="9" />
          <Picker.Item label="Problemas con la presión del agua en el piso superior" value="10" />
          </Picker>
        </View>

        <TextInput
          style={[styles.input, styles.textInput, styles.textArea]}
          placeholder="Descripción"
          onChangeText={setDescripcion}
          value={descripcion}
          multiline={true}
          numberOfLines={4} 
        />
        <FlatList
        data={imagenes}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        scrollEventThrottle={16}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          return (
            <View>
              <TouchableOpacity onPress={abrirGaleria2}>
                <Image
                  key={index}
                  source={{ uri: item }}
                  style={styles.imagen}
                />
              </TouchableOpacity>
            </View>
          )
        }} />
        
        <TouchableOpacity style={styles.containerAddImage} onPress={abrirGaleria}>
          <Image style={styles.addImagen} resizeMode="contain" source={require('../../assets/addImage.jpg')}></Image>
        </TouchableOpacity>
      

        <TouchableOpacity
          style={[styles.crearReclamoChild, { backgroundColor: isFormComplete ? '#ffd600' : 'lightgrey' }]}
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
    flex:1,
    paddingHorizontal: 20,
    paddingTop: 30,
    marginTop:80
  },
  imagenesContainer:{
    marginTop:60,
    marginLeft:10
  },
  imagenLogo: {
    position:'absolute',
    top:50,
    left:20,
    width: 100,
    height: 45,
  },
  imagen:{
    width: 100,
    height: 100,
    borderRadius: 5,
    marginLeft: 10
  },
  containerAddImage:{
    width:100,
    height:100
  },
  addImagen:{
    position:'absolute',
    left:10,
    bottom:30,
    width:92,
    height:92,
  },
  titulo: {
    fontSize: 22,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ffd600",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 27,
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
  inputDescripcion:{
    height: 40,
    borderWidth: 1,
    borderColor: "#ffd600",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
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

  crearReclamoChild: {
    top: 666,
    left: 180,
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
    height:200,
    marginLeft:17,
    marginRight:20,
    borderRadius:5,
    padding:15,
  },
  modalTitle: {
    fontSize:20,
    textAlign:'center'
  },
  text: {
    fontSize:17,
    marginTop:50,
    textAlign:'center'
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