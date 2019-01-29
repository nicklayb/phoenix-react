import React from 'react'
import { ChannelConsumer } from './Provider'

export const withSocket = Component => props => (
  <ChannelConsumer>
    {({ socket }) => (
      <Component {...props} socket={socket} />
    )}
  </ChannelConsumer>
)
