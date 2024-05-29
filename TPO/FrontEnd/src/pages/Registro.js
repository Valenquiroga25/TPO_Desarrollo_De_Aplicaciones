import React from 'react'
import { Text, View} from 'react-native'

function Registro({route}) {
    const { otherParam } = route.params;

  return (
    <View>
      <Text>Hola Mundo!</Text>
      <Text>Titulo: {JSON.stringify(otherParam)}</Text>
    </View>
  );
}

export default Registro
