import { GoogleCalendarApi, createSessionItemsFromEventItems } from './calendar'
import { createGoogleSheetsApi } from './sheets'

const {
  REACT_APP_GOOGLE_API_CLIENT_ID,
  REACT_APP_GOOGLE_API_KEY,
  REACT_APP_ROSTER_GOOGLE_SHEET_ID
} = process.env

const ROSTER_RANGE = 'Roster!A:G'

const calendarApi = new GoogleCalendarApi(
  REACT_APP_GOOGLE_API_KEY,
  REACT_APP_GOOGLE_API_CLIENT_ID
)

const sheetsApi = new createGoogleSheetsApi(
  REACT_APP_GOOGLE_API_KEY,
  REACT_APP_GOOGLE_API_CLIENT_ID
)

export const fetchEvents = async () => {
  const events = await calendarApi.getEvents()
  return createSessionItemsFromEventItems(events)
}

export const fetchRoster = async () => {
  const response = await sheetsApi.getSheet(
    REACT_APP_ROSTER_GOOGLE_SHEET_ID,
    ROSTER_RANGE
  )
  return response
}
