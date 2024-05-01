import styles from '@/App/_components/styles/Article.module.css';
import Link from 'next/link';

type TArticleProps = {
  article: any,
};

export default function Article({
  article,
}: TArticleProps) {
  const { fileName, title, tag, description, thumbnail, createdAt } = article;

  return (
    <article className={styles.article}>
      <div className={styles.left}>
        <div className={styles.tagDisplay}>
          {tag}
        </div>
        <Link
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
        <div className={styles.thumbnail} />
      </div>
    </article>
  );
}