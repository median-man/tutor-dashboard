import React from 'react'
import { Calendar } from './Calendar'
function App({ tutorSessions }) {
  return (
    <div className="App">
      <Calendar tutorSessions={tutorSessions} />
    </div>
  )
}

export default App
