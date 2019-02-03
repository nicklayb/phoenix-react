import React from 'react'
import MemberList from './MemberList'
import MessageList from './MessageList'
import Topic from '../../lib/Topic'

class Chat extends React.Component {
  state = {
    members: [],
    messages: [],
  }

  onSync = (presence) => {
    const members = []
    presence.list((id, { metas: [{ user }] }) => {
      members.push(user)
    })
    this.setState({
      members,
    })
  }

  onNewMessage = () => {

  }

  render() {
    return (
      <div className="flex wrapper">
        <div className="flex title">
          <h1>Phoenix-React Example</h1>
          <h3>Connected as <strong>{this.props.name}</strong></h3>
        </div>
        <div className="flex body">
          <Topic
            presence
            topic="chat:lobby"
            onSync={this.onSync}
            events={{
              'new-msg': this.onNewMessage,
            }}
          >
            {({ push }) => (
              <React.Fragment>
                <div className="flex members">
                  <MemberList members={this.state.members} />
                </div>
                <div className="flex chat">
                  <MessageList messages={this.state.messages} onSubmit={message => push('new-msg', { message })} />
                </div>
              </React.Fragment>
            )}
          </Topic>
        </div>
      </div>
    )
  }
}

export default Chat
