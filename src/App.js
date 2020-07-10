import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoCreate from './components/TodoCreate';
import TodoList from './components/TodoList';

const App = () => {
  // 할 일 목록 useState로 상태 관리
  const [todos, setTodos] = useState([
    {
      id: 1,
      contents: '안녕 디지몬',
      done: true
    },
    {
      id: 2,
      contents: '네 꿈을 꾸면서 잠이 들래',
      done: true
    },
    {
      id: 3,
      contents: '안녕 디지몬',
      done: true
    }
  ]);

  // nextId: 추가될 할 일 목록의 id값. 4를 참조한다.
  let nextId = useRef(4);

  // 추가될 할일들.
  const onCreate = useCallback((contents) => {
    const todo = {
      id: nextId.current,
      contents,
      done: false
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  }, []);

  const remove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const success = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id !== id ? todo : { ...todo, done: !todo.done }
        )
      );
    },
    [todos]
  );

  return (
    <div>
      <TodoTemplate>
        <TodoCreate onCreate={onCreate} />
        <TodoList todos={todos} remove={remove} success={success} />
      </TodoTemplate>
    </div>
  );
};

export default App;
