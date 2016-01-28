// todo.jsx

import React, { Component, PropTypes } from 'react'

export default class Todo extends Component {
  render() {
    let styles = {
      textDecoration: this.props.completed ? 'line-through' : 'none',
      cursor: this.props.completed ? 'default' : 'pointer'
    }
    return (
      <li onClick={this.props.onClick} style={styles}>
        {this.props.text}
      </li>
    )
  }
}

