import { fetchEvents } from '../google-api'
import { createStudent } from './student'
import { createTutorSession } from './tutor-session'

export const tutorSessions = {
  get: async () => {
    const calendarItems = await fetchEvents()
    return calendarItems.map(item => {
      const student = createStudent(studentName(item), item.studentEmail, '') 
      return createTutorSession(student, item.startDateTime, item.endDateTime)
    })
  }
}

function studentName(item) {
  return item.summary.substr(0, item.summary.indexOf(' and '))
}
