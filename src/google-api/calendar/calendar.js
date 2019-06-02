import fakeEvents from './calendar-events-fake.json'

const { gapi } = window

const libraries = 'client:auth2'

const clientOptions = (apiKey, clientId) => ({
  apiKey,
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
  ],
  clientId,
  scope: 'https://www.googleapis.com/auth/calendar.readonly'
})

export class GoogleCalendarApi {
  constructor(apiKey, clientId) {
    this.apiKey = apiKey
    this.clientId = clientId
  }

  getEvents = async () => {
    // return fakeEvents
    return new Promise((resolve, reject) => {
      const start = async () => {
        await gapi.client.init(clientOptions(this.apiKey, this.clientId))
        gapi.auth2.getAuthInstance().isSignedIn.get()

        const response = await gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: 'startTime'
        })

        return resolve(response.result.items)
      }
      gapi.load(libraries, start)
    })
  }
}
