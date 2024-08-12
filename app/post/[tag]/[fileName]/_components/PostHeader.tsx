import styles from '@/App/post/[tag]/[fileName]/_components/styles/PostHeader.module.css';
import { TMetadata } from '@/Lib/typing';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import Link from 'next/link';
import Image from 'next/image';

type TPostHeaderProps = {
  metadata: TMetadata,
};

export default function PostHeader({
  metadata,
}: TPostHeaderProps) {
  const { title, tag, thumbnail, createdAt } = metadata;

  return (
    <header className={styles.header}>
      <Image
        className={styles.bgWrap}
        fill
        alt='background'
        src={thumbnail}
        quality={80}
        priority={true} />
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