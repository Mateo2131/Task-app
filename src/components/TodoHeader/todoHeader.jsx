import styles from './todoHeader.module.css'
import moon from '/icon-moon.svg'
import sun from '/icon-sun.svg'

function TodoHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>TODO</h1>
      <div>
        <img src={sun || moon} alt='moon' />
      </div>
    </header>
  )
}

export default TodoHeader
