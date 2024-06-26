// import React, { useState } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
// import { ipLocal } from '../global/ipLocal';

// const RecuperarContrasenia = () => {
//   const [identificador, setIdentificador] = useState('');
//   const handleSubmit = async () => {
//     try {
//       if (identificador === '')
//         throw new Error('Complete el identificador');
//       console.log(identificador);
  
//       const response = await fetch(`http://${ipLocal}:8080/tpo-desarrollo-mobile/usuarios/recuperarContrasenia/${identificador}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: identificador  // Aquí está el problema
//       });
  
//       if (!response.ok) {
//         throw new Error(await response.text());
//       }
//       console.log("Contraseña restablecida");
      
//     } catch (error) {
//       alert(error);
//       console.error(error);
//     }
//   }
  
//   function handleIdentificador(event) {
//     setIdentificador(event);
//   }

//   return (
//     <SafeAreaView>
//       <View style={styles.containerDatos}>
//         <View style={styles.containerTitulo}>
//           <Text style={styles.titulo}>Recuperar Contraseña</Text>
//         </View>
//         <View style={{ backgroundColor: '#FFD600', marginTop: 50 }}>
//           <TextInput
//             inputMode='numeric'
//             style={styles.input}
//             placeholder='Identificador'
//             onChangeText={handleIdentificador}
//             value={identificador}
//           />
//         </View>
//         <TouchableOpacity onPress={handleSubmit}>
//           <View
//             title='Botón ingresar'
//             type='submit'
//             style={styles.button}>
//             <Text>Recuperar</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   imagen: {
//     position: 'absolute',
//     top: 50,
//     right: 107,
//     width: 150,
//     height: 65,
//     marginRight: 25,
//     marginTop: 15
//   },
//   containerDatos: {
//     marginTop: 140,
//     padding: 20
//   },
//   containerTitulo: {
//     alignItems: 'center'
//   },
//   titulo: {
//     marginTop: 35,
//     fontSize: 30,
//     fontWeight: 'bold'
//   },
//   input: {
//     padding: 10,
//     margin: 7,
//     height: 40,
//     borderColor: "#FFFFFF",
//     backgroundColor: '#FFFFFF'
//   },
//   containerBoton: {
//     marginTop: 55
//   },
//   navbar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0
//   },
//   button: {
//     height: 60,
//     margin: 10,
//     backgroundColor: '#FFD600',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderRadius: 10,
//     marginTop: 50
//   }
// });

// export default RecuperarContrasenia;
