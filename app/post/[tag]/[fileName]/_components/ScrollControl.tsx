'use client';

import styles from './styles/ScrollControl.module.css';
import HomeIcon from '@mui/icons-material/Home';
import UpArrowIcon from '@mui/icons-material/NorthRounded';
import { useRouter } from 'next/navigation';

export default function ScrollControl() {
  const router = useRouter();

  const scrollToY = (y: number) => {
    window.scrollTo({
      top: y,
    });
  };

  return (
    <div className={styles.box}>
      <div
        onClick={() => scrollToY(0)}
        className={styles.item}>
        <UpArrowIcon fontSize='small' />
      </div>
      <div
        onClick={() => router.push('/')}
        className={styles.item}>
        <HomeIcon fontSize='small' />
      </div>
    </div>
  );
}