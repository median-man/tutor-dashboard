import rosterFake from './sheets-roster-fake.json'
const { gapi } = window

export function createGoogleSheetsApi(apiKey, clientId) {
  return {
    getSheet: async (spreadsheetId, range) => {
      return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId,
        range
      })
    }
  }
}
