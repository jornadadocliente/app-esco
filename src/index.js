import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './styles/global';


// Views
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CadastroDeUsuario from './pages/Cadastro-de-usuario';
import ListaDeUsuario from './pages/Listagem-de-usuario';
import ListaOrcamentos from './pages/Orcamentos';
import NovoOrcamento from './pages/Novo-orcamento';
import Produtos from './pages/Produtos';
import ProdutoUnico from './pages/Produto';

ReactDOM.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/dashboard" exact={true} component={Dashboard} />
        <Route path="/cadastro-de-usuario" exact={true} component={CadastroDeUsuario} />
        <Route path="/lista-de-usuario" exact={true} component={ListaDeUsuario} />

        {/* Lista os Orçamentos */}
        <Route path="/orcamentos" exact={true} component={ListaOrcamentos} />
        <Route path="/novo-orcamento" exact={true} component={NovoOrcamento} />
        
        {/* Rotas de produtos dinâmicas */}
        <Route path="/produtos/:search" component={Produtos} />

        {/* Rota de Produto */}
        <Route path="/produto/:id" exact={true} component={ProdutoUnico} />
      </Switch>
    </BrowserRouter>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
