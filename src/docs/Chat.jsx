import React from 'react'
import MemberList from './MemberList'
import MessageList from './MessageList'

const Chat = ({ name }) => (
  <div className="flex wrapper">
    <div className="flex title">
      <h1>Phoenix-React Example</h1>
      <h3>Connected as <strong>{name}</strong></h3>
    </div>
    <div className="flex body">
      <div className="flex members">
        <MemberList />
      </div>
      <div className="flex chat">
        <MessageList />
      </div>
    </div>
  </div>
)

export default Chat
