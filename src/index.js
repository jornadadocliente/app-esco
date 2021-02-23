import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './styles/global';

ReactDOM.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/dashboard" exact={true} component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
