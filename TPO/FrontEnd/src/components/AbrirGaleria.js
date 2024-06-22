import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'

function AbrirGaleria({ onImageSelect }) {
  const [imageURL, setImageURL] = useState('https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D100064228323175&imgrefurl=https%3A%2F%2Fwww.facebook.com%2Fnaturalimagefacts%2F&docid=Xeb41mRrDpPOyM&tbnid=6NokVoxCuyL67M&vet=12ahUKEwj-kIS4t-2GAxVwpZUCHZB8AmEQM3oECGMQAA..i&w=1000&h=1000&hcb=2&ved=2ahUKEwj-kIS4t-2GAxVwpZUCHZB8AmEQM3oECGMQAA')
  
  async function abrirGaleria(){
    const result = await launchImageLibrary({      
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: false})
    const imageUri = result.assets[0].uri;
      setImageURL(imageUri);
      onImageSelect(imageUri);
  }

  return (
    <View>
        <Image 
        resizeMode='contain'
        source={{uri:imageURL}}/>

        <TouchableOpacity style={styles.boton} onPress={abrirGaleria}>
            <Text style={styles.text}>Insertar imagen</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  boton: {
    width:150,
    backgroundColor: '#FFD600',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth:1,
    borderRadius: 10,
  },
  text:{
    color:'black'
  }
})
export default AbrirGaleria
