import React from 'react'
import { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

function NavbarPersonal({navigation}){
    const [isVisible, setIsVisible] = useState(false);

    function openModal(){
        setIsVisible(true);
    }

    function closeModal(){
        setIsVisible(false);
    }

    function redireccionar(){
        navigation.navigate('MenuPersonal')
    }

    return(
    <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
            <View>
                <Image style={styles.images} source={require('../../assets/Pregunta1.png')}/>
            </View>
        </TouchableOpacity>

        <Modal
            animationType='slide'
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                            <Text style={styles.modalTitle}>Centro de Ayuda para el Personal</Text>
                            <Text style={styles.text}>En esta sección, puedes encontrar la asistencia que necesitas:</Text>
                            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Botón de Reclamos:</Text> En esta session puedes generar reclamos relacionados a tu especialidad .</Text>
                            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Boton de Servicios:</Text> ¿Necesitas información sobre los servicios disponibles? Pulsalo para acceder al menú de servicios.</Text>
                            <Text style={styles.text}>Ante cualquier inconveniente sobre la app, puede comunicarse al Whatsapp "+54 9 239260-4922"</Text>
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Text style={styles.closeButtonText}>Volver</Text>
                            </TouchableOpacity>
                </View>
            </Modal>

            <TouchableOpacity onPress={redireccionar}>
                <View>
                    <Image style={styles.images} source={require('../../assets/ImagenCasa.png')} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { }}>
                <View>
                    <Image style={styles.images} source={require('../../assets/Perfil1.png')} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 30,
        paddingLeft: 30,
        backgroundColor: '#FFD600',
        height: 70,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    images: {
        width: 40,
        height: 40
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: '#FFD600',
        width: '90%',
        borderRadius: 5,
        maxHeight: '80%',
    },
    scrollContent: {
        padding: 15,
    },
    modalTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeButton: {
        height: 60, 
        marginVertical: 20,
        backgroundColor: '#FFD600',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20, 
    },
    closeButtonText: {
        fontSize: 20, 
        fontWeight: 'bold',
    },
});


export default NavbarPersonal;