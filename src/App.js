import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  console.log('1.초기값 세팅');
  const array = [];
  for (let i = 1; i <= 5; i++) {
    array.push({
      id: i,
      text: `오늘의 할 일 ${i}`,
      check: false
    });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);
  const [initText, setinitText] = useState({ id: '', text: '', check: false });

  let nextId = useRef(todos.length);

  const onInsert = useCallback(
    (text) => {
      console.log('2. onInsert callback');

      nextId.current += 1;

      const todo = {
        id: nextId.current,
        text,
        check: false
      };
      setTodos(todos.concat(todo));
    },
    [todos]
  );

  const onRemove = useCallback(
    (id) => {
      console.log('3. onremove callback');
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, check: !todo.check } : todo
        )
      );
    },
    [todos]
  );

  const onEdit = useCallback(
    (id, text) => {
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, text: text } : todo))
      );
    },
    [todos]
  );

  const onEditClick = useCallback((id, text, check) => {
    check = !check;
    setinitText({ id, text, check });
  });

  // 질문: var check = !check; => 'check' has already been declared
  // 오류 나는데 선생님꺼에선 왜 안날까요
  return (
    <>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} initText={initText} onEdit={onEdit} />
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle}
          onEditClick={onEditClick}
        />
      </TodoTemplate>
    </>
  );
};

export default App;
