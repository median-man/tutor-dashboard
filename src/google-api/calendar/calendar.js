import fakeEvents from './calendar-events-fake.json'

const { gapi } = window

export class GoogleCalendarApi {
  getEvents = () => {
    return gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    })
  }
}
