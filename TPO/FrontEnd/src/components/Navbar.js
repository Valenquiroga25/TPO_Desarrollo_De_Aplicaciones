import React, {useState} from 'react'
import {View, Image, StyleSheet, TouchableOpacity, Modal, Text, Pressable} from 'react-native'

function Navbar(){
    const [modalVisible, setModalVisible] = useState(false);

    return(
    <View style={styles.containar}>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Hello World!</Text>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>

        <TouchableOpacity onPress={() => (setModalVisible(true))}>
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
    }
})


export default Navbar;