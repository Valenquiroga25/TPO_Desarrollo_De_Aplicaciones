import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import Registro from './src/pages/Registro';
import DashboardNeighbor from './src/pages/DashboardNeighbor';
import DashboardPersonal from './src/pages/DashboardPersonal';
import Navbar from './src/components/Navbar';
import PopupInfo from './src/components/PopupInfo';


function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Registro' component={Registro}/>
          <Stack.Screen name='DashboardNeighbor' component={DashboardNeighbor}/>
          <Stack.Screen name='DashboardPersonal' component={DashboardPersonal}/>
          <Stack.Screen name='PopupInfo' component={PopupInfo}/>

          <Stack.Screen name='Navbar' component={Navbar}/>

        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
