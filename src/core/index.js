import { fetchEvents } from '../google-api'
import { createStudent } from './student'
import { createTutorSession } from './tutor-session'

export const tutorSessions = {
  get: async () => {
    const calendarItems = await fetchEvents()
    return calendarItems.map(item => {
      const student = createStudent(item.studentName, item.studentEmail, '') 
      return createTutorSession(student, item.startDateTime, item.endDateTime)
    })
  }
}
