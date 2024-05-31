import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Registro from './src/pages/Registro';
import DashboardNeighbor from './src/pages/DashboardNeighbor';
import DashboardPersonal from './src/pages/DashboardPersonal';
import Navbar from './src/components/Navbar';
import PopupInfo from './src/components/PopupInfo';
import Menu from './src/pages/Menu';
import MenuReclamos from './src/pages/MenuReclamos';
import MenuServicios from './src/pages/MenuServicios';
import MenuDenuncias from './src/pages/MenuDenuncias';

function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Menu'>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Registro' component={Registro}/>
          <Stack.Screen name='DashboardNeighbor' component={DashboardNeighbor}/>
          <Stack.Screen name='DashboardPersonal' component={DashboardPersonal}/>
          <Stack.Screen name='PopupInfo' component={PopupInfo}/>

          <Stack.Screen name='Navbar' component={Navbar}/>

          <Stack.Screen name='Menu' component={Menu}/>

          <Stack.Screen name='MenuReclamos' component={MenuReclamos}/>
          <Stack.Screen name='MenuServicios' component={MenuServicios}/>
          <Stack.Screen name='MenuDenuncias' component={MenuDenuncias}/>

        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
