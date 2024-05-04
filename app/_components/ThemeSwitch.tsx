'use client';

import styles from '@/App/_components/styles/Navigator.module.css';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LightIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

export default function ThemeSwitch() {
  const [ mounted, setMounted ] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const onClickHandler = () => {
    theme === 'light' ?
      setTheme('dark') :
      setTheme('light');
  };

  return (
    <button
      className={styles.button}
      onClick={onClickHandler}>
      {theme === 'light' ?
        <LightIcon /> :
        <ModeNightIcon />}
    </button>
  );
}