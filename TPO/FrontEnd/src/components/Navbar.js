import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'

function Navbar(){
    return(
    <View style={styles.containar}>
        <TouchableOpacity onPress={() => {}}>
            <View>
                <Image style={styles.images} source={require('../../assets/ImagenCasa.png')}/>
            </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {}}>
            <View>
                <Image style={styles.images} source={require('../../assets/ImagenCasa.png')}/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
            <View>
                <Image style={styles.images} source={require('../../assets/ImagenCasa.png')}/>
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
        width:50,
        height:50
    }
})

export default Navbar;