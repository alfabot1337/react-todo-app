import React, { Component } from 'react';
import './todo-list-item.css';

export default class ToDoListItem extends Component {
  render() {
    const {
      label,
      onDeleted,
      onToggleDone,
      onToggleImportant,
      done,
      important
    } = this.props;

    let classNames = 'todo-list-item';
    classNames += done ? ' done' : '';
    // classNames += important ? ' important' : '';
    if (important) {
      classNames += ' important';
    }

    return (
      <span className={classNames}>
        <span className="todo-list-item-label" onClick={onToggleDone}>
          {label}
        </span>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o"></i>
        </button>
        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation"></i>
        </button>
      </span>
    );
  }
}
