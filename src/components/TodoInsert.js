import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext
} from 'react';
import { TodoContext } from '../TodoStore.js';
import './TodoInsert.css';

const TodoInsert = () => {
  const { onInsert, initText, onEdit } = useContext(TodoContext);

  const [value, setValue] = useState('');
  const [mode, setMode] = useState('insert');
  const input = useRef('');

  useEffect(() => {
    console.log('first init call', initText.text);
    setValue(initText.text);
    input.current.focus();

    if (initText.check) {
      setMode('edit');
      console.log('current mode', mode);
    } else {
      setMode('insert');
    }
  }, [initText]);
  // 질문: React Hook useEffect has a missing dependency: 'mode'. Either include it or remove the dependency array.eslint(react-hooks/exhaustive-deps)
  // 답: mode는 console.log()에 찍어낼 때만 사용하고 있기 때문이다.

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      input.current.focus();
      if (!value) {
        alert('할 일을 입력해주세요.');
        return;
      }
      if (mode === 'insert') {
        console.log('insert mode');
        onInsert(value);
        setValue('');
      } else {
        console.log('edit mode');
        onEdit(initText.id, value);
        setValue('');
        setMode('insert');
      }
    },
    [value]
  );

  const changeMode = useCallback(() => {
    setMode('insert');
    setValue('');
    input.current.focus();
  }, []);
  // 질문: React Hook useCallback has unnecessary dependencies: 'mode' and 'value'. Either exclude them or remove the dependency array.eslint(react-hooks/exhaustive-deps)
  // 왜 필요없다고 뜰까
  // 답: value, mode의 값을 바라보다가 어떤 일을 하는 것이 아니고, mode를 무조건 'insert'로 변경하고, value를 ''로 만드는 것이기 때문에 dep가 필요하지 않다.

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="내용을 입력하세요"
        value={value}
        onChange={onChange}
        ref={input}
      />
      {mode === 'edit' ? (
        <button className="reset" onClick={changeMode}>
          초기화
        </button>
      ) : (
        <div></div>
      )}
      <button type="submit">{mode === 'insert' ? '추가' : '수정'}</button>
    </form>
  );
};

export default TodoInsert;
