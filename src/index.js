import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import reportWebVitals from './reportWebVitals';


const client = new AppolloClient({
  uri:"https://api.github.com/graphql",
  headers: {
    Authorization:"Bearer c6efc88c6e56b40b62e4b572588225427dd17fdd"
  }
})




ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
