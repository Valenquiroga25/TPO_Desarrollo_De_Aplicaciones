import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuInicio from './src/pages/MenuInicio';
import MenuNR from './src/pages/MenuNR'
import Login from './src/pages/Login';
import Registro from './src/pages/Registro';
import PaginaAcceso from './src/pages/PaginaAcceso';
import MenuPersonal from './src/pages/Personal/MenuPersonal';
import Navbar from './src/components/Navbar';
import NavbarVecino from './src/components/NavbarVecino';
import NavbarPersonal from './src/components/NavbarPersonal';
import MenuVecino from './src/pages/Vecino/MenuVecino';
import CrearReclamo from './src/pages/Vecino/CrearReclamo';
import CrearServicio from './src/pages/Vecino/CrearServicio';
import CrearDenuncia from './src/pages/Vecino/CrearDenuncia';
import ListaServicios from './src/components/ListaServicios';
import MenuReclamosVecino from './src/pages/Vecino/MenuReclamosVecino';
import MenuServiciosVecino from './src/pages/Vecino/MenuServiciosVecino';
import MenuDenuncias from './src/pages/Vecino/MenuDenuncias';
import PaginaDetalleServicio from './src/pages/PaginaDetalleServicio';
import RecuperarContrasenia from './src/pages/RecuperarContrasenia';

function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>

        <Stack.Navigator initialRouteName='MenuInicio' screenOptions={{headerShown:false}}>
        <Stack.Screen name='MenuInicio' component={MenuInicio} />
        <Stack.Screen name='Navbar' component={Navbar}/>
        <Stack.Screen name='NavbarVecino' component={NavbarVecino}/>
        <Stack.Screen name='NavbarPersonal' component={NavbarPersonal}/>
        <Stack.Screen name='MenuNR' component={MenuNR} />
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Registro' component={Registro}/>
        <Stack.Screen name='RecuperarContrasenia' component={RecuperarContrasenia}/>
        <Stack.Screen name='PaginaAcceso' component={PaginaAcceso}/>
        <Stack.Screen name='MenuVecino' component={MenuVecino}/>
        <Stack.Screen name='MenuPersonal' component={MenuPersonal}/>

        <Stack.Screen name='ListaServicios' component={ListaServicios}/>
        <Stack.Screen name='PaginaDetalleServicio' component={PaginaDetalleServicio}/>

        <Stack.Screen name='MenuReclamosVecino' component={MenuReclamosVecino}/>
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
