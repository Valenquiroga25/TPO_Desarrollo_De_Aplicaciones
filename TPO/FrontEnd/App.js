import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'; // Importa expo-font
import MenuInicio from './src/pages/MenuInicio';
import MenuNR from './src/pages/MenuNR'
import Login from './src/pages/Login';
import Registro from './src/pages/Registro';
import PaginaAcceso from './src/pages/PaginaAcceso';
import NavbarVecino from './src/components/NavbarVecino';
import NavbarPersonal from './src/components/NavbarPersonal';
import MenuPersonal from './src/pages/Personal/MenuPersonal';
import MenuReclamosPersonal from './src/pages/Personal/MenuReclamosPersonal';
import MenuServiciosPersonal from './src/pages/Personal/MenuServiciosPersonal';
import MenuVecino from './src/pages/Vecino/MenuVecino';
import MenuReclamos from './src/pages/Vecino/MenuReclamos';
import MenuServiciosVecino from './src/pages/Vecino/MenuServiciosVecino';
import MenuDenuncias from './src/pages/Vecino/MenuDenuncias';
import ListaServiciosNR from './src/components/ListaServiciosNR';
import ListaServicios from './src/components/ListaServicios';
import ListaReclamosVecino from './src/components/ListaReclamosVecino'
import ListaDenuncias from './src/components/ListaDenuncias';
import DetalleServicio from './src/pages/DetalleServicio';
import DetalleReclamoVecino from './src/pages/Vecino/DetalleReclamoVecino';
import ListaReclamosPersonal from './src/components/ListaReclamosPersonal'
import DetalleReclamoPersonal from './src/pages/Personal/DetalleReclamoPersonal';
import DetalleDenuncia from './src/pages/Vecino/DetalleDenuncia';
import CrearReclamo from './src/pages/CrearReclamo';
import CrearServicio from './src/pages/Vecino/CrearServicio';
import CrearDenuncia from './src/pages/Vecino/CrearDenuncia';
import ListaReclamosAllVecinos from './src/components/ListaReclamosAllVecinos';
import MenuReclamosVecinosPersonal from './src/pages/Personal/MenuReclamosVecinosPersonal';
import RecuperarContrasenia from './src/pages/RecuperarContrasenia';
import EditarReclamo from './src/pages/EditarReclamo';

const loadFonts = async () => {
  await Font.loadAsync({
    'GothamBold': require('./assets/fonts/Gotham Rounded Bold.ttf'),
    'GothamBook': require('./assets/fonts/Gotham Rounded Book.otf'),
  });
};

function App() {

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    loadFonts(); // Llama a la función de carga de fuentes al inicio
  }, []);

  return (
      <NavigationContainer>

        <Stack.Navigator initialRouteName='MenuInicio' screenOptions={{headerShown:false}}>
        <Stack.Screen name='MenuInicio' component={MenuInicio} />
        <Stack.Screen name='NavbarVecino' component={NavbarVecino}/>
        <Stack.Screen name='NavbarPersonal' component={NavbarPersonal}/>
        <Stack.Screen name='MenuNR' component={MenuNR} />
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Registro' component={Registro}/>
        <Stack.Screen name='RecuperarContrasenia' component={RecuperarContrasenia}/>
        <Stack.Screen name='PaginaAcceso' component={PaginaAcceso}/>
        <Stack.Screen name='MenuVecino' component={MenuVecino}/>
        <Stack.Screen name='MenuPersonal' component={MenuPersonal}/>
        <Stack.Screen name='MenuReclamosPersonal' component={MenuReclamosPersonal}/>
        <Stack.Screen name='MenuServiciosPersonal' component={MenuServiciosPersonal}/>

        <Stack.Screen name='ListaServiciosNR' component={ListaServiciosNR}/>
        <Stack.Screen name='ListaServicios' component={ListaServicios}/>

        <Stack.Screen name='DetalleServicio' component={DetalleServicio}/>
        
        <Stack.Screen name='MenuReclamos' component={MenuReclamos}/>
        <Stack.Screen name='ListaReclamosVecino' component={ListaReclamosVecino}/>
        <Stack.Screen name='DetalleReclamoVecino' component={DetalleReclamoVecino}/>
        <Stack.Screen name='EditarReclamo' component={EditarReclamo}/>

        <Stack.Screen name='ListaReclamosPersonal' component={ListaReclamosPersonal}/>
        <Stack.Screen name='ListaReclamosAllVecinos' component={ListaReclamosAllVecinos}/>
        <Stack.Screen name='DetalleReclamoPersonal' component={DetalleReclamoPersonal}/>

        <Stack.Screen name='ListaDenuncias' component={ListaDenuncias}/>
        <Stack.Screen name='DetalleDenuncia' component={DetalleDenuncia}/>

        <Stack.Screen name='MenuReclamosVecinosPersonal' component={MenuReclamosVecinosPersonal}/>
        <Stack.Screen name='MenuServiciosVecino' component={MenuServiciosVecino}/>
        <Stack.Screen name='MenuDenuncias' component={MenuDenuncias}/>

        <Stack.Screen name='CrearReclamo' component={CrearReclamo}/>
        <Stack.Screen name='CrearServicio' component={CrearServicio}/>
        <Stack.Screen name='CrearDenuncia' component={CrearDenuncia}/>

        </Stack.Navigator>

      </NavigationContainer>
  );
}

export default App;
