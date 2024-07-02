import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Modal} from 'react-native';
import { ipLocal } from '../global/ipLocal';

const RecuperarContrasenia = ({navigation}) => {
    const [identificador, setIdentificador] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleSubmit = async () => {
        try {
            if (identificador === '')
                throw new Error('Complete el identificador');
            console.log(identificador);

            const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/usuarios/recuperarContrasenia/${identificador}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body:identificador
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }
            openModal()
            console.log("Contraseña eliminada, a reestablecer");

        } catch (error) {
            alert(error);
            console.error(error);
        }
    }

    const handleIdentificador = (text) => {
        setIdentificador(text);
    }

    
    function openModal(){
        setIsVisible(true);
    }

    function closeModal(){
        setIsVisible(false);
    }


    return (
        <SafeAreaView>
            <View style={styles.containerDatos}>
                <View style={styles.containerTitulo}>
                    <Text style={styles.titulo}>Recupere su Contraseña!</Text>
                </View>
                <Text style={styles.descripcion}>Bienvenido!! Ingrese su identificador para poder hacer el cambio de contraseña. En caso de no ser un vecino del 
                      municipio puede acercarse al municipio del barrio y hacer los trámites necesarios.</Text>
                <View style={{ backgroundColor: '#FFD600', marginTop: 50 }}>
                    <TextInput
                        inputMode='numeric'
                        style={styles.input}
                        placeholder='Identificador'
                        onChangeText={handleIdentificador}
                        value={identificador}
                    />
                </View>
                <TouchableOpacity onPress={handleSubmit}>
                    <View
                        title='Botón ingresar'
                        type='submit'
                        style={styles.button}>
                        <Text style={{fontFamily:'GothamBook'}}>Recuperar</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
            animationType='slide'
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
            >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Usted se encuentra registrado en el sistema!</Text>
                    <Text style={styles.text}>Revise su mail para obtener la nueva clave de acceso y haga el log con ella.</Text>
                </View>
                <View style={styles}>
                  <TouchableOpacity style={{
                          width:300,
                          height:60,
                          margin:10,
                          backgroundColor: '#FFD600',
                          alignItems: 'center',
                          justifyContent:'center',
                          borderWidth:1,
                          borderRadius: 10,
                          marginTop:80}} onPress={() => navigation.goBack()}>
                          <Text style={{fontFamily:'GothamBook'}}>Continuar</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    containerDatos: {
        marginTop: 140,
        padding: 20
    },
    containerTitulo: {
        alignItems: 'center'
    },
    titulo: {
        marginTop: 35,
        fontSize: 27,
        fontFamily:'GothamBold'
    },
    descripcion:{
        marginTop:20,
        fontSize: 16,
        color: '#666',
        textAlign: 'left', // Using left align as a fallback
        paddingHorizontal: 10,
        fontFamily:'GothamBook'
    },
    input: {
        padding: 10,
        margin: 7,
        height: 40,
        borderColor: "#FFFFFF",
        backgroundColor: '#FFFFFF',
        fontFamily:'GothamBook'
    },
    containerBoton: {
        marginTop: 55
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    button: {
        height: 60,
        margin: 10,
        backgroundColor: '#FFD600',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 50
    },
    modalContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con 50% de opacidad
    },
    modalContent:{
        backgroundColor:'#FFD600',
        height:150,
        marginLeft:20,
        marginRight:20,
        borderRadius:5,
        padding:15,
        height:230
    },
    modalTitle:{
        fontSize:20,
        textAlign:'center',
        marginTop:20
    },
    text:{
        fontSize:17,
        marginTop:40,
        marginLeft:5
    }
});

export default RecuperarContrasenia;
