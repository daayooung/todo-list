# 1. UI

할 일을 입력할 input창, 보여줄 목록 필요
[ input창 ]

- 할 일을 새로 생성, 수정하는 기능.
- 입력창, 제출 버튼
  [ 할일 목록 ]
- 할 일 text
- 완료, 수정, 삭제 버튼

# 2. Component

[App]

## createBulkTodos

// 임의의 할 일 목록 생성
// for문 돌며 빈 배열 array에 id, text, check push
// return array

## todos

//할 일 목록. usestate로 관리.
// 초기값 : createBulkTodos

## nextId

// useRef로 관리 : key값으로 사용될 id이므로 rendering에 영향받지 않고 고유값을 유지하기 위해.
// (todos.length + 1)

## onInsert()

// TodoInsert component의 추가btn을 onClick하면 실행되는 함수

- todo
  // 새로 생성될 할 일 list
  // 이 함수 내에서 예전 todos에서 방금 입력하고 제출한 내용을 포함한 새 list가 생성되어야 하므로 setTodos((todos) => todos.concat(todo));
  //concat: 기존 배열을 훼손하지 않으면서 기존 배열을 활용한 새 배열을 생성하기 위해

  // useCallback으로 묶어준다.
  // useCallback
  // App.js 안의 모든 state들 중 하나라도 바뀌면 rerendering이 일어난다.
  // rerendering이 일어나면 App.js안에 속한 모든 기능들이 다시 전부 수행되고, 함수들도 재생성된다.
  // onInsert() 함수는 다른 변수가 변경되던 말던 메모리상에 딱 한 번만 존재하면 되기 때문에, 반복되는 재생성을 막아 메모리를 효율적으로 사용하기 위해 usecallback을 사용한다. (기존에 생성된 함수를 재활용)
  // 두번째 인자로 받아온 값이 바뀔 때만 함수를 재생성 한다. 할 일 목록인 todos가 바뀔 때만 함수가 호출되면 되므로 관찰할 인자로 todos를 준다.
  두 번째 인자를 []빈 배열로 주면 함수가 최초 한 번만 호출이 되어 아무리 여러 번 클릭해도 새 할 일 목록이 하나만 생성된다.)

- nextId.current += 1;
  // nextId의 현재 값을 현재 id에 += 1 한 값으로 설정한다.
  // id: 4, 5, 6 이렇게 생성될 수 있게.
  // 이 작업을 해주지 않으면 id의 값은 영원히 4, 4, 4 ... 로 형성된다.

## onRemove()

// todos가 변경될 때만 필요한 함수이므로 useCallback으로 묶어준다.
// setTodos(todos.filter((todo) => todo.id !== id));
// todos를 수정하는데, 기존 할 일 목록을 filter로 돌려 각 list의 id와 내가 넣은 id값이 일치하지 않는 것만 다시 새 배열로 수정해 setTodos의 값으로 return한다.

## onToggle()

// setTodos( todos.map((todo) =>
todo.id === id ? { ...todo, check: !todo.check } : todo
)
// 클릭한 id값을 인자로 받아 todos 안의 list들과 비교하다가 같은 id값을 가진 항목이 있으면 check값을 반대로 설정하고 그 값을 return

## onEdit()

## onEditClick()

[TodoTemplate]
//모든 Component들의 container 역할
// children : 자신의 자식들 tag

---

[TodoInsert]
입력과 제출 담당
// input창에 value 입력
// App.js에 value값 전달
// TodoList, TodoItem에 props로 넘긴다.

## onSubmit()

// e.preventDefault() : submit 이벤트는 브라우저에서 새로고침을 발생시키므로 이를 방지하기 위해 호출한 함수

// e 엔터를치거나 제출버튼을 클릭하는 event가 일어나면 함수 실행
// !value: input창에 아무것도 입력되지 않아서 값이 없으면
// 경고창을 띄우고 return(함수 종료)

// mode == 'insert'이면 새로 생성될 목록을 만드는 onInsert()에 입력한 value 전달하고
// setValue('')로 입력창에 입력한 값을 초기화하여 깔끔하게 만든다.

// else(mode == 'edit') 이면, 기존 목록을 수정하는 함수인 onEdit()에 내가 클릭한 목록의 id와 입력한 value값 전달.
// setValue('')로 입력창에 입력한 값을 초기화
// setMode('insert') : mode를 'edit'에서 'insert'로 돌려놓는다.

- TodoItem
  //
