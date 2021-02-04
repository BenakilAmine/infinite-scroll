import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider,ApolloClient, InMemoryCache } from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import { offsetLimitPagination } from "@apollo/client/utilities"




const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          questions: offsetLimitPagination(["type"]),
        },
      },
    },
  }),
  uri:"http://localhost:4242/graphql",
  headers: {
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2l5b2o1aGIwMDAxOXZkdHF1N3RhZWtjIiwiaWF0IjoxNjA4NTYyNDIyfQ.pAQ-xdo9j83cGqt6Tz5LbYcgEc92NC8zkH_soKh2sXw"
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
