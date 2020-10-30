import {Command, flags} from '@oclif/command'
import Table = require('cli-table')
import createGraphQLClient, {gql} from '../helpers/graphql-client'

export default class StopSite extends Command {
    static description = 'stop a Local site and all of its services'

    static flags = {
      help: flags.help({char: 'h'}),
    }

    static args = [
      {name: 'siteID', required: true},
    ]

    async run() {
      const {args} = this.parse(StopSite)

      const query = gql`
          mutation ($siteID: ID!) {
              stopSite(id: $siteID) {
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

      table.push(Object.values(data.stopSite))

      this.log(table.toString())
    }
}

