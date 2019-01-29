import React from 'react'
import PropTypes from 'prop-types'
import * as Phoenix from 'phoenix'

const CONTEXT = {

}

const { Provider, Consumer } = React.createContext(CONTEXT)

class ChannelProvider extends React.Component {
  state = {
    socket: new Phoenix.Socket(this.host, this.params),
  }

  componentDidMount() {
    this.connectSocket()
  }

  componentWillUnmount() {
    this.disconnectSocket()
  }

  get params() {
    return {
      params: this.props.params,
    }
  }

  get host() {
    return this.props.host || '/socket'
  }

  getProviderState() {
    return {
      socket: this.state.socket,
    }
  }

  connectSocket() {
    this.state.socket.connect()
  }

  disconnectSocket() {
    if (this.state.socket.isConnected()) {
      this.state.socket.disconnect()
    }
  }

  render() {
    return (
      <Provider value={this.getProviderState()}>
        {this.props.children}
      </Provider>
    )
  }
}

ChannelProvider.propTypes = {
  params: PropTypes.any,
  host: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default ChannelProvider

export {
  Consumer as ChannelConsumer,
}
