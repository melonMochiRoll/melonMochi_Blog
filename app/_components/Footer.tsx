import styles from '@/App/_components/styles/Footer.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';

export default function Footer() {
  const GITHUB_URL = 'https://github.com/melonMochiRoll';
  
  return (
    <footer className={styles.footer}>
      <Link
        href={GITHUB_URL}
        target='_blank'
        className={styles.item}
        >
        <GitHubIcon sx={{ fontSize: '42px' }} />
      </Link>
      <a href="https://hits.sh/melon-mochi-dev.vercel.app/">
        <img
          alt="Hits"
          src="https://hits.sh/melon-mochi-dev.vercel.app.svg?view=today-total&style=for-the-badge&label=VISITS&extraCount=18&color=66B3FF&labelColor=66B3FF"/>
      </a>
      <span className={styles.copyright}>© 2024 MelonMochi's Blog. All Rights Reserved.</span>
    </footer>
  );
};