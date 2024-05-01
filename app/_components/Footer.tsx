import styles from '@/App/_components/styles/Footer.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';

export default function Footer() {
  const GITHUB_URL = 'https://github.com/melonMochiRoll';
  
  return (
    <footer className={styles.footer}>
      <Link
        href={`${GITHUB_URL}`}
        target='_blank'
        className={styles.item}
        >
        <GitHubIcon fontSize='large' />
        <span>GitHub</span>
      </Link>
    </footer>
  );
};