import {GraphQLClient, gql} from 'graphql-request'
import getConnectionInfo from './helpers/get-connection-info'

const {url, authToken} = getConnectionInfo()

const graphQLClient = new GraphQLClient(url, {
  headers: {
    authorization: `Bearer ${authToken}`,
  },
})

const {request} = graphQLClient

export {
  request,
  gql,
}
