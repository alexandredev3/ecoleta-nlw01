import React, { useEffect, useState, ChangeEvent } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { Feather as ArrowDown } from '@expo/vector-icons';
import { View, Text, ImageBackground, Image, StyleSheet, LayoutChangeEvent } from 'react-native';
// ImageBackground: E uma view, So que ele aceita uma imagem.
import { RectButton } from 'react-native-gesture-handler';
// RectButton: e um butão regular.
import { useNavigation } from '@react-navigation/native';
// Permiti nos fazer a transição de telas.
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUfResponse {
  sigla: string;
};

interface IBGECityResponse {
  nome: string;
};

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    };

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityName = response.data.map(city => city.nome);

        setCities(cityName);
      });

  }, [selectedUf]);

  function handleNavigatePoints() {
    navigation.navigate('Points', {
      selectedUf,
      selectedCity
    });
    // temos que passar o nome da tela que nos colocamos la no Routes.
  }

  function handleSelectUf(value: ChangeEvent<Element>) {
    const uf = value;

    setSelectedUf(String(uf));
  }

  function handleSelectCity(value: ChangeEvent<Element>) {
    const city = value;
    
    setSelectedCity(String(city));
  }

  return (
    <ImageBackground 
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }} // esse estilo so vai pegar na imagem.
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <View>
        <View>
          <RNPickerSelect
            value={selectedUf}
            onValueChange={handleSelectUf}
            placeholder={{
              label: 'Selecione o estado',
            }}
            Icon={() => (
              <ArrowDown name="chevron-down" size={24} color="#b4b4c2" />
            )}
            items={ufs.map(uf => {
              return (
                { label: uf, value: uf, color: '#5e5e63' }
              );
            })}
            style={{
              viewContainer: {
                borderRadius: 10,
                marginBottom: 7,
                overflow: 'hidden',
                borderColor: '#fff'
              },
              inputAndroid: {
                backgroundColor: '#ffff',
                color: '#94949c',
                height: 60,
              },
              iconContainer: {
                top: 20,
                right: 14,
              }
            }}
          />
          <RNPickerSelect
            value={selectedCity}
            onValueChange={handleSelectCity}
            placeholder={{
              label: 'Selecione a cidade'
            }}
            Icon={() => (
              <ArrowDown name="chevron-down" size={24} color="#b4b4c2" />
            )}
            items={cities.map(city => {
              return (
                { label: city, value: city }
              );
            })}
            style={{
              viewContainer: {
                borderRadius: 10,
                overflow: 'hidden',
                borderColor: '#fff'
              },
              inputAndroid: {
                backgroundColor: '#ffff',
                color: '#94949c',
                height: 60,
              },
              iconContainer: {
                top: 20,
                right: 14,
              }
            }}
          />
        </View>
        <RectButton style={styles.button} onPress={handleNavigatePoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;