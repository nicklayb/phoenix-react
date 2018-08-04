import React from 'react'
import ChannelsProvider from './ChannelsProvider'

const defaultMap = state => state

export default (Component, mapState = defaultMap) => props => (
  <ChannelsProvider.Consumer>
    {providerState => <Component {...props} {...mapState(providerState)} />}
  </ChannelsProvider.Consumer>
)
