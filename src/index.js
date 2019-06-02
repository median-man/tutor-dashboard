import React from 'react'
import ReactDOM from 'react-dom'
import App from './view/App'
import * as serviceWorker from './serviceWorker'
import { tutorSessions, roster } from './core'

ReactDOM.render(<App tutorSessions={tutorSessions} roster={roster} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
