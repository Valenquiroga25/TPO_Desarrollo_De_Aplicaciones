import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal, Picker } from "react-native";
import Navbar from '../../components/Navbar';

const CrearServicio = () => {
  const [nombreServicio, setNombreServicio] = useState('');
  const [direccion, setDireccion] = useState('');
  const [textoExplicativo, setTextoExplicativo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [horarios, setHorarios] = useState('');
  const [tipoServicio, setTipoServicio] = useState('');
  const [imagen, setImagen] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const isFormComplete = nombreServicio && direccion && telefono && horarios && tipoServicio && textoExplicativo;

  const handleSubmit = async () => {
    if (!isFormComplete) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const data = {
        documentoVecino: direccion, 
        legajoPersonal: horarios, 
        idSitio: nombreServicio,
        idDesperfecto: tipoServicio,
        descripcion: textoExplicativo,
        idReclamoUnificado: telefono,
        imagenes: imagen ? [imagen] : []
      };

      const response = await fetch('http://192.168.0.199:8080/tpo-desarrollo-mobile/servicios/', {
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
      alert('Error al crear el servicio: ' + error.message);
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
      <Image style={styles.imagen} resizeMode="cover" source={('../../assets/BuenosAiresCiudad.png')} />
      
      <Text style={styles.enviarReclamo}>Crear Servicio</Text>
      <TextInput
        style={[styles.input, styles.textInput]}
        onChangeText={setNombreServicio}
        value={nombreServicio}
        placeholder="Nombre del Servicio"
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
        <Picker.Item label="Comercio" value="comercio" />
        <Picker.Item label="Servicio Profesional" value="servicio profesional" />
        </Picker>
      </View>
      
      <TextInput
        style={[styles.input, styles.textInput]}
        onChangeText={setTelefono}
        value={telefono}
        placeholder="Teléfono"
      />
      <TextInput
        style={[styles.input, styles.textInput]}
        onChangeText={setHorarios}
        value={horarios}
        placeholder="Horarios"
      />
      <TextInput
        style={[styles.input, styles.textInput, styles.textArea]}
        placeholder="Cuentanos sobre tu servicio!"
        onChangeText={setTextoExplicativo}
        value={textoExplicativo}
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
          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text>Continuar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
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
  picker: {
    height: 50,
    width: 340,
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
  }
});

export default CrearServicio;
