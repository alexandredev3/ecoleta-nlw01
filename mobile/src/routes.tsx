import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// O react tem varios tipos de navegação, e essa e um tipo de navegação em pilha
// Com ele as telas anterios continua existindo, e o usuario pode voltar.

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();
// A partir de agora o "AppStack" ele que vai ficar responsavel pelo roteamento.

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator 
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#F0F0F5'
            // Todas as tela vão ter essa cor de background.
          }
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Points" component={Points} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
// NavigationContainer Ele define como nossas rotas vão se comportar.
// AppStack.Screen para cada tela vão ter um desse.
// headerMode="none" ele vai remover aquele Header padrão por completo.

export default Routes;