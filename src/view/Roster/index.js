import React, { Component } from 'react'
import { presentRoster } from './presenter'

export class Roster extends Component {
  state = { roster: [] }
  fetchRoster = async () => {
    this.setState({
      roster: presentRoster(await this.props.roster.get())
    })
  }
  componentDidMount() {
    this.fetchRoster()
  }
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state.roster, null, 2)}</pre>
      </div>
    )
  }
}
