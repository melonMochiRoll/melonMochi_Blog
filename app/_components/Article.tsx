import styles from '@/App/_components/styles/Article.module.css';
import { TMetaData } from '@/Lib/typing';
import Link from 'next/link';
import { CSSProperties } from 'react';

type TArticleProps = {
  article: TMetaData,
};

export default function Article({
  article,
}: TArticleProps) {
  const { fileName, title, tag, description, thumbnail, createdAt } = article;

  const thumbnailStyle: CSSProperties = {
    width: '100%',
    height: '150px',
    backgroundImage: `url(${thumbnail})`,
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
  };

  return (
    <article className={styles.article}>
      <div className={styles.left}>
        <Link
          href={`/posts/${tag}`}
          className={styles.tagDisplay}>
          {tag}
        </Link>
        <Link
          prefetch
          href={`/post/${tag}/${fileName}`}
          className={styles.title}>
          {title}
        </Link>
        <span className={styles.description}>
          {description}
        </span>
        <span className={styles.createdAt}>
          {createdAt}
        </span>
      </div>
      <div className={styles.right}>
        <Link
          href={`/post/${tag}/${fileName}`}
          style={thumbnailStyle} />
      </div>
    </article>
  );
}