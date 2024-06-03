import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Registro from './src/pages/Registro';
import DashboardAcceso from './src/pages/DashboardAcceso';
import DashboardNeighbor from './src/pages/DashboardNeighbor';
import DashboardPersonal from './src/pages/DashboardPersonal';
import Navbar from './src/components/Navbar';
import Info from './src/components/Info';
import Menu from './src/pages/Menu';
import MenuReclamos from './src/pages/MenuReclamos';
import MenuServicios from './src/pages/MenuServicios';
import MenuDenuncias from './src/pages/MenuDenuncias';

function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='DashboardAcceso' component={DashboardAcceso}/>
          <Stack.Screen name='Registro' component={Registro}/>
          <Stack.Screen name='DashboardNeighbor' component={DashboardNeighbor}/>
          <Stack.Screen name='DashboardPersonal' component={DashboardPersonal}/>
          <Stack.Screen name='Info' component={Info}/>

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
