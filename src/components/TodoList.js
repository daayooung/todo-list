import React, { useCallback } from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';

// const TodoList = ({ todos, onRemove, onToggle, onEditClick }) => {
//   const rowRenderer = useCallback(
//     ({ index, key }) => {
//       const todo = todos[index];
//       return (
//         <TodoItem
//           todo={todo}
//           key={key}
//           onRemove={onRemove}
//           onToggle={onToggle}
//           onEditClick={onEditClick}
//         />
//       );
//     },
//     [todos, onRemove, onToggle, onEditClick]
//   );

//   return (
//     <TodoList
//       className="TodoList"
//       rowCount={todos.length}
//       rowRenderer={rowRenderer}
//       list={todos}
//     />
//   );
// };

// 질문: 무한루프 발생

const TodoList = ({ todos, onRemove, onToggle, onEditClick }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onRemove={onRemove}
          onToggle={onToggle}
          onEditClick={onEditClick}
        />
      ))}
    </div>
  );
};

export default TodoList;
