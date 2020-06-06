# Next Level Week #1 

- O expo google fonts, e uma forma de usar todas as fonts do google fonts no expo
sem instalar nada.

- expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto
  - depois do @expo-google-fonts/ e a font que vc quer instalar.

> yarn add @react-navigation/native

> expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

  - react-native-gesture-handler: Especifico para lidar com os gestos do usuario, arrasta a tela

  - react-native-reanimated: Lidar com animações.

  - react-native-screens: Lidar com diferentes telas.

  - react-native-safe-area-context: Limitar uma area segura para os gestos do usuario

  - react-native-community/masked-view: Colocar uma mascara na View

> yarn add @react-navigation/stack

* Todo o text no React Native Precisa esta dentro de uma tag text

- RectButton
  - Ele tem uma animação diferente em cada dispositivo.

- No Expo ja vem com os pacotes de icons instalados.

- {{}} a primeira chave quer dizer que eu quero colocar um codigo javascript e a 
segunda chave quer dizer que nos queremos colocar um objeto javascript.

> expo install react-native-maps
  - Vai nos permitir usar mapas no react native

> expo install expo-constants

> expo install react-native-svg
  - Como o react native por padrão não intende svg nos precisamos de instalar esse 
  depedencia.

  * Como nossas imagens esta rodando no localhost, o celular não tem acesso assim,
  então temos que ir la no servidor muda o ip das imagens, para o ip do expo.

  * Se você estiver usando o celular você vai conseguir acessar pelo ip que nos 
  passamos la no servidor, e no emulator do android tem alguns endereços que você
  pode usar

> yarn add axios

- No React Native ele tem uma necessidade de deixar a key como uma string
  
  key={String(item.id)}

> expo install expo-location
  - Ele vai dar toda a parte de geolocalização para nos.

  ````js
    <MapView 
      style={styles.map}
      loadingEnabled={initialPosition[0] === 0}
      // Ele vai mostrar aquela bolinha carregando, enquanto o initialPosition não tiver carregado ainda.
      // "0" porque quando o initialPosition for "0" e porque ele não carregou ainda
      initialRegion={{
        latitude: initialPosition[0],
        longitude: initialPosition[1],
        // Apenas coloque esses valores na sua aplicação, e muito complexo esse negocio
        latitudeDelta: 0.014,
        longitudeDelta: 0.014,
      }}
    >
  ````

  ````js
  interface Point {
    items: {
      // Quando e uma array, nos sibolizamos assim
      title: string,
    }[]
  }
  ````

  > expo install expo-mail-composer
    - Permite mandar emails no expo.

- Linking: Nos podemos fazer tanto para links externos como links interno.
como uma url

> react-native-picker-select
  - Ele vai permitir fazer um input do tipo select baseado no sistema operacional
  do celular do usuario.

- KeyboardAvoidingView: Quando vc clicar em um input de texto, o input vai pra cima

- Platform: Ele retorna qual sistema o usuario esta usando.

style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  - Nos estamos fazendo essa condicional no KeyboardAvoidingView, porque so o iso
  que precissa desse padding


