import styles from '../styles/ComicGroup.module.css'
import ComicCard from './ComicCard';

function ComicGroup() {
  return (
    <div className={styles.group}>
      <ComicCard />
    </div>
  );
}

export default ComicGroup;