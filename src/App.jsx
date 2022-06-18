import { useEffect, useState } from 'react'
import TodoHeader from './components/TodoHeader/todoHeader'
import TodoForm from './components/TodoForm/TodoForm'
import TodoItem from './components/TodoItem/todoItem'
import TodoList from './components/TodoList/todoList'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data) setTasks(JSON.parse(data))
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (taskName) => {
    if (!tasks.find((task) => task.name === taskName)) {
      setTasks([
        ...tasks,
        { name: taskName, completed: false}
      ])
    }
  }

  const toggleTask = (taskName) => {
    setTasks(
      tasks.map(t => (t.name === taskName ? {...t, completed: !t.completed} : t))
    )
  }

  return (
    <div className='App'>
      <TodoHeader />
      <TodoForm addTask={addTask} />
      <TodoList>
        {tasks.map((task) => (
          <TodoItem
            key={task.name}
            task={task}
            toggleTask={toggleTask}
          />
        ))}
      </TodoList>
    </div>
  )
}

export default App
