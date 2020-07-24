# 1. UI

할 일을 입력할 input창, 보여줄 목록 필요

[input창]

- 할 일을 새로 생성, 수정하는 기능.
- 입력창, 제출 버튼

[할일목록]

- 할 일 text
- 완료, 수정, 삭제 버튼

# 2. Component

## [Todostore]

### createBulkTodos

- 임의의 할 일 목록 생성
- for문 돌며 빈 배열 array에 id, text, check push
- return array

### todos

- 할 일 목록. usestate로 관리.
- 초기값 : createBulkTodos

### initText

- TodoInsert의 props로 내려준다.

### nextId

- useRef로 관리 : key값으로 사용될 id이므로 rendering에 영향받지 않고 고유값을 유지하기 위해.

- useRef
- DOM Selector 함수. (= JavaScript의 getElementById, querySelector)
- Ref 객체의 .current 값은 우리가 원하는 DOM 을 가르킨다.

- (todos.length)

### onInsert()

- TodoInsert component의 추가btn을 onClick하면 실행되는 함수

* todo

- 새로 생성될 할 일 list
- 이 함수 내에서 예전 todos에서 방금 입력하고 제출한 내용을 포함한 새 list가 생성되어야 하므로

```
setTodos((todos) => todos.concat(todo));
```

- concat: 기존 배열을 훼손하지 않으면서 기존 배열을 활용한 새 배열을 생성하기 위해

- useCallback으로 묶어준다.

* useCallback

- Todostore.js 안의 모든 state들 중 하나라도 바뀌면 rerendering이 일어난다.
- rerendering이 일어나면 Todostore.js안에 속한 모든 기능들이 다시 전부 수행되고, 함수들도 재생성된다. 함수를 선언하는 것 자체는 메모리, CPU, 리소스를 많이 차지 하는 작업은 아니라 큰 부하가 생길일은 없지만,
- onInsert() 함수는 다른 변수가 변경되던 말던 메모리상에 딱 한 번만 존재하면 되고, component에서 props가 바뀌지 않았으면 Virtual DOM 에 새로 렌더링하는 것 조차 하지 않고 component의 결과물을 재사용 하는 최적화 작업을 할 수 있다.
- 두번째 인자로 받아온 값이 바뀔 때만 함수를 재생성 한다. 할 일 목록인 todos가 바뀔 때만 함수가 호출되면 되므로 관찰할 인자로 todos를 준다.
  두 번째 인자를 []빈 배열로 주면 함수가 최초 한 번만 호출이 되어 아무리 여러 번 클릭해도 새 할 일 목록이 하나만 생성된다.)

* nextId.current += 1;

- nextId의 현재 값을 현재 id에 += 1 한 값으로 설정한다.
- id: 4, 5, 6 이렇게 생성될 수 있게.
- 이 작업을 해주지 않으면 id의 값은 영원히 4, 4, 4 ... 로 형성된다.

### onRemove()

- todos가 변경될 때만 필요한 함수이므로 useCallback으로 묶어준다.

```
- setTodos(todos.filter((todo) => todo.id !== id));
```

- todos를 수정하는데, 기존 할 일 목록을 filter로 돌려 각 list의 id와 내가 넣은 id값이 일치하지 않는 것만 다시 새 배열로 수정해 setTodos의 값으로 return한다.

### onToggle()

```
- setTodos( todos.map((todo) =>
  todo.id === id ? { ...todo, check: !todo.check } : todo
  )
```

- 클릭한 id값을 인자로 받아 todos 안의 list들과 비교하다가 같은 id값을 가진 항목이 있으면 check값을 반대로 설정하고 그 값을 return
- 기존 데이터를 수정할 때 직접 수정하지 않고, ...todo로 새로운 배열을 만든 다음 새로운 객체를 만들어 필요한 부분을 교체해 주는 방식으로 구현했다.(check: !todo.check) 업데이트가 필요한 곳에서는 아예 새로운 배열 혹은 새로운 객체를 만들기 때문에, React.memo를 사용했을 때 props가 바뀌었는지 혹은 바뀌지 않았는지를 알아내서 리렌더링 성능을 최적화해 줄 수 있다.

### onEdit()

```
  const onEdit = useCallback(
    (id, text) => {
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, text: text } : todo))
      );
    },
    [todos]
  );
```

- 할 일 목록(todos)에서 event가 일어난 id와 기존todos의 id를 비교하고, 그 둘이 같다면 해당 list의 id와 check값은 그대로 두고(...) text의 내용은 덮어써 수정 내용이 반영된 새 배열 생성

### onEditClick()

```
const onEditClick = useCallback((id, text, check) => {
check = !check;

// initText의 값은 TodoInsert에 props로 내려주게 되는데, 수정버튼을 클릭할 때 check의 값을 역변환하여

  if (initText.check) {
      setMode('edit');
    } else {
      setMode('insert');
    }

mode를 insert에서 edit로 전환할 때 활용한다.

setinitText({ id, text, check });

// 기존 id, text, check 값을 클릭한 해당 목록의 값으로 바꾼다.
// -> 변경한 값은 다시 TodoInsert에 props로 전달

});
```

