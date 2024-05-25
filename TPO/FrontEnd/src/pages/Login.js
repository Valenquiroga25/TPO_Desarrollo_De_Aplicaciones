import * as React from 'react';
import { Text, View, Button } from 'react-native-web';

export default function Login({navigation}){
    return(
        <View>
            <Text>Bienvenido a la aplicación del municipio. Ingrese sus datos!</Text>
            <Button title='Ingresar'
            onPress={() => {
                navigation.navigate('PaginaVecino')
            }}/>
        </View>
    );
}
