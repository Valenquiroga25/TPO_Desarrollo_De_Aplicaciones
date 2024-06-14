import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'

function MenuInicio({navigation}) {
    return(
    <View style={styles.container}>
        <View style={styles.datosContainer}>
            <View style={{alignItems:'center'}}>
                <Image style={styles.imagenLogo} source={require('../../assets/BuenosAires.png')}/>
            </View>

            <View style={styles.imageContainer}>
                <Image style={styles.dengueImage} resizeMode='contain' source={require('../../assets/dengue.png')} />
            </View>

            <View style={styles.botonesContainer}>
                <View style={styles.buttonWrapper}>
                <TouchableOpacity style={{
                    height:80,
                    margin:30,
                    backgroundColor: '#FFD600',
                    alignItems: 'center',
                    justifyContent:'center',
                    borderWidth:1,
                    borderRadius: 20,
                    marginTop:50
                }} onPress={() => navigation.navigate('MenuNR')}>
                    <Text style={styles.buttonText}>Servicios</Text>
                </TouchableOpacity>
                </View>
                
                <Text style={{textAlign:'center', marginTop:70}}>No tienes una cuenta?</Text>
                <View style={styles.buttonWrapper}>
                <TouchableOpacity style={{
                    height:50,
                    margin:30,
                    backgroundColor: '#E6E6E6',
                    alignItems: 'center',
                    justifyContent:'center',
                    borderWidth:1,
                    borderRadius: 20,
                    marginTop:20
                }}  onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View> 

    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    datosContainer:{
        marginTop:20
    },
    imagenLogo:{
        position:'absolute',
        top:50,
        right:107,
        width:150,
        height:65,
        marginRight:25,
        marginTop:15
      },
      dengueImage: {
        width: '100%',
        height: 200,
        marginTop: 170,
    },
    botonesContainer:{
        marginTop:30
    }
})

export default MenuInicio
