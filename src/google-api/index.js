import { GoogleCalendarApi } from './calendar'
import { createSessionItemsFromEventItems } from './calendar-mapper'
const { REACT_APP_GOOGLE_API_CLIENT_ID, REACT_APP_GOOGLE_API_KEY } = process.env

const calendarApi = new GoogleCalendarApi(
  REACT_APP_GOOGLE_API_KEY,
  REACT_APP_GOOGLE_API_CLIENT_ID
)

export const fetchEvents = async () => {
  const events = await calendarApi.getEvents()
  return createSessionItemsFromEventItems(events)
}
