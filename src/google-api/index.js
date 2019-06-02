import { GoogleCalendarApi } from './calendar'
const { REACT_APP_GOOGLE_API_CLIENT_ID, REACT_APP_GOOGLE_API_KEY } = process.env

const calendarApi = new GoogleCalendarApi(
  REACT_APP_GOOGLE_API_KEY,
  REACT_APP_GOOGLE_API_CLIENT_ID
)

class CalendarItem {
  constructor(data) {
    this.attendeeEmail = data.attendees ? attendeeEmail(data) : ''
    this.summary = data.summary
    this.description = data.description
    this.startDateTime = data.start.dateTime
    this.endDateTime = data.end.dateTime
  }
}

function attendeeEmail(data) {
  return data.attendees
    .map(attendee => attendee.email)
    .filter(email => email !== data.creator.email)[0]
}

function isTutorSession(calendarItem) {
  const re = /tutorial session/i
  return re.test(calendarItem.description)
}

export const fetchEvents = async () => {
  const events = await calendarApi.getEvents()

  return events
    .map(eventData => new CalendarItem(eventData))
    .filter(isTutorSession)
}
