import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

// process.env.NEXT_PUBLIC_HASURA_URL = 'https://basic-test-hasura.hasura.app/v1/graphql'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_URL,
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
      },
    }),
    cache: new InMemoryCache(),
  })
}

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()
  // for ssg, ssr always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create Apollo Client once in the clientSide
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
