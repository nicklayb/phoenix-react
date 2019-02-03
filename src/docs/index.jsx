import React from 'react'
import { render } from 'react-dom'
import ChannelsProvider, { statuses } from '../../lib'
import Chat from './Chat'
import './app.css'
import NameInput from './NameInput'

const SOCKET_HOST = 'ws://localhost:4000/socket'

class App extends React.Component {
  state = {
    name: null,
  }

  handleSubmit = name => this.setState({
    name,
  })

  render() {
    if (this.state.name) {
      return (
        <ChannelsProvider host={SOCKET_HOST} params={{ name: this.state.name }}>
          {({ status }) => (status === statuses.OPENED
            ? <Chat name={this.state.name} />
            : <h1>Connecting</h1>
          )}
        </ChannelsProvider>
      )
    }
    return (
      <NameInput onSubmit={this.handleSubmit} />
    )
  }
}

render(<App />, document.getElementById('app'))
