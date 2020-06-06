import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
// LeafletMouseEvent: e necessario para fazer o marker no mapa.
import axios from 'axios';

import Dropzone from '../../components/Dropzone';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // Responsavel pela posição atual do computador do usuario no mapa.
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  })

  // Vai armazenar qual uf o usuario selecionou.
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  // Armazenar o id dos Items.
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
  // number, number primeiro parametro e a latitude e o segundo e a longtute 
  const [selectedFile, setSelectedFile] = useState<File>(); 

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    })
    // Isso vai me retornar a posição atual do usuario assim que ele abrir a aplicação.
  }, []);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
      // Assim que eu tiver a responsa eu vou atualizar o meu estado.
    });
    // 'items' e a roda que eu quero listar
  }, []);

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      // Se o valor do estado for 0 ele não vai executar nada.
      return;
    }

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
      const cityNames = response.data.map(city => city.nome);

      setCities(cityNames);
      })
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    // Eu preciso informar tambem qual input esta alterando.
    // console.log(event.target.value)
    const uf = event.target.value;

    setSelectedUf(uf);
  };

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    // Eu preciso informar tambem qual input esta alterando.
    // console.log(event.target.value)
    const city = event.target.value;

    setSelectedCity(city);
  };

  function handleMapMarker(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng,
    ])
    // latlng: ele vai mostrar a latitude e a longtitude, que o usuario clicou.
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setInputData({ ...inputData, [name]: value });
    // se nos pagarmos apenas a informação de um input, os outro inputs vão se perder
    // Então precisamos colar tudo que esta dentro daquele estado aqui
  };

  function handleSelectItem(id: number) {
    // setSelectedItems([id]);
    // Ele so vai permitir seleciona um
    const alreadySelected = selectedItems.findIndex(item => item === id);
    // findIndex vai me retorna um numero igual ou acima de 0
    // se o que eu estiver procurando ja estiver dentro do array, se não ele retorna -1

    if (alreadySelected >= 0) {
      // se for maior ou igual a 0 estou removendo, se não vou esta adcionando.
      const filteredItems = selectedItems.filter(item => item !== id);
      // Estou filtrando os items que são diferentes do id que eu estou removendo.

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([ ...selectedItems, id ]);
    }

    // setSelectedItems([ ...selectedItems, id ]);
    // tenho que aproveitar tudo que ja tem no selected items, e colocar o id novo.
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // console.log(selectedFile);

    // return;

    // Para retirar aquele recarregamento quando clicamos no submit

    const { name, email, whatsapp } = inputData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    // quando e uma array nos desestruturamos assim, [] por volta.
    const items = selectedItems;

    // Nos vamos ter que usar multipartform aqui tambem, por causa da imagem
    const data = new FormData();
    // FormData: e uma variavel global do javascript que permite nos enviar um multipartform
    
    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('items', items.join(','));

    if (selectedFile) {
      // se o selectedFile for preechido...
      data.append('image', selectedFile);
    };
    // o selected por ser undefined o usuario pode dar um submit sem enviar a foto
    // se não fazer esse if, o typescript vai ficar reclamando

    // const data = {
    //   name,
    //   email,
    //   whatsapp,
    //   uf,
    //   city,
    //   latitude,
    //   longitude,
    //   items
    // };
    
    await api.post('points', data);
    // points e o caminho que nos usamos la na api para criar um point
    // segundo parametro são os dados que nos temos que usar para criar esse point.

    alert('Ponto de coleta criado com sucesso');

    history.push('/');
    // Depois do alert ele vai redireciona o usuario para a pagina home
  }

  return (
    <div id="page-create-point">

      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br /> ponto de coleta</h1>

          <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">

            <label htmlFor="name">Nome da entidade</label>
            <input 
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>

          </div>

        </fieldset>

        <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            <Map center={initialPosition} zoom={12} onClick={handleMapMarker}>
              <TileLayer  // E o layout que ele vai usar.
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker 
                // Positon: pode ser o mesmo valor do center, e aquele pontinho no mapa
                position={selectedPosition} 
              />
            </Map>

            <div className="field-group">
              
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select 
                  name="uf" 
                  id="uf"
                  value={selectedUf} 
                  onChange={handleSelectUf}
                >
                  <option value="0">Selecione uma UF</option>
                  {ufs.map(uf => {
                    return (
                      <option key={uf} value={uf}>{uf}</option>
                      // Como a uf nunca vai repetir, posso colocar ela como uma key.
                    );
                  })}
                </select>
              </div>

              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select 
                  name="city" 
                  id="city"
                  value={selectedCity}
                  onChange={handleSelectCity}
                >
                  <option value="0">Selecione uma cidade</option>
                  {cities.map(city => {
                    return (
                      <option key={city} value={city}>{city}</option>
                      // Como a uf nunca vai repetir, posso colocar ela como uma key.
                    );
                  })}
                </select>
              </div>

            </div>
        </fieldset>

        <fieldset>

            <legend>
              <h2>Ítems de coleta</h2>
              <span>Selecione um ou mais ítens abaixo</span>
            </legend>

            <ul className="items-grid">
              {items.map(item => {
                return (
                  <li 
                    key={item.id} 
                    onClick={() => handleSelectItem(item.id)}
                    className={selectedItems.includes(item.id) ? 'selected' : ''}
                    // Ele vai inserir um true ou um false se ele ja inseriu ou não
                    // se retorna true ele vai colocar uma class 'selected'
                      // Se não ele vai colocar uma classe vazia
                  >
                    <img src={item.image_url} alt={item.title} />
                    <span>{item.title}</span>
                  </li>
                );
              })}
            </ul>

        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>
    </div>
  );
}

export default CreatePoint;