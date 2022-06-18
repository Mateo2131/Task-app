/* eslint-disable react/prop-types */
import { useState } from 'react'
import styles from './todoForm.module.css'

function TodoForm({ addTask }) {
  const [newTodo, setnewTodo] = useState('')

  const HandleSubmit = (e) => {
    e.preventDefault()
    addTask(newTodo)
    setnewTodo('')
  }

  return (
    <form onSubmit={HandleSubmit}>
      <input
        type='text'
        placeholder='Create a new todo...'
        value={newTodo}
        onChange={(e) => setnewTodo(e.target.value)}
        className={styles.todoInput}
      />
    </form>
  )
}

export default TodoForm
