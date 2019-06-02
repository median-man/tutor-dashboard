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
function createTutorSessionItem(eventItem) {
  return {
    studentEmail: studentEmail(eventItem),
    studentName: studentName(eventItem),
    description: eventItem.description,
    summary: eventItem.summary,
    startDateTime: eventItem.start.dateTime,
    endDateTime: eventItem.end.dateTime
  }
}

function studentEmail(eventItem) {
  return eventItem.attendees
    .map(attendee => attendee.email)
    .filter(email => email !== eventItem.creator.email)[0]
}

function studentName(eventItem) {
  return eventItem.summary.substr(0, eventItem.summary.indexOf(' and '))
}
