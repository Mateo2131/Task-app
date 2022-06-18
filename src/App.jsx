import { useEffect, useState } from 'react'
import TodoHeader from './components/TodoHeader/todoHeader'
import TodoForm from './components/TodoForm/TodoForm'
import TodoItem from './components/TodoItem/todoItem'
import TodoList from './components/TodoList/todoList'
import Controls from './components/Controls/controls'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [visibility, setVisibility] = useState('all')

  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data) setTasks(JSON.parse(data))
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (taskName) => {
    if (!tasks.find((task) => task.name === taskName)) {
      setTasks([...tasks, { name: taskName, completed: false }])
    }
  }

  const toggleTask = (taskName) => {
    setTasks(
      tasks.map((t) =>
        t.name === taskName ? { ...t, completed: !t.completed } : t
      )
    )
  }

  const deleteTask = (taskName) => {
    setTasks(tasks.filter((t) => t.name !== taskName))
  }

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed))
  }

  const showAll = () => setVisibility('all')
  const showActive = () => setVisibility('active')
  const showCompleted = () => setVisibility('completed')

  return (
    <div className='App'>
      <TodoHeader />
      <TodoForm addTask={addTask} />
      <TodoList>
        <TodoItem
          task={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          visibility={visibility}
        />
      </TodoList>
      <Controls
        task={tasks}
        clearCompleted={clearCompleted}
        showAll={showAll}
        showActive={showActive}
        showCompleted={showCompleted}
      />
    </div>
  )
}

export default App
