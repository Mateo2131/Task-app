import styles from './todoHeader.module.css'

function TodoHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>TODO</h1>
    </header>
  )
}

export default TodoHeader
