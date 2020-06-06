import React from 'react';
import { AppLoading } from 'expo';
// AppLoading vai mostrar um sinal de carregamento na nossa aplicação.
import { StatusBar } from 'react-native';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
// Estou importando no app, porque eu quero que o app carregue depois das fonts.
// a useFonts so precisa ser importado uma das duas.

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })
  // fontsLoaded vai trazer a informação de quando a font foi carregada.

  if (!fontsLoaded) {
    // Se nossas fonts estiver carregando ele vai mostrar esse AppLoading
    return <AppLoading />
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}
// Eu não posso colocar 2 componentes um abaixo do outro.
// Preciso colocar uma View ou um Fragme por volta.
// backgroundColor so funciona no android