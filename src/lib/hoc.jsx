import React from 'react'
import { ChannelConsumer } from './Provider'

export const withSocket = Component => props => (
  <ChannelConsumer>
    {(d) => console.log(d) || (
      <Component {...props} socket={d.socket} />
    )}
  </ChannelConsumer>
)
