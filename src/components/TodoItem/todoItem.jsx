import styles from './todoItem.module.css'
import cross from '/icon-cross.svg'

/* eslint-disable react/prop-types */
function TodoItem({ task, toggleTask }) {
  return (
    <li className={styles.listItem}>
      <input
        type='checkbox'
        onChange={() => toggleTask(task.name)}
        checked={task.completed}
      />
      <span>{task.name}</span>
      <button className={styles.deleteButton}>
        <img src={cross} alt='cross' />
      </button>
    </li>
  )
}

export default TodoItem
