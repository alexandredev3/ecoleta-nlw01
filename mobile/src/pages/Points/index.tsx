import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Emoji from 'react-native-emoji';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
// SvgUri permiti nos carregar imagens pela uma URL externa.
import * as Location from 'expo-location';

import api from '../../services/api';

interface Item {
  id: number;
  title: string;
  image_url: string;
};

interface Point {
  // estou colocando so as coisas que eu vou utilizar.
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
};

interface Params {
  selectedUf: string;
  selectedCity: string;
};

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  // sempre que nos utilizar um vetor no estado, precisamos criar uma interface.
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  // Como vai ser selecionado o id do item, vai ser do tipo number.

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();
      // status: vai mostrar se o usuario deu permição ou não.

      if (status !== 'granted') {
        // se ele não permitir
        Alert.alert('Oooops...', 'Precisamos da sua permissão para obter sua localização');
        // A primeira string e o titulo, e o segundo e a descrição.
        return;
      };

      const location = await Location.getCurrentPositionAsync();
      // Vai pegar a localização do usuario.

      const { latitude, longitude } = location.coords;

      setInitialPosition([
        latitude,
        longitude
      ]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    api.get('points', {
      params: {
        // Nos podemos mandar query params, ou outros params aqui.
        city: routeParams.selectedCity,
        uf: routeParams.selectedUf,
        items: selectedItems
      }
    }).then(response => {
      setPoints(response.data);
    });
  }, [selectedItems]);
  // Ele so vai executar esse useEffect quando o selectedItems for executado
  // Toda vez que esse selectedItems mudar ele vai carregar o useEffect de novo.

  function handleNavigateBack() {
    navigation.goBack();
  };

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { point_id: id });
    // { point_id: id } tudo que esta dentro dessa chave, nos vamos ter acesso na pagina de detail
  };

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([ ...selectedItems, id ]);
    };
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={25} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>
          <Emoji name="smiley" />
          Bem vindo.
        </Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          { initialPosition[0] !== 0 && (
            // Se o initialPosition[0] for maior que 0 ele vai rendelizar isso aqui.
            <MapView 
              style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                // Apenas coloque esses valores na sua aplicação, e muito complexo esse negocio
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map(point => {
                return (
                  <Marker
                    key={String(point.id)}
                    style={styles.mapMarker}
                    onPress={() => handleNavigateToDetail(point.id)}
                    coordinate={{
                      latitude: point.latitude,
                      longitude: point.longitude,
                    }} 
                  >
                    <View style={styles.mapMarkerContainer}>
                      <Image style={styles.mapMarkerImage} source={{ uri: point.image_url }} />
                      <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                    </View>
                  </Marker>
                );
              })}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {/*Nos permiti dar scroll na tela*/}

          {items.map(item => {
            return (
              <TouchableOpacity 
                key={String(item.id)} 
                style={[
                  // O React Native permiti adcionar varios estilos so colocar [] por volta.
                  styles.item,
                  selectedItems.includes(item.id) ? styles.selectedItem : {}
                  // se tiver um id incluido, adciona o estilo, se não deixa um objeto vazio.
                ]} 
                onPress={() => handleSelectItem(item.id)}
                activeOpacity={0.6} // e a opacidade dele quando e clicado.
              >
                <SvgUri width={42} height={42} uri={item.image_url} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}

        </ScrollView>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Points;