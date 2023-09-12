import styles from '../styles/Header.module.css'

function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Chapter Updater</h1>
      <nav className={styles.menu}></nav>
    </div>
  );
}

export default Header;