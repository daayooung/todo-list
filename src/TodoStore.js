import React, { useState, useReducer, useCallback, useRef } from 'react';
import './TodoStore.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

export const TodoContext = React.createContext();

function createBulkTodos() {
  console.log('1.초기값 세팅');
  const array = [];
  for (let i = 1; i <= 500; i++) {
    array.push({
      id: i,
      text: `오늘의 할 일 ${i}`,
      check: false
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, check: !todo.check } : todo
      );
    case 'EDIT':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
    default:
      return todos;
  }
}

const TodoStore = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  const [initText, setinitText] = useState({ id: '', text: '', check: false });

  let nextId = useRef(todos.length);

  const onInsert = useCallback((text) => {
    console.log('2. onInsert callback');

    nextId.current += 1;

    const todo = {
      id: nextId.current,
      text,
      check: false
    };
    dispatch({ type: 'INSERT', todo });
  }, []);

  const onRemove = useCallback((id) => {
    console.log('3. onremove callback');
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  const onEdit = useCallback((id, text) => {
    dispatch({ type: 'EDIT', id, text });
  }, []);

  const onEditClick = useCallback((id, text) => {
    var check = !check;
    setinitText({ id, text, check });
  });

  // 질문: var check = !check; => 'check' has already been declared
  //  답: 파라미터로 받아오는 이름이랑 안에서 쓰는 이름이랑 같아서 오류표시가 난 것
  return (
    <TodoContext.Provider
      value={{
        todos,
        onInsert,
        initText,
        onEdit,
        onRemove,
        onToggle,
        onEditClick
      }}
    >
      <TodoTemplate>
        <TodoInsert />
        <TodoList />
      </TodoTemplate>
    </TodoContext.Provider>
  );
};

export default TodoStore;
