import React from 'react';
import './TodoTemplate.css';

const TodoTemplate = ({ children }) => {
  return (
    <div className="todoTemplate">
      <h1>오늘 할 일</h1>
      <div>{children}</div>
    </div>
  );
};

export default TodoTemplate;
