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
    function detallePersonal(){
        navigation.navigate('DetallePersonal');
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
                    <Text style={styles.text}><Text style={{fontFamily:'GothamBook'}}>Botón de Mis Reclamos:</Text> En esta seccion puedes generar y visualizar reclamos relacionados a tu especialidad .</Text>
                    <Text style={styles.text}><Text style={{fontFamily:'GothamBook'}}>Botón de Reclamos:</Text> En esta seccion puedes visualizar todos los reclamos existentes.</Text>
                    <Text style={styles.text}><Text style={{fontFamily:'GothamBook'}}>Boton de Servicios:</Text> ¿Necesitas información sobre los servicios disponibles? Pulsalo para acceder al menú de servicios.</Text>
                    <Text style={styles.text}>Ante cualquier inconveniente sobre la app, puede comunicarse al Whatsapp "+54 9 239260-4922"</Text>
                </ScrollView>
                </View>
                    <TouchableOpacity style={{
                        width:300,
                        height:60,
                        margin:10,
                        backgroundColor: '#FFD600',
                        alignItems: 'center',
                        justifyContent:'center',
                        borderWidth:1,
                        borderRadius: 10,
                        marginTop:30
                        }} onPress={closeModal}>
                        <Text>Volver</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <TouchableOpacity onPress={redireccionar}>
                <View>
                    <Image style={styles.images} source={require('../../assets/ImagenCasa.png')} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={detallePersonal}>
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
    modalContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con 50% de opacidad
    },
    modalContent: {
        padding:20,
        backgroundColor: '#FFFF',
        borderWidth: 1.5,
        borderColor: '#FFD600',
        width: '90%',
        borderRadius: 5,
        maxHeight: '80%',
    },
    modalTitle:{
        fontSize:20,
        textAlign:'center',
        marginTop:20,
        fontFamily:'GothamBold'
    },
    text:{
        fontSize:17.5,
        marginTop:40,
        marginLeft:5,
        fontFamily:'GothamBook'
    },
});


export default NavbarPersonal;