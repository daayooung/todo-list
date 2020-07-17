import React, { useState, useCallback, useRef, useEffect } from 'react';
import './TodoInsert.css';

const TodoInsert = ({ onInsert, initText, onEdit }) => {
  const [value, setValue] = useState('');
  const [mode, setMode] = useState('insert');
  const input = useRef('');

  useEffect(() => {
    console.log('first init call', initText.text);

    setValue(initText.text);

    if (initText.check) {
      setMode('edit');
    } else {
      setMode('insert');
    }
    console.log('current mode', mode);
  }, [initText]);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!value) {
        alert('할 일을 입력해주세요.');
        return;
      }
      if (mode == 'insert') {
        console.log('insert mode');
        onInsert(value);
        setValue('');
      } else {
        console.log('edit mode');
        onEdit(initText.id, value);
        setValue('');
        setMode('insert');
      }
      // input.current.focus();
    },
    [value]
  );

  const changeMode = useCallback(() => {
    setMode('insert');
    setValue('');
  }, [value, mode]);

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="내용을 입력하세요"
        value={value}
        onChange={onChange}
        ref={input}
      />
      {mode == 'edit' ? (
        <button onClick={changeMode}>초기화</button>
      ) : (
        <div></div>
      )}
      <button type="submit">추가</button>
    </form>
  );
};

export default TodoInsert;
