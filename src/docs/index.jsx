import React, { useState } from 'react'
import { render } from 'react-dom'
import ChannelsProvider from '../../lib'
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
        <ChannelsProvider url={SOCKET_HOST} params={{ name: this.state.name }}>
          <Chat name={this.state.name} />
        </ChannelsProvider>
      )
    }
    return (
      <NameInput onSubmit={this.handleSubmit} />
    )
  }
}

render(<App />, document.getElementById('app'))
