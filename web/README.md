# Next Level Week #3

- Todo o codigo do react carrega depois que a pagina tiver carregada.

- ReactDOM: Ele e o React para a Web, Ele vai trabalhar com a arvore de elemento.

- JSX: Posibilidade de escrever html dentro do javascript.

- Componente: E uma parte da interface insolada. (Todo o comeponente precisa de 
letra maiuscula no começo.)

- Propriedade: São atributos que nos mandamos pro componente.

- React.FC: Function Component, um componente escrito em função.

- FC: e um tipo do typescript que pode receber um parametro, o parametro que ele recebe
e informando quais propriedades esse componente pode receber.


  title: string; *Obrigatoria

  title?: string; *Não Obrigatoria

 - React.FC<HeaderProps>
  * <HeaderProps> Estou passando uma propriedade pro React.FC

- Estado: São informações matidas pelo proprio componente.

- Imutabilidade: Nos vamos ter que criar um novo estado com essas novas alterações
que queremos mostrar em tela.

  State
    Retorno do estate 
      [valor do estado, função para atualizar esse valor do estado]

## Conceitos React JS Contador, App
````js
import React, { useState } from 'react';
import './App.css';

import Header from './Header';

function App() {
  const [counter, setCounter] = useState(0);
  // O '0' e o valor inicial desse estatdo

  function handleButtonClick() {
    setCounter(counter + 1);
      // Estou atribuindo um novo valor para o counter, assim respeitando a imutabilidade.
  }

  return (
    <div>
      <Header title={`Contador ${counter}`} />

      <h1>{counter}</h1>
      <h1>{counter * 5}</h1>
      <button type="button" onClick={handleButtonClick}>Aumentar</button>
    </div>
  );
}

export default App;
````

## Componente Header:


````js
import React from 'react';

// Quais propriedades esse componente vai receber
interface HeaderProps {
  title: string;
}

// Quando nos tiver pegando alguma propriedade, e legal colocar o componente em uma constante.
// Porque e mais facil passar propriedades usando uma constante.
const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}

export default Header;
````

> yarn add react-icons
  - Ele permiti nos utilizamos todos os pacotes de icones mais famosos.

> yarn add react-router-dom
  - Para nos fazer uma transição entre as paginas da aplicação.
  > yarn add @types/react-router-dom -D
    - Tipagem da depedencia...

* A diferencia entre usar uma tag "a" para fazer a transição entre paginas no React
e que quando nos utilizamos a tag "a" para fazer a transição, ele recarrega a pagina e nos
queremos usar o SPA do React, então precisa utilizar o Link do react-router-dom.

O mapa que nos vamos vai ser o leadflet.

> yarn add leaflet react-leaflet

> yarn add axios
  - Ele vai nos ajudar a connectar nosso front-end com a api,(ta pra fazer sem ela)

````js
  useEffect(() => {
    
  }, [])
  // Primeiro parametro qual função eu quero executar.
  // Segundo parametro e quando eu quero executar essa função.
  // Se não for colocado nada dentro dessa array, ele so vai ser executado uma vez
````

- Sempre que nos precissar de uma informação dentro de um componente nos precisamos 
colocar ela em um estado.

  * Sempre que e criado uma Array ou um Objeto nos precisamos manualmente informar
  o tipo da variavel.
  A interface serve para fazer a representação do formato que a array vai ter. 

  ````js
    interface Item {
      id: number;
      title: string;
      image_url: string;
    }


    const [items, setItems] = useState<Item[]>([]);
    // Quando tem um sinal de maior e igual e generic
    // Item[] quer dizer que e uma array.
  ````

  ````js
    <ul className="items-grid">
    {items.map(item => {
      return (
        <li key={item.id}>
          <img src={item.image_url} alt={item.title} />
          <span>{item.title}</span>
        </li>
      );
    })}

    //key={item.id} esse key server pro react encontrar o elemento mais rapido
    // O key precisa ser preechido com uma informação unica, no caso o id do item que sempre sera unico...
  ````

- Agora nos vamos utilizar a api do IBGE para buscar as cidade e os estados.

onChange={}
  - Evento que vai ouvir as mudanças naquele input.

  ````js
  import React, { useEffect, useState, ChangeEvent } from 'react';
  // ChangeEvent mudança de algum input.
  ````

  value={selectedUf}
    * Quando tem um estado em um value de um input, e para quele valor do estado,
    refletir, no input tambem.


  ````js
    <li 
    key={item.id} 
    onClick={() => handleSelectItem(item.id)}
    className={selectedItems.includes(item.id) ? 'selected' : ''}
    // Ele vai inserir um true ou um false. se ele ja inseriu ou não
    // se retorna true ele vai colocar uma class 'selected' Se não ele vai colocar uma classe vazia
    >
  ````

  useHistory: ele vai permitir navegar entre uma pagina e outra sem precisar de um
  botão

> yarn add react-dropzone
  - Vai criar uma caxinha para fazer o upload de imagens.