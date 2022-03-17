import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://basic-test-hasura.hasura.app/v1/graphql',
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
