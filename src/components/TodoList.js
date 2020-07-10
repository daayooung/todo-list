import React from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';

const TodoList = ({ todos, remove, success }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} remove={remove} success={success} />
      ))}
    </div>
  );
};

export default TodoList;
