import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Modal } from "react-native";
import { ipLocal } from "../../global/ipLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeSearchBar } from "react-native-screens";

function EditarDenuncia({ navigation,route }) {
    const {idDenuncia,documento,calleSitioDenuncia, numeroSitioDenuncia, descripcionDenuncia, estado} = route.params;
    const [documentoVecino, setDocumento] = useState(documento);
    const [calleSitio, setCalleSitio] = useState(calleSitioDenuncia);
    const [numeroSitio, setNumeroSitio] = useState(numeroSitioDenuncia);
    const [descripcion, setDescripcion] = useState(descripcionDenuncia);
    const [isVisible, setIsVisible] = useState(false);
    const [aceptoResponsabilidad, setAceptoResponsabilidad] = useState(1);
    const isFormComplete = documentoVecino && calleSitio && numeroSitio && descripcion;

    const handleSubmit = async () => {
        if (!isFormComplete) {
            alert('Todos los campos son obligatorios');
            return;
        }
        try {
            const token = await AsyncStorage.getItem('token'); // Guardar el token en AsyncStorage como una cadena de texto

            const data = { documentoVecino, calleSitio, numeroSitio, descripcion, aceptoResponsabilidad };

            console.log(JSON.stringify(data))

            const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/denuncias/${idDenuncia}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
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

    function openModal() {
        setIsVisible(true);
    }

    function closeModal() {
        setIsVisible(false);
        navigation.navigate('MenuVecino');
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerDatos}>
                <Text style={styles.titulo}>Editar Denuncia</Text>
                <TextInput
                    style={[styles.input, styles.textInput]}
                    onChangeText={setCalleSitio}
                    value={calleSitio}
                    placeholder="Calle del Sitio"
                />
                <TextInput
                    style={[styles.input, styles.textInput]}
                    onChangeText={setNumeroSitio}
                    value={numeroSitio.toString()}
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
                <TouchableOpacity
                    style={[styles.crearDenunciaChild, { backgroundColor: isFormComplete ? '#ffd600' : 'lightgrey' }]}
                    onPress={handleSubmit}
                    disabled={!isFormComplete}>
                    <Text style={styles.enviarDenunciaButtonText}>Editar Denuncia</Text>
                </TouchableOpacity>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={isVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Denuncia actualizada con éxito!</Text>
                            <Text style={styles.text}>Te mantendremos al tanto ante cualquier noticia.</Text>
                        </View>
                        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                            <Text style={{fontFamily: "GothamBook"}}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    containerDatos: {
        flex: 1,
        padding: 20,
        marginTop: 50
    },
    imagen: {
        width: 140,
        height: 45,
        marginBottom: 20,
    },
    titulo: {
        fontSize: 25,
        marginBottom: 25,
        fontFamily: "GothamBold",
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
        shadowColor: "rgba(0, 0, 0, 0.25)",
        fontFamily: "GothamBook",

    },
    textInput: {
        height: 40,
    },
    textArea: {
        height: 100,
        fontFamily: "GothamBook",
        textAlign:'center'
    },
    crearDenunciaChild: {
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
    enviarDenunciaButtonText: {
        fontSize: 18,
        color: "#000",
        fontFamily: "GothamBook"
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con 80% de opacidad
    },
    modalContent: {
        backgroundColor: '#FFD600',
        height: 150,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        padding: 15
    },
    modalTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "GothamBold",
    },
    text: {
        fontSize: 17,
        marginTop: 25,
        fontFamily: "GothamBook",
    },
    modalButton: {
        width: 300,
        height: 60,
        margin: 10,
        backgroundColor: '#FFD600',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20
    },
});

export default EditarDenuncia;
