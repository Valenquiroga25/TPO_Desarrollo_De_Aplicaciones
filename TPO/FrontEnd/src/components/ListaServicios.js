import {React, useState, useEffect} from 'react'
import { Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'

function ListaServicios({navigation}) {
    const [listaServicios, setListaServicios] = useState([])

    useEffect(() => { // Se utiliza el useEffect con la lista de dependencias vacía ([]) para asegurar que la función se ejecuta cuando se monta el componente.
    
        async function showServicios(){

            const response = await fetch('http://192.168.0.48:8080/tpo-desarrollo-mobile/servicios/getAllServicios',{
                method: 'GET',
                headers: {'Content-Type' : 'application/json'}
                })

            if(!response.ok){
            throw new Error(await response.text())
            }
        
            const servicios = await response.json();
            console.log(servicios)
            setListaServicios(servicios)
        }

        showServicios(); // Se llama a la función dentro del useEffect para que se ejecute al iniciar la página.
    }, []) 


    function redireccion(servicio){

        navigation.navigate('PaginaDetalleServicio', {
            titulo: servicio.titulo,
            direccion: servicio.direccion,
            telefono: servicio.telefono,
            rubro: servicio.rubro.descripcion,
            descripcion: servicio.descripcion,
            imagenes: servicio.imagenes
        });   
     }

     return (
    <ScrollView style={styles.containerServicios}>
        {listaServicios.map((servicio, indice) => (
            <TouchableOpacity key={indice} style={styles.botonServicio} onPress={() => redireccion(servicio)}>
                <Text>{servicio.titulo}</Text>
                <Text>Contacto: {servicio.telefono}</Text>
            </TouchableOpacity>
        ))}
        
    </ScrollView>
  )
}

const styles = StyleSheet.create(
    {
        containerServicios:{
            padding:10
        },
        botonServicio:{
            height:70,
            margin:10,
            backgroundColor: '#E6E6E6',
            alignItems: 'center',
            justifyContent:'center',
            borderWidth:1,
            borderColor:"#FFD600",
            borderRadius: 10,
            marginTop:130
        }
    }
)

export default ListaServicios
