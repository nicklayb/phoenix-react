import { createChannel } from '../../lib'

export default [
  createChannel('room:lobby', (channel, { mutate }) => {
    channel.on('new_msg', ({ message }) => {
      mutate(state => ({
        ...state,
        messages: [
          ...state.messages,
          message,
        ],
      }))
    })

    channel.join()
      .receive('ok', console.log('Joined'))
    return channel
  }),
]
