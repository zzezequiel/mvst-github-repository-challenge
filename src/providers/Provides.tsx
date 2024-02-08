"use client";

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { setContext } from '@apollo/client/link/context';

export function Providers({ children }: { children: React.ReactNode }) {
    const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
      });
      
      const authLink = setContext((_, { headers }) => {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      });
      
      const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      });
    return (
        <ApolloProvider client={client}>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </ApolloProvider>

    );
}
