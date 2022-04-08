import './App.css';
import Contenedor from './components/Contenedor';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: `https://rickandmortyapi.com/graphql`,
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Contenedor/>
    </ApolloProvider>
  );
}

export default App;
