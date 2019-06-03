import React, { Component } from 'react'
import { presentRoster } from './presenter'

export class Roster extends Component {
  render() {
    return (
      <div>
        <pre>{JSON.stringify(presentRoster(this.props.roster), null, 2)}</pre>
      </div>
    )
  }
}
