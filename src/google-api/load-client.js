const { gapi } = window

// google api client interfaces to load
const DISCOVERY_DOCS = Object.freeze([
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  'https://sheets.googleapis.com/$discovery/rest?version=v4'
])

// space separated list of Google API scopes for auth
const AUTH_SCOPES =
  'https://www.googleapis.com/auth/calendar.readonly' +
  ' https://www.googleapis.com/auth/spreadsheets.readonly'

export const isSignedIn = () => {
  return (
    gapi.auth2 &&
    gapi.auth2.getAuthInstance() &&
    gapi.auth2.getAuthInstance().isSignedIn.get()
  )
}

export const signIn = () => {
  const GoogleAuth = gapi.auth2.getAuthInstance()
  if (!GoogleAuth.isSignedIn.get()) return GoogleAuth.signIn()
}

export const load = (apiKey, clientId) => {
  return new Promise((resolve, reject) => {
    const libraries = 'client:auth2'

    try {
      gapi.load(libraries, init(resolve, reject))
    } catch (error) {
      reject(error)
    }
  })

  function init(resolve, reject) {
    const clientOptions = {
      apiKey,
      discoveryDocs: DISCOVERY_DOCS,
      clientId,
      scope: AUTH_SCOPES
    }
    return () =>
      gapi.client
        .init(clientOptions)
        // .then(signIn, reject)
        .then(resolve, reject)
  }
}
