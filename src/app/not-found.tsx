import styles from '@/App/_components/styles/not-found.module.css';
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={styles.block}>
      <Link
        href={'/'}
        className={styles.button}>
          홈으로
      </Link>
    </div>
  );
};