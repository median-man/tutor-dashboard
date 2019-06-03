import React, { Component } from 'react'
import { presentSession } from './present-session'

export class Calendar extends Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.props.sessions.map(tutorSession => (
              <SessionRow
                key={tutorSession.startDateTime}
                {...presentSession(tutorSession)}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function SessionRow({ date, time, description }) {
  return (
    <tr>
      <td>{date}</td>
      <td>{time}</td>
      <td>{description}</td>
    </tr>
  )
}
