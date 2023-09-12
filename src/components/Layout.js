import styles from '../styles/Layout.module.css'
import Header from './Header';
import ComicGroup from './ComicGroup';


function Layout() {
  return (
    <div className={styles.main}>
      <Header />
      <ComicGroup />
    </div>
  );
}

export default Layout;
