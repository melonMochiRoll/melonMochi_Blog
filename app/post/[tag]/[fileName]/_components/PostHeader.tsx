import styles from '@/App/post/[tag]/[fileName]/_components/styles/PostHeader.module.css';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import Link from 'next/link';

type TPostHeaderProps = {
  info: {
    [key: string]: any,
  },
};

export default function PostHeader({
  info,
}: TPostHeaderProps) {
  const { title, tag, thumbnail, createdAt } = info;

  return (
    <header className={styles.header}>
      <div className={styles.cover}>
        <div className={styles.postInfo}>
          <Link
            href={`/posts/${tag}`}
            className={styles.tagPill}>
            {tag}
          </Link>
          <h1 className={styles.title}>
            {title}
          </h1>
          <div className={styles.timeDiv}>
            <CalendarIcon />
            <span className={styles.createdAt}>
              {createdAt}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}