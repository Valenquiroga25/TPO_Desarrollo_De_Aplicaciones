import React from 'react'
import { useState } from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, Modal} from 'react-native'

function NavbarVecino({navigation}){
    const [isVisible, setIsVisible] = useState(false);

    function openModal(){
        setIsVisible(true);
    }

    function closeModal(){
        setIsVisible(false);
    }

    function redireccionar(){
        navigation.navigate('MenuVecino')
    }

    return(
    <View style={styles.containar}>
        <TouchableOpacity onPress={openModal}>
            <View>
                <Image style={styles.images} source={require('../../assets/Pregunta1.png')}/>
            </View>
        </TouchableOpacity>

        <Modal
            animationType='slide'
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
            >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Centro de ayuda</Text>
                    <Text style={styles.text}>Botón de reclamos: al pulsarlo te redirige al menú de reclamos.</Text>
                    <Text style={styles.text}>Botón de servicios: al pulsarlo te redirige al menú de servicios.</Text>
                    <Text style={styles.text}>Botón de denuncias: al pulsarlo te redirige al menú de denuncias.</Text>
                    <TouchableOpacity style={{
                        height:60,
                        margin:10,
                        backgroundColor: '#FFD600',
                        alignItems: 'center',
                        justifyContent:'center',
                        borderWidth:1,
                        borderRadius: 10,
                        marginTop:80}} onPress={closeModal}>
                        <Text>Volver</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

        <TouchableOpacity onPress={() => {redireccionar()}}>
            <View>
                <Image style={styles.images} source={require('../../assets/ImagenCasa.png')}/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
            <View>
                <Image style={styles.images} source={require('../../assets/Perfil1.png')}/>
            </View>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    containar:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:30,
        paddingLeft:30,
        backgroundColor: '#FFD600',
        height: 70,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    images:{
        width:40,
        height:40
    },
    modalContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con 50% de opacidad
    },
    modalContent:{
        backgroundColor:'#FFD600',
        height:300,
        marginLeft:20,
        marginRight:20,
        borderRadius:5,
        padding:15
    },
    modalTitle:{
        fontSize:20,
        textAlign:'center'
    },
    text:{
        fontSize:17,
        marginTop:25
    }
})


export default NavbarVecino;