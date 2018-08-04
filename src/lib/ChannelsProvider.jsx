import React from 'react'
import PropTypes from 'prop-types'
import * as Phoenix from 'phoenix'

const context = {
  fire: () => {},
  mutate: () => {},
  leave: () => {},
  join: () => {},
  state: {},
  getters: {},
}

export const { Provider, Consumer } = React.createContext(context)

const DEFAULT_TIMEOUT = 5000

class ChannelServiceProvider extends React.Component {
  state = this.props.state

  socketInstance = null
  channels = {}

  componentDidMount() {
    this.channels = this._bootChannels()
  }

  componentWillUnmount() {
    this._terminate()
  }

  _bootChannels() {
    return this.props.channels.reduce((acc, { topic, channel }) => ({
      ...acc,
      [topic]: channel(this.socket.channel(topic), this.providerValue),
    }), {})
  }

  _connectSocket() {
    const socket = new Phoenix.Socket(this.props.url, this.socketParams)
    socket.connect()
    socket.onError(this._onSocketError)
    socket.onClose(this.onSocketClose)
    return socket
  }

  _onSocketError = (error) => {
    this.callbacks.onSocketError(error, this.providerValue)
    this._terminate()
  }

  _onSocketError = () => {
    this.callbacks.onSocketClose(this.providerValue)
  }

  _bindGetters() {
    return Object.keys(this.props.getters).reduce((acc, getter) => ({
      ...acc,
      [getter]: params => this.props.getters[getter](params, this.state),
    }), {})
  }

  _terminate = () => this.socket.disconnect()

  get socket() {
    if (this.socketInstance === null) {
      this.socketInstance = this._connectSocket()
    }
    return this.socketInstance
  }

  get socketParams() {
    return {
      params: this.props.params || {},
    }
  }

  get providerValue() {
    return {
      fire: this.fire,
      state: this.state,
      getters: this._bindGetters(),
      mutate: this.mutate,
      leave: this.leave,
      join: this.join,
    }
  }

  get timeout() {
    return this.props.timeout || DEFAULT_TIMEOUT
  }

  get callbacks() {
    return {
      onSocketClose: () => this.props.callbacks.onSocketClose() || (() => {}),
      onSocketError: err => this.props.callbacks.onSocketError(err) || (() => {}),
    }
  }

  join = ({ topic, creator }) => new Promise((resolve) => {
    this.channels[topic] = creator(this.socket.channel(topic), this.providerValue)
    resolve(this.providerValue)
  })

  fire = (channel, event, body) => this.channels[channel].push(event, body, this.timeout)

  mutate = mutator => new Promise(resolve =>
    this.setState(mutator(this.state), () => resolve(this.state)))

  leave = topic => new Promise(resolve =>
    resolve(this.channels[topic].leave()))

  render() {
    return (
      <Provider value={this.providerValue}>
        {this.props.children}
      </Provider>
    )
  }
}

ChannelServiceProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  state: PropTypes.shape(),
  getters: PropTypes.shape(),
  callbacks: PropTypes.shape({
    onSocketError: PropTypes.func,
    onSocketClose: PropTypes.func,
  }),
  url: PropTypes.string,
  params: PropTypes.shape(),
  channels: PropTypes.objectOf(PropTypes.func),
  timeout: PropTypes.number,
}

ChannelServiceProvider.Consumer = Consumer

export default ChannelServiceProvider
