export function presentSession(tutorSession) {
  const startDate = new Date(tutorSession.startDateTime)
  const endDate = new Date(tutorSession.endDateTime)
  const minutes = (endDate - startDate) / 60000
  const description = `${minutes} minute session w/ ${
    tutorSession.student.name
  }`
  return {
    date: startDate.toLocaleDateString(),
    time: startDate.toLocaleTimeString(),
    description
  }
}
