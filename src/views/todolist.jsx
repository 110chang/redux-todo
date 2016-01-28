// todolist.jsx

import React, { Component, PropTypes } from 'react'
import Todo from './todo'

export default class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo => 
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => this.props.onTodoClick(todo.id)}
          />
        )}
      </ul>
    )
  }
}

