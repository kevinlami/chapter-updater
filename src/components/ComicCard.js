import styles from '../styles/ComicCard.module.css'
import VerifyChapter from './VerifyChapter';

function ComicCard() {
  return (
    <div className={styles.card}>
        <VerifyChapter />
    </div>
  );
}

export default ComicCard;