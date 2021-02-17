import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloProvider,ApolloClient,createHttpLink,InMemoryCache,split} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// 2
const httpLink = createHttpLink({
  uri: 'http://localhost:4242/graphql'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4242/graphql`,
  options: {
    reconnect: true
  }
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          messages: {
            keyArgs: false,
            merge(existing, incoming, {
              args: { cursor },
              readField,
            }) {
              const merged = existing ? existing.slice(0) : [];
              let offset = offsetFromCursor(merged, cursor, readField);
              console.log('Offset',offset)
              // If we couldn't find the cursor, default to appending to
              // the end of the list, so we don't lose any data.
              if (offset < 0) offset = merged.length;
              // Now that we have a reliable offset, the rest of this logic
              // is the same as in offsetLimitPagination.
              for (let i = 0; i < incoming.length; ++i) {
                merged[offset + i] = incoming[i];
              }
              return merged;
            },
  
            // If you always want to return the whole list, you can omit
            // this read function.
            // read(existing, {
            //   args: { cursor, limit = existing.length },
            //   readField,
            // }) {
            //   if (existing) {
            //     let offset = offsetFromCursor(existing, cursor, readField);
            //     // If we couldn't find the cursor, default to reading the
            //     // entire list.
            //     if (offset < 0) offset = 0;
            //     return existing.slice(offset, offset + limit);
            //   }
            // },
          },
        }
      }
    }
  }),
  link: splitLink,
  uri:"http://localhost:4242/graphql",
  headers: {
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2l5b2o1aGIwMDAxOXZkdHF1N3RhZWtjIiwiaWF0IjoxNjA4NTYyNDIyfQ.pAQ-xdo9j83cGqt6Tz5LbYcgEc92NC8zkH_soKh2sXw"
  }
});
function offsetFromCursor(items, cursor, readField) {
  // Search from the back of the list because the cursor we're
  // looking for is typically the ID of the last item.
  for (let i = items.length - 1; i >= 0; --i) {
    const item = items[i];
    // console.log('item',item);
    // Using readField works for both non-normalized objects
    // (returning item.id) and normalized references (returning
    // the id field from the referenced entity object), so it's
    // a good idea to use readField when you're not sure what
    // kind of elements you're dealing with.
    if (readField("id", item) === cursor) {
      // Add one because the cursor identifies the item just
      // before the first item in the page we care about.
      return i + 1;
    }
  }
  // Report that the cursor could not be found.
  return -1;
}


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
