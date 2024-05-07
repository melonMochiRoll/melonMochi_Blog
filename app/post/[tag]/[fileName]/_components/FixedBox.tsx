'use client';

import { useEffect, useState } from 'react';
import styles from './styles/FixedBox.module.css';
import { throttle } from 'lodash';
import HomeIcon from '@mui/icons-material/Home';
import UpArrowIcon from '@mui/icons-material/NorthRounded';
import { useRouter } from 'next/navigation';

export default function FixedBox() {
  const router = useRouter();
  const [ scrollY, setScrollY ] = useState(0);

  const handleScroll = throttle(() => {
    setScrollY(window.scrollY);
  }, 500);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToY = (y: number) => {
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {scrollY > 300 &&
      <div className={styles.fixed}>
        <div
          onClick={() => scrollToY(0)}
          className={styles.item}>
          <UpArrowIcon />
          <span>Top</span>
        </div>
        <div
          onClick={() => router.push('/')}
          className={styles.item}>
          <HomeIcon />
          <span>Home</span>
        </div>
      </div>
      }
    </>
  );
}