import styles from '@/App/_components/styles/Navigator.module.css';
import SearchIcon from '@mui/icons-material/SearchRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';

export default function Navigator() {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link
          href='/'>
          <strong className={styles.logo}>
            MELONMOCHI'S BLOG
          </strong>
        </Link>
      </div>
      <div className={styles.right}>
        <Link
          prefetch
          scroll={false}
          href='/search'>
          <div className={styles.searchBar}>
            <SearchIcon
              sx={{ color: 'var(--primary-color)'}} />
            <span>Search...</span>
          </div>
        </Link>
        <Link
          href='https://github.com/melonMochiRoll'
          target='_blank'>
          <button
            className={styles.button}>
            <GitHubIcon
              sx={{ color: 'var(--primary-color)'}}/>
          </button>
        </Link>
        <ThemeSwitch />
      </div>
    </nav>
  );
};