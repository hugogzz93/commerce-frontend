import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { getAuthToken } from './services/Authentication'
import { createUploadLink } from 'apollo-upload-client'

const client = new ApolloClient({
  link: ApolloLink.from([
    setContext((_, { headers }) => {
      const token = getAuthToken()
      return {
        headers: {
          ...headers,
          authorization: token || ''
        }
      }
    }),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new createUploadLink({
      uri: 'http://localhost:3001/graphql',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});
 export default client