### useReducer

- useReducer를 사용할 때는 원래 두 번째 parameter에 초기 상태를 넣어 주어야 한다.
  지금처럼 두 번째 parameter에 undefined를 넣고, 세 번째 parameter에 초기 상태를 만들어 주는 함수 createBulkTodos를 넣어 주면 component가 맨 처음 렌더링될 때만 createBulkTodos 함수가 호출된다.
- useReducer를 사용하면 기존 코드를 많이 수정해야 하지만 상태를 업데이트하는 로직을 모아 component 바깥에 둘 수 있는 것이 장점이다.
- 성능상으로 useState 사용 후 함수형 업데이트를 하는 것과 크게 차이나지 않는다.

## [TodoTemplate]

- 모든 Component들의 container 역할
- children : 자신의 자식들 tag

## [TodoInsert]

입력과 제출 담당

- input창에 value 입력
- Todostore.js에 value값 전달
- TodoList, TodoItem에 props로 넘긴다.

### value

```
const [value, setValue] = useState('');
```

input에 입력한 값

### mode

```
const [mode, setMode] = useState('insert');
```

insert / edit
mode가 바뀜에 따라 input창에서 수행하는 내용이 달라진다.

### input

```
const input = useRef('');

```

- focus를 주기 위해 useRef로 input dom을 select

### useEffect()

```
useEffect(() => {
console.log('first init call', initText.text);
setValue(initText.text);

// input의 초기value 값을 ''에서 선택한 list의 text값으로 변경

input.current.focus();

if (initText.check) {
setMode('edit');
console.log('current mode', mode);
} else {
setMode('insert');
}
}, [initText]);

// mode 변경
```

### onChange()

- setValue(e.target.value) : input의 value 값을 ''에서 입력한 값으로 변경

### onSubmit()

- e.preventDefault() : submit 이벤트는 브라우저에서 새로고침을 발생시키므로 이를 방지하기 위해 호출한 함수

- e 엔터를치거나 제출버튼을 클릭하는 event가 일어나면 함수 실행
- !value: input창에 아무것도 입력되지 않아서 값이 없으면
- 경고창을 띄우고 return(함수 종료)

- mode == 'insert'이면 새로 생성될 목록을 만드는 onInsert()에 입력한 value 전달하고
- setValue('')로 입력창에 입력한 값을 초기화하여 view를 깔끔하게 만든다.

- else(mode == 'edit') 이면, 기존 목록을 수정하는 함수인 onEdit()에 내가 클릭한 목록의 id와 입력한 value값 전달.
- setValue('')로 입력창에 입력한 값을 초기화
- setMode('insert') : mode를 'edit'에서 'insert'로 돌려놓는다.

### changeMode()

- 초기화 버튼을 누르면 실행되는 함수
- 수정사항을 초기화 했으므로 mode를 edit -> insert로 돌려놓는다.

## [TodoList]

### import { List } from 'react-virtualized';

- React-virtualized
- 만약 todo-list 목록을 1000개 등록한다면, 내 todo-list app의 실제 화면(view)에 나오는 항목은 5개 뿐 임에도 컴포넌트가 맨 처음 렌더링되거나 특정 list 내용이 변경 될 때 1000개가 전부 렌더링된다.(map은 1000개가 있으면 그걸 전부 다 돈다.)
- react-virtualized의 List component를 이용하면 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게 하고,스크롤이 되면 해당 스크롤 위치에서 보여 주어야 할 컴포넌트를 자연스럽게 렌더링시켜 시스템 자원을 아낄 수 있다.

## [TodoItem]

```
const TodoItem = ({ todo, onRemove, onToggle, onEditClick }) => {

// Todostore, TodoList (부모 component)로 부터 물려받은 props들

  const { id, text, check } = todo;
  return (
    <div className="TodoItem">
      <div className="check" onClick={() => onToggle(id, text, check)}>
        {check ? '✓' : ''}
      </div>
      <div className={check ? 'text checked_text' : 'text'}>{text}</div>
      <div className="edit" onClick={() => onEditClick(id, text, check)}>
        수정
      </div>

      // 수정버튼을 클릭하는 onClick이벤트가 일어났을 때 onEditClick()함수에 todo의 id, text, check값 넣어 실행
      // onEditClick() : input의 initText 값을 변경하는 함수

      <div className="remove" onClick={() => onRemove(id)}>
        삭제
      </div>
    </div>
  );
};

export default React.memo(TodoItem);

- props({ todo, onRemove, onToggle, onEditClick })가 바뀌지 않으면 리렌더링 하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 최적화
- React.memo를 사용할 때는 불변성을 지켜야(ex. ... 문법) 객체 내부의 값이 새로워 질 때 바뀐 것을 감지히야 최적화 할 수 있다.

```
