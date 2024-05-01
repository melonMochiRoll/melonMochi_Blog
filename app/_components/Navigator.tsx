import styles from '@/App/_components/styles/Navigator.module.css';
import SearchIcon from '@mui/icons-material/SearchRounded';
import Link from 'next/link';

// Searchbar 모달 필요
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
        <div className={styles.searchBar}>
          <SearchIcon
            sx={{ color: '#64b5f6'}} />
          <span>Search...</span>
        </div>
      </div>
    </nav>
  );
};