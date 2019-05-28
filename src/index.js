import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/index";
import * as serviceWorker from "./serviceWorker";

import store from "./store";
import { Provider } from "react-redux";
import ApolloClient from './ServerClient.js';
import { ApolloProvider } from 'react-apollo';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={ApolloClient}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
