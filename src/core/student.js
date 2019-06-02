export function createStudent(name, email, zoomUrl) {
  return Object.freeze({
    name,
    email,
    zoomUrl
  })
}
