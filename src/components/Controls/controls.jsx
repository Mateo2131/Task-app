/* eslint-disable react/prop-types */
import styles from './controls.module.css'

function Controls({task, clearCompleted, showAll, showActive, showCompleted}) {
  task = task.filter((t) => (t.completed === false))

  return (
    <footer className={styles.form}>
      <span>{task.length} Items Left</span>
      <button className={styles.btn} onClick={() => clearCompleted()}>Clear Completed</button>
      <div>
        <button className={styles.btn} onClick={() => showAll()}>All</button>
        <button className={styles.btn} onClick={() => showActive()}>Active</button>
        <button className={styles.btn} onClick={() => showCompleted()}>Completed</button>
      </div>
    </footer>
  )
}

export default Controls
