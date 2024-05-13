import styles from '@/App/post/[tag]/[fileName]/_components/styles/PostHeader.module.css';
import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.cover}>
          <div className={styles.postInfo}>
            <CircularProgress size={150} />
          </div>
        </div>
      </header>
      <main className={styles.skeleton} />
    </>
  );
}