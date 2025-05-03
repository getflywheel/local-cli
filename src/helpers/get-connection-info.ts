import * as fs from 'fs-extra'
import untildify = require('untildify');

export interface ConnectionInfo {
    port: number;
    authToken: string;
    url: string;
    subscriptionUrl: string;
}

export default function getConnectionInfo(): ConnectionInfo {
  let connectionInfoPath;
	if ( process.platform == 'darwin' ) {
    connectionInfoPath = untildify('~/Library/Application Support/Local/graphql-connection-info.json');
	} else {
    connectionInfoPath = process.env.APPDATA + '\\Local\\graphql-connection-info.json';
	}

  try {
    return fs.readJsonSync(connectionInfoPath)
  } catch (error) {
    throw new Error('GraphQL connection info not found. Please ensure that Local is running.')
  }
}
