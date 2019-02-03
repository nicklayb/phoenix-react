import React from 'react'
import PropTypes from 'prop-types'
import * as Phoenix from 'phoenix'

const CONTEXT = {
  socket: null,
  status: null,
  statusPayload: null,
}

const { Provider, Consumer } = React.createContext(CONTEXT)

const CLOSED = 'closed'
const OPENED = 'opened'
const ERROR = 'error'

class ChannelProvider extends React.Component {
  state = {
    socket: new Phoenix.Socket(this.host, this.params),
    status: null,
    statusPayload: {},
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
    console.log(this.state)
    return {
      socket: this.state.socket,
      status: this.state.status,
      statusPayload: this.state.statusPayload,
    }
  }

  updateStatus = status => (payload) => {
    this.setState({
      status,
      statusPayload: payload,
    })
  }

  connectSocket() {
    this.state.socket.onClose(this.updateStatus(CLOSED))
    this.state.socket.onError(this.updateStatus(ERROR))
    this.state.socket.onOpen(this.updateStatus(OPENED))
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
        {this.props.children(this.getProviderState())}
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

const statuses = { OPENED, CLOSED, ERROR }

export {
  Consumer as ChannelConsumer,
  statuses,
}
