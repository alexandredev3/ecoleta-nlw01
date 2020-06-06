import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
// BrowserRouter: Navegação atraves do Navegador.

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
    </BrowserRouter>
  );
}

export default Routes;
// path: E o caminho
// Por padrão o Route faz verificação se o começo e igual no caso a "/"
// O "exact" e a mesma coisa de exact={true}, mais podemos deixar so exact...