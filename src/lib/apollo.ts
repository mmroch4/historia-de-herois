import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.CONTENT_API_ENDPOINT,
  cache: new InMemoryCache(),
});
