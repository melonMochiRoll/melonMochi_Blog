import styles from '@/App/_components/styles/Article.module.css';
import { TMetaData } from '@/Lib/typing';
import Link from 'next/link';
import Image from 'next/image';

type TArticleProps = {
  article: TMetaData,
};

export default function Article({
  article,
}: TArticleProps) {
  const { fileName, title, tag, description, thumbnail, createdAt } = article;

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
          className={styles.thumbnail}>
          <Image
            fill
            className={styles.img}
            src={thumbnail}
            alt={title} />
        </Link>
      </div>
    </article>
  );
}