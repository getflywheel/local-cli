import {Command, flags} from '@oclif/command'
import Table = require('cli-table')
import getSiteId from '../helpers/get-site-id'
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

      // Automatic name lookup
      var siteName = args.siteID;
      if(getSiteId(siteName)){
        var siteID = getSiteId(args.siteID);
        console.log('Automatically found SiteID for ' + siteName + ' = ' + siteID )
        args.siteID = siteID
      }

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
      try {
        const data = await client.request(query, {
          siteID: args.siteID,
        })

        const table = new Table({
          head: ['ID', 'Name', 'Status'],
        })

        table.push(Object.values(data.stopSite))

        this.log(table.toString())
      } catch(error) {
        console.error("\n⚠️  Something went wrong! Are you sure the site ID is correct? \n")
        console.error(JSON.stringify(error, undefined, 2))
        process.exit(1)
      }
    }
}

