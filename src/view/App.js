import React from 'react'
import { Calendar } from './Calendar'
import { Roster } from './Roster'
function App({ tutorSessions, roster }) {
  return (
    <div className="App">
      <Calendar tutorSessions={tutorSessions} />
      <hr />
      <Roster roster={roster} />
    </div>
  )
}

export default App
