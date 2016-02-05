// actions.jsx

import request from 'superagent'

export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

let nextTodoId = 0;

export function addTodo(text) {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text
  }
}

export function completeTodo(id) {
  return { type: COMPLETE_TODO, id }
}
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export function getData() {
  return dispatch => {
    return request.get('./data.json').end((err, res) => {
      JSON.parse(res.text).forEach((todo) => {
        dispatch(addTodo(todo.text))
      })
    });
  }
}