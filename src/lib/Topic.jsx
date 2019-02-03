import React from 'react'
import PropTypes from 'prop-types'
import { Presence } from 'phoenix'
import { withSocket } from './hoc'

class Topic extends React.Component {
  static defaultProps = {
    presence: false,
    onSync: () => {},
  }

  constructor(props) {
    super(props)
    const channel = this.props.socket.channel(this.props.topic, this.props.params)
    const presence = (this.props.presence) ? new Presence(channel) : null
    this.state = {
      channel,
      presence,
    }
  }

  componentDidMount() {
    Object.entries(this.props.events).forEach(([key, value]) => {
      this.bindEvent(key, value)
    })
    this.attachPresence()
    this.state.channel.join()
  }

  componentWillUnmount() {
    this.state.channel.leave()
  }

  attachPresence = () => {
    if (this.state.presence) {
      this.state.presence.onSync(() => this.props.onSync(this.state.presence))
    }
  }

  bindEvent = (event, handler) => {
    this.state.channel.on(event, handler)
  }

  childProps = () => ({
    channel: this.state.channel,
    push: this.state.channel.push,
  })

  render() {
    return this.props.children(this.childProps)
  }
}

Topic.propTypes = {
  socket: PropTypes.shape({
    channel: PropTypes.func,
  }),
  topic: PropTypes.string,
  params: PropTypes.shape({}),
  presence: PropTypes.bool,
  events: PropTypes.shape({}),
  onSync: PropTypes.func,
  children: PropTypes.func,
}

export default withSocket(Topic)
