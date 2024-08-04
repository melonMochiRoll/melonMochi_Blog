import styles from '@/App/post/[tag]/[fileName]/_components/styles/PostHeader.module.css';
import { TMetadata } from '@/Lib/typing';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import Link from 'next/link';
import { CSSProperties } from 'react';

type TPostHeaderProps = {
  metadata: TMetadata,
};

export default function PostHeader({
  metadata,
}: TPostHeaderProps) {
  const { title, tag, thumbnail, createdAt } = metadata;

  const headerStyle: CSSProperties = {
    backgroundImage: `url(${thumbnail})`,
  };

  return (
    <header
      style={headerStyle}
      className={styles.header}>
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