import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuInicio from './src/pages/MenuInicio';
import MenuNR from './src/pages/MenuNR'
import Login from './src/pages/Login';
import Registro from './src/pages/Registro';
import PaginaAcceso from './src/pages/PaginaAcceso';
import NavbarVecino from './src/components/NavbarVecino';
import NavbarPersonal from './src/components/NavbarPersonal';
import MenuPersonal from './src/pages/Personal/MenuPersonal';
import MenuServiciosPersonal from './src/pages/Personal/MenuServiciosPersonal';
import MenuVecino from './src/pages/Vecino/MenuVecino';
import MenuReclamos from './src/pages/MenuReclamos';
import MenuServiciosVecino from './src/pages/Vecino/MenuServiciosVecino';
import MenuDenuncias from './src/pages/Vecino/MenuDenuncias';
import ListaServicios from './src/components/ListaServicios';
import ListaReclamos from './src/components/ListaReclamos';
import ListaDenuncias from './src/components/ListaDenuncias';
import DetalleServicio from './src/pages/DetalleServicio';
import DetalleReclamo from './src/pages/DetalleReclamo';
import DetalleDenuncia from './src/pages/DetalleDenuncia';
import CrearReclamo from './src/pages/CrearReclamo';
import CrearServicio from './src/pages/Vecino/CrearServicio';
import CrearDenuncia from './src/pages/Vecino/CrearDenuncia';

function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>

        <Stack.Navigator initialRouteName='MenuInicio' screenOptions={{headerShown:false}}>
        <Stack.Screen name='MenuInicio' component={MenuInicio} />
        <Stack.Screen name='NavbarVecino' component={NavbarVecino}/>
        <Stack.Screen name='NavbarPersonal' component={NavbarPersonal}/>
        <Stack.Screen name='MenuNR' component={MenuNR} />
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Registro' component={Registro}/>
        <Stack.Screen name='PaginaAcceso' component={PaginaAcceso}/>
        <Stack.Screen name='MenuVecino' component={MenuVecino}/>
        <Stack.Screen name='MenuPersonal' component={MenuPersonal}/>
        <Stack.Screen name='MenuServiciosPersonal' component={MenuServiciosPersonal}/>

        <Stack.Screen name='ListaServicios' component={ListaServicios}/>
        <Stack.Screen name='DetalleServicio' component={DetalleServicio}/>

        <Stack.Screen name='ListaReclamos' component={ListaReclamos}/>
        <Stack.Screen name='DetalleReclamo' component={DetalleReclamo}/>

        <Stack.Screen name='ListaDenuncias' component={ListaDenuncias}/>
        <Stack.Screen name='DetalleDenuncia' component={DetalleDenuncia}/>

        <Stack.Screen name='MenuReclamos' component={MenuReclamos}/>
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
