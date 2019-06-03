import React from 'react'
import { Calendar } from './Calendar'
import { Roster } from './Roster'

const SIGNED_IN = 'signed-in'
const PENDING = 'pending'
const NOT_SIGNED_IN = 'not-signed-in'

class App extends React.Component {
  state = {
    sessions: [],
    roster: [],
    googleSignIn: PENDING
  }

  getSessions = async () => {
    try {
      const result = await this.props.tutorSessions.get()
      this.setState({ sessions: result })
    } catch (error) {
      console.error(error)
    }
  }

  fetchRoster = async () => {
    this.setState({
      roster: await this.props.roster.get()
    })
  }

  handleGoogleSignin = async () => {
    this.setState({ googleSignIn: PENDING })
    try {
      await this.props.gapi.signIn()
      this.setState({ googleSignIn: SIGNED_IN })
      this.getSessions()
      this.fetchRoster()
    } catch (error) {
      console.error(error)
    }
  }

  async componentDidMount() {
    try {
      await this.props.gapi.loadGoogleClient()
      if (this.props.gapi.isSignedIn()) {
        this.setState({ googleSignIn: SIGNED_IN })
        this.getSessions()
        this.fetchRoster()
      } else {
        this.setState({ googleSignIn: NOT_SIGNED_IN })
      }
    } catch (error) {
      this.setState({ googleSignIn: NOT_SIGNED_IN })
    }
  }

  render() {
    const { googleSignIn } = this.state
    return (
      <div className="App">
        {googleSignIn === SIGNED_IN ? null : (
          <button
            onClick={this.handleGoogleSignin}
            disabled={googleSignIn !== NOT_SIGNED_IN}
          >
            {googleSignIn === PENDING ? 'signing in ...' : 'Sign In'}
          </button>
        )}
        <Calendar sessions={this.state.sessions} />
        <hr />
        <Roster roster={this.state.roster} />
      </div>
    )
  }
}
export default App
