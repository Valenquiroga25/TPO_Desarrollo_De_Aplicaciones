import {React, useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { ipLocal } from '../global/ipLocal';

function ListaServiciosNR({navigation}) {
    const [listaServicios, setListaServicios] = useState([])

    useEffect(() => { // Se utiliza el useEffect con la lista de dependencias vacía ([]) para asegurar que la función se ejecuta cuando se monta el componente.
    
        async function showServicios(){

            const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/servicios/getAllServicios`,{
                method: 'GET',
                headers: {'Content-Type' : 'application/json'}
                })

            if(!response.ok){
            throw new Error(await response.text())
            }
        
            const servicios = await response.json();
            setListaServicios(servicios)
        }

        showServicios(); // Se llama a la función dentro del useEffect para que se ejecute al iniciar la página.
    }, []) 


    function redireccion(servicio){

        navigation.navigate('DetalleServicio', {
            idServicio: servicio.idServicio,
            titulo: servicio.titulo,
            direccion: servicio.direccion,
            telefono: servicio.telefono,
            tipoServicio: servicio.tipoServicio,
            rubro: servicio.rubro,
            descripcion: servicio.descripcion,
        });   
     }

     return (
    <ScrollView style={styles.containerServicios}>
        <View style={styles.container}>
            {listaServicios.map((servicio, indice) => (
                <TouchableOpacity key={indice} style={styles.botonServicio} onPress={() => redireccion(servicio)}>
                    <Text style={{fontFamily:'GothamBook'}}>{servicio.titulo}</Text>
                    <Text style={{fontFamily:'GothamBook'}}>Contacto: {servicio.telefono}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create(
    {
        containerServicios:{
            flex:1,
        },
        container:{
            padding:20
        },
        botonServicio:{
            height:70,
            backgroundColor: '#E6E6E6',
            alignItems: 'center',
            justifyContent:'center',
            borderWidth:1,
            borderColor:"#FFD600",
            borderRadius: 10,
            marginTop:10
        }
    }
)

export default ListaServiciosNR
