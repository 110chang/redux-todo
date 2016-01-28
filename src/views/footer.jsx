// footer.jsx

import React, { Component, PropTypes } from 'react'
import { VisibilityFilters } from '../actions'

export default class Footer extends Component {
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name
    }
    return (
      <a href="#" onClick={e => {
        e.preventDefault()
        this.props.onFilterChange(filter)
      }}>
        {name}
      </a>
    )
  }
  renderUndo() {
    return (
      <div>
        <button onClick={this.props.onUndo} disabled={this.props.undoDisabled}>
          Undo
        </button>
        <button onClick={this.props.onRedo} disabled={this.props.redoDisabled}>
          Redo
        </button>
      </div>
    )
  }
  render() {
    return(
      <footer>
        Show:
        {' '}
        {this.renderFilter(VisibilityFilters.SHOW_ALL, 'All')}
        {', '}
        {this.renderFilter(VisibilityFilters.SHOW_COMPLETED, 'Completed')}
        {', '}
        {this.renderFilter(VisibilityFilters.SHOW_ACTIVE, 'Active')}
        .
        {' '}
        {this.renderUndo()}
      </footer>
    )
  }
}

