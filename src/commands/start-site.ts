import {Command} from '@oclif/command'
import createGraphQLClient, {gql} from '../helpers/graphql-client'
import Table = require('cli-table')

export default class StartSite extends Command {
  static description = 'start a Local site and all of its services'

  static examples = [
    '$ local-cli start-site 6mC6PsMCh',
  ]

  static flags = {}

  static args = [
    {name: 'siteID', required: true},
  ]

  async run() {
    const {args} = this.parse(StartSite)

    const query = gql`
      mutation ($siteID: ID!) {
        startSite(id: $siteID) {
          id
          name
          status
        }
      }
    `

    const client = createGraphQLClient()
    const data = await client.request(query, {
      siteID: args.siteID,
    })

    const table = new Table({
      head: ['ID', 'Name', 'Status'],
    })

    table.push(Object.values(data.startSite))

    this.log(table.toString())
  }
}
