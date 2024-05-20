import styles from '@/App/post/[tag]/[fileName]/_components/styles/PostHeader.module.css';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import Link from 'next/link';
import { CSSProperties } from 'react';

type TPostHeaderProps = {
  info: {
    [key: string]: any,
  },
};

export default function PostHeader({
  info,
}: TPostHeaderProps) {
  const { title, tag, thumbnail, createdAt } = info;

  const headerStyle: CSSProperties = {
    width: '100%',
    height: '600px',
    backgroundImage: `url(${thumbnail})`,
    backgroundSize: 'cover',
    backgroundPositionY: 'center',
  };

  return (
    <header style={headerStyle}>
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