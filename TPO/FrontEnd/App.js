import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/pages/Login';
import Registro from './src/pages/Registro';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


function App() {
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Registro' component={Registro}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
