import React, { useEffect } from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
// import AddTodo from './Todo/AddTodo'
import Loader from './Loader'
import Modal from './Modal/Modal'

// const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

const AddTodo = React.lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('./Todo/AddTodo'))
      }, 3000)
    })
)

function App() {
  // let todos = [
  //   { id: 1, completed: false, title: 'Купить хлеб' },
  //   { id: 2, completed: false, title: 'Купить масло' },
  //   { id: 3, completed: false, title: 'Купить молоко' }
  // ]

  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      // .then(todos => {
      //   setTodos(todos)
      // })
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, [])

  function toggleTodo(id) {
    // console.log('todo id', id)
    // todos = todos.map(todo => {
    //   if (todo.id === id) {
    //     todo.completed = !todo.completed
    //   }
    //   return todo
    // })
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false
        }
      ])
    )
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className='wrapper'>
        <h1>My TodoList</h1>

        {/* <React.Suspense fallback={<p>Loading....</p>}> */}
        <React.Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}

        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}

        <Modal />
        
      </div>
    </Context.Provider>
    
  )
}

export default App
