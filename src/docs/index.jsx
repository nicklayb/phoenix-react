import React from 'react'
import { render } from 'react-dom'
import ChannelsProvider, { withChannels } from '../../lib'
import channels from './channels'

const MessageList = withChannels(({ state }) => (
  <ul>
    {state.messages.map((message, index) => (
      <li key={index}>{message}</li>
    ))}
  </ul>
))

class Input extends React.Component {
  state = {
    input: '',
  }

  submit = (e) => {
    e.preventDefault()
    this.props.fire('room:lobby', 'new_msg', {
      message: this.state.input,
    })
    this.setState({ input: '' })
  }

  handleChange = ({ target }) => {
    this.setState({
      input: target.value,
    })
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <input onChange={this.handleChange} value={this.state.input} />
        <button>Send</button>
      </form>
    )
  }
}

const ChannelInput = withChannels(Input)

const App = () => (
  <ChannelsProvider
    url="ws://localhost:4000/socket"
    state={{ messages: [] }}
    channels={channels}
    onSocketError={e => console.error('ERROR', e)}
  >
    <MessageList />
    <ChannelInput />
  </ChannelsProvider>
)

render(<App />, document.getElementById('app'))
