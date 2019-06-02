/* 
  This function builds a facade for now. Using the facade will make adding in
  validation as needed easier. This also provides a clear definition
  of the tutor session entity.
*/
export function createTutorSession(student, startDateTime, endDateTime) {
  return Object.freeze({
    student,
    startDateTime,
    endDateTime
  })
}
