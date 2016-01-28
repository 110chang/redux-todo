// addtodo.jsx

import React, { Component, PropTypes } from 'react'

export default class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type="text" ref="input" onKeyDown={e => this.handleKeyDown(e)} />
        <button onClick={e => this.handleClick(e)}>
          Add
        </button>
      </div>
    )
  }
  handleClick(e) {
    const node = this.refs.input
    const text = node.value.trim()
    this.props.onAddClick(text)
    node.value = ''
  }
  handleKeyDown(e) {
    switch (e.which) {
      case 13:
        const node = this.refs.input
        const text = node.value.trim()
        this.props.onAddReturn(text)
        node.value = ''
    }
  }
}

