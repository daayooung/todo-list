import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  console.log('1.초기값 세팅');
  const array = [];
  for (let i = 1; i <= 3; i++) {
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

  let nextId = useRef(todos.length + 1);
  // 질문: todos.length하면 생성한 할일을 삭제할 때 마지막 할 일도 id값이 같아서 같이 삭제가 된다.

  // 추가될 할일들.
  // useCallback을 이용하여 함수 재사용 : onInsert, onRemove와 같은 함수들은 컴포넌트가 리렌더링 될 때 마다 새로 만들어진다. 함수를 선언하는 것 자체는 메모리, CPU, 리소스를 많이 차지 하는 작업은 아니라 큰 부하가 생길일은 없지만, 한 번 만든 함수를 필요할때만 새로 만들고 재사용함으로써, component에서 props 가 바뀌지 않았으면 Virtual DOM 에 새로 렌더링하는 것 조차 하지 않고 component의 결과물을 재사용 하는 최적화 작업을 할 수 있다.
  const onInsert = useCallback(
    (text) => {
      console.log('2. onInsert callback');

      const todo = {
        id: nextId.current,
        text,
        check: false
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
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

  const onEditClick = useCallback((id, text) => {
    let check = !check;
    setinitText({ id, text, check });
  });
  // 질문: 'check' has already been declared
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
