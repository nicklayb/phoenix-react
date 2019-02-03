import React from 'react'

class MessageList extends React.Component {
  state = {
    value: '',
  }

  handleInputChange = ({ target: { value } }) => this.setState({
    value,
  })

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.value) {
      this.props.onSubmit(this.state.value)
      this.setState({
        value: '',
      })
    }
  }

  render() {
    return (
      <div className="flex flex-col">
        <div className="flex list">
          <ul className="message-list">
            {this.props.messages.map(message => (
              <li>{`${message.user} -> ${message.text}`}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-auto">
          <form onSubmit={this.handleSubmit}>
            <div className="flex">
              <textarea value={this.state.value} onChange={this.handleInputChange} />
            </div>
            <div className="flex flex-auto">
              <button>Send</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default MessageList
