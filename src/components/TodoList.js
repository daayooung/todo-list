import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoItem from './TodoItem';
import './TodoList.css';

// map은 2500개가 있으면 그걸 다 도는데 react-vitualize를 하면 화면에 보여지는, 필요한 부분만
// 렌더링을 하기 때문에 훨씬 효율적이다. list는 react-vitualize에 원래 존재하는 기능

const TodoList = ({ todos, onRemove, onToggle, onEditClick }) => {
  console.log(todos);

  const rowRenderer = useCallback(
    ({ index, key }) => {
      const todo = todos[index];
      return (
        <TodoItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          onEditClick={onEditClick}
        />
      );
    },
    [todos, onRemove, onToggle, onEditClick]
  );

  return (
    <List
      className="TodoList"
      width={429}
      height={250}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
    />
  );
};

//질문: 무한루프 발생

// const TodoList = ({ todos, onRemove, onToggle, onEditClick }) => {
//   console.log(todos);
//   return (
//     <div className="TodoList">
//       {todos.map((todo) => (
//         <TodoItem
//           key={todo.id}
//           todo={todo}
//           onRemove={onRemove}
//           onToggle={onToggle}
//           onEditClick={onEditClick}
//         />
//       ))}
//     </div>
//   );
// };

export default TodoList;
