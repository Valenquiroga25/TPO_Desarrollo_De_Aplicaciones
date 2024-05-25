import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/pages/Login';
import Registro from './src/pages/Registro';
import PaginaNoRegistrados from './src/pages/PaginaNoRegistrado';
import PaginaVecinos from './src/pages/PaginaVecino';
import PaginaPersonal from './src/pages/PaginaPersonal';
import Error404 from './src/pages/Error404';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{title:'Login'}}/>
        <Stack.Screen name='Registro' component={Registro}/>
        <Stack.Screen name='PaginaNoRegistrado' component={PaginaNoRegistrados}/>
        <Stack.Screen name='PaginaVecino' component={PaginaVecinos}/>
        <Stack.Screen name='PaginaPersonal' component={PaginaPersonal}/>
        <Stack.Screen name='Error404' component={Error404}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;