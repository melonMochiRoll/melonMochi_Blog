import styles from '@/App/post/[tag]/[fileName]/_components/styles/TagList.module.css';
import Link from 'next/link';

type TTagListProps = {
  tags: string[],
};

export default function TagList({
  tags,
}: TTagListProps) {
  return (
    <div className={styles.tags}>
      <strong>TAG LIST</strong>
      <div className={styles.tagList}>
        {
          tags.map((tag: string, idx: number) => {
            return (
              <Link
                key={tag + idx}
                href={`/posts/${tag}`}>
                {tag}
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}