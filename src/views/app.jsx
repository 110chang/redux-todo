// views/app.jsx

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions'
import AddTodo from './addtodo'
import TodoList from './todolist'
import Footer from './footer'

class App extends Component {
  render() {
    const { dispatch, visibleTodos, visibilityFilter } = this.props
    return (
      <div>
        <AddTodo 
          onAddClick={text => dispatch(addTodo(text))}
          onAddReturn={text => dispatch(addTodo(text))}
        />
        <TodoList
          todos={visibleTodos}
          onTodoClick={id => dispatch(completeTodo(id))}
        />
        <Footer
          filter={visibilityFilter}
          onFilterChange={filter => dispatch(setVisibilityFilter(filter))}
        />
      </div>
    )
  }
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

export default connect(select)(App)