import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onRemove, onToggle, onEditClick, style }) => {
  const { id, text, check } = todo;
  return (
    <div style={style}>
      <div className="TodoItem">
        <div className="check" onClick={() => onToggle(id, text, check)}>
          {check ? '✓' : ''}
        </div>
        <div className={check ? 'text checked_text' : 'text'}>{text}</div>
        <button className="edit" onClick={() => onEditClick(id, text)}>
          수정
        </button>
        <button className="remove" onClick={() => onRemove(id)}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
