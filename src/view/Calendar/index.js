import React, { Component } from 'react'
import { presentSession } from './present-session'

export class Calendar extends Component {
  state = { sessions: [] }
  getSessions = async () => this.props.tutorSessions.get()

  async componentDidMount() {
    const result = await this.getSessions()
    this.setState({ sessions: result })
  }

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
            {this.state.sessions.map(tutorSession => (
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
