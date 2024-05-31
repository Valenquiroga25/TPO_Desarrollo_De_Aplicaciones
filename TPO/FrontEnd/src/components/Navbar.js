import React from 'react'
import { useState } from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Modal} from 'react-native'

function Navbar({navigation}){
    const [isVisible, setIsVisible] = useState(false)
    return(
    <View style={styles.containar}>
        <TouchableOpacity onPress={() => (navigation.navigate('Info'))}>
            <View>
                <Image style={styles.images} source={require('../../assets/Pregunta1.png')}/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
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
    "containar":{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingRight:30,
        paddingLeft:30,
        backgroundColor: '#FFD600',
        height: 70,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    "images":{
        width:40,
        height:40
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
})


export default Navbar;