import React from 'react';
import logo from './logo.svg';
import './App.css';
import Contenedor from './components/Contenedor';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';



const client = new ApolloClient({
  uri: `https://rickandmortyapi.com/graphql`,
  cache: new InMemoryCache() //se puede configurar cuadno usar la cache o red; por defecto tira de cache
});

// function client: new ApolloClient(){


function App() {
  return (
    //solo se puede meter una vez, pero puede ser dentro de cualquier componente, podria estar dentro de varios hijos tras app
    <ApolloProvider client={client}>
      <Contenedor/>
    </ApolloProvider>
  );
}

export default App;
