import {GraphQLClient, gql} from 'graphql-request'
import getConnectionInfo from './get-connection-info'

const graphqlClient = (): GraphQLClient =>  {
  const {url, authToken} = getConnectionInfo()

  return new GraphQLClient(url, {
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  })
}

export {
  graphqlClient as default,
  gql,
}
