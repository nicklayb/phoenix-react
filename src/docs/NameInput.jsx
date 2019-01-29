import React from 'react'

class NameInput extends React.Component {
  state = {
    name: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.name)
  }

  handleChange = ({ target }) => this.setState({
    name: target.value,
  })

  render() {
    return (
      <div className="flex center">
        <input className="input" onChange={this.handleChange} value={this.state.name} />
        <button onClick={this.handleSubmit}>Connect</button>
      </div>
    )
  }
}

export default NameInput
