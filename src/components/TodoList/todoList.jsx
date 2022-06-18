import styles from './todoList.module.css'

/* eslint-disable react/prop-types */
function TodoList(props) {
  return (
    <ul className={styles.todoList}>
      {props.children}
    </ul>
  )
}

export default TodoList
