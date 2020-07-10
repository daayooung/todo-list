import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, remove, success }) => {
  const { id, contents, check } = todo;
  return (
    <div className="TodoItem">
      <div className="complate" onClick={() => success(id)}>
        완료
      </div>
      <div className={check ? 'todo success' : 'todo'}>{contents}</div>
      <div className="delete" onClick={() => remove(id)}>
        삭제
      </div>
    </div>
  );
};

export default TodoItem;
