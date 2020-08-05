import React from 'react';

import ToDoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const ToDoList = ({ toDoData, onDeleted, onToggleDone, onToggleImportant }) => {
  const items = toDoData.map(item => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <ToDoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleImportant={() => onToggleImportant(id)}
        />
      </li>
    );
  });

  return <ul className="list-group todo-list">{items}</ul>;
};

export default ToDoList;
