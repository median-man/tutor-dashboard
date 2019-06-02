import rosterFake from './sheets-roster-fake.json'
const { gapi } = window

const LIBRARIES = 'client:auth2'
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
const DISCOVER_DOCS = Object.freeze([
  'https://sheets.googleapis.com/$discovery/rest?version=v4'
])

const clientOptions = (apiKey, clientId) => ({
  apiKey,
  discoveryDocs: DISCOVER_DOCS,
  clientId,
  scopes: SCOPES
})

export function createGoogleSheetsApi(apiKey, clientId) {
  return {
    getSheet: async (spreadsheetId, range) => {
      // return rosterFake
      return new Promise((resolve, reject) => {
        const start = async () => {
          try {
            await gapi.client.init(clientOptions(apiKey, clientId))
            const response = await gapi.client.sheets.spreadsheets.values.get({
              spreadsheetId,
              range
            })
            resolve(response)
          } catch (error) {
            reject(error)
          }
        }
        gapi.load(LIBRARIES, start)
      })
    }
  }
}
