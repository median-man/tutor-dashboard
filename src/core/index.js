import { fetchEvents } from '../google-api'
import { Student } from './student'
import { TutorSession } from './tutor-session'

export const tutorSessions = {
  get: async () => {
    const calendarItems = await fetchEvents()
    return calendarItems.map(item => {
      const student = new Student(studentName(item), item.attendeeEmail, '') 
      return new TutorSession(student, item.startDateTime, item.endDateTime)
    })
  }
}

function studentName(item) {
  return item.summary.substr(0, item.summary.indexOf(' and '))
}
