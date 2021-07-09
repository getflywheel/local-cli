import * as fs from 'fs-extra'
import untildify = require('untildify');

export default function getSiteId(siteName: string) {
  const sitesJsonFile = untildify('~/Library/Application Support/Local/sites.json')
  try {
    const sitesJson = fs.readJsonSync(sitesJsonFile)
    for (const siteID in sitesJson) {
      if (sitesJson.hasOwnProperty(siteID)) {
        if (siteName === sitesJson[siteID].name) {
          return siteID
        }
      }
    }
    return false
  } catch (error) {
    throw new Error('Sites info not found. Please ensure that Local is running.')
  }
}
