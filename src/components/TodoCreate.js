import React, { useState, useCallback, useRef } from 'react';
import './TodoCreate.css';

const TodoCreate = ({ insert }) => {
  const [value, setValue] = useState('');
  const input = useRef(null);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insert(value);
      setValue('');
      input.current.focus();
    },
    [insert, value]
  );

  return (
    <form className="TodoCreate" onSubmit={onSubmit}>
      <input
        placeholder="내용을 입력하세요"
        value={value}
        onChange={onChange}
        ref={input}
      />
      <button>추가</button>
    </form>
  );
};

export default TodoCreate;
