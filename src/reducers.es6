// reducers.jsx

import { combineReducers } from 'redux'
import {
  ADD_TODO,
  COMPLETE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'
import undoable, { distinctState } from 'redux-undo'

const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todo(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case COMPLETE_TODO:
      if (state.id !== action.id) {
        return state
      }
      //return Object.assign({}, state, {
      //  completed: true
      //})
      // you need preset-stage-2 to transpile object spread
      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, todo(undefined, action)]
    case COMPLETE_TODO:
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos: undoable(todos, { filter: distinctState() })
})

export default todoApp

