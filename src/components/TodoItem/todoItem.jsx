import styles from './todoItem.module.css'
import cross from '/icon-cross.svg'

/* eslint-disable react/prop-types */
function TodoItem({ task, toggleTask, deleteTask, visibility }) {
  if (visibility === 'active') task = task.filter((t) => (t.completed === false))
  if (visibility === 'completed') task = task.filter((t) => (t.completed === true))

  return (
    <>
      {task.map((t) => {
        return (
          <li className={styles.listItem} key={t.name}>
            <input
              type='checkbox'
              onChange={() => toggleTask(t.name)}
              checked={t.completed}
            />
            <span className={styles.listName}>{t.name}</span>
            <button
              className={styles.deleteButton}
              onClick={() => deleteTask(t.name)}
            >
              <img src={cross} alt='cross' />
            </button>
          </li>
        )
      })}
    </>
  )
}

export default TodoItem
