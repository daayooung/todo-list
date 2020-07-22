import React, { useCallback, useContext } from 'react';
import { List } from 'react-virtualized';
import TodoItem from './TodoItem';
import { TodoContext } from '../TodoStore';
import './TodoList.css';

const TodoList = () => {
  const { todos, onRemove, onToggle, onEditClick } = useContext(TodoContext);

  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          onEditClick={onEditClick}
          style={style}
        />
      );
    },
    [todos, onRemove, onToggle, onEditClick]
  );

  return (
    <List
      className="TodoList"
      width={429}
      height={267}
      rowCount={todos.length}
      rowHeight={49}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: 'none' }}
    />
  );
};

export default TodoList;

// 질문 : item개수가 9개가 넘어가면 스크롤을 사용하여 목록을 보는데 불편함이 생긴다.
