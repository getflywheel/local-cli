import Table = require('cli-table')
import {Command} from '@oclif/command'
import createGraphQLClient, {gql} from '../helpers/graphql-client'

export default class ListSites extends Command {
    static description = 'list all Local sites'

    static examples = [
      '$ local-cli list',
    ]

    static flags = {}

    static args = []

    async run() {
      const query = gql`
          {
              sites {
                  id
                  name
                  status
              }
          }
      `

      const client = createGraphQLClient()
      const data = await client.request(query)

      const table = new Table({
        head: ['ID', 'Name', 'Status'],
      })

      for (const item of data.sites) {
        table.push(Object.values(item))
      }

      this.log(table.toString())
    }
}
