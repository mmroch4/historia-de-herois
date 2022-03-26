import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import React from 'react';
import { client } from '../lib/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
