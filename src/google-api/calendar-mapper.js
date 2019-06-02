/* 
  Transforms data structures from Google Calendar API to
  the shape required by the core use cases to decouple
  the core of the app from the Google API.

  Event items which are not valid tutor sessions are filtered out
  of the returned array.
*/
export function createSessionItemsFromEventItems(eventItems) {
  return eventItems.filter(isValidTutorSessionItem).map(createTutorSessionItem)
}

/* 
  Returns true if calendar item is a valid tutoring session
  event.
*/
function isValidTutorSessionItem(eventItem) {
  if (!Array.isArray(eventItem.attendees) || eventItem.attendees.length !== 2) {
    return false
  }

  const re = /tutorial session/i
  return re.test(eventItem.description || '')
}

/* 
  Maps given calendar item that is a valid tutor session
  to structure expected by app use cases.
*/
function createTutorSessionItem(tutorSessionItem) {
  return {
    studentEmail: studentEmail(tutorSessionItem),
    description: tutorSessionItem.description,
    summary: tutorSessionItem.summary,
    startDateTime: tutorSessionItem.start.dateTime,
    endDateTime: tutorSessionItem.end.dateTime
  }
}

function studentEmail(tutorSessionItem) {
  return tutorSessionItem.attendees
    .map(attendee => attendee.email)
    .filter(email => email !== tutorSessionItem.creator.email)[0]
}
