import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onRemove, onToggle, onEditClick }) => {
  const { id, text, check } = todo;
  return (
    <div className="TodoItem">
      <div className="check" onClick={() => onToggle(id, text, check)}>
        {check ? '✓' : ''}
      </div>
      <div className={check ? 'text checked_text' : 'text'}>{text}</div>
      <div className="edit" onClick={() => onEditClick(id, text, check)}>
        수정
      </div>
      {/* 질문: onClick={() => onEditClick(id, text, check)
        Cannot access 'check' before initialization*/}
      <div className="remove" onClick={() => onRemove(id)}>
        삭제
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
