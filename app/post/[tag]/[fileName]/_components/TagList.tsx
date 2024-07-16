import styles from '@/App/post/[tag]/[fileName]/_components/styles/TagList.module.css';
import { TTags } from '@/Lib/typing';
import Link from 'next/link';

type TTagListProps = {
  tags: TTags[],
};

export default function TagList({
  tags,
}: TTagListProps) {
  return (
    <div className={styles.tags}>
      <strong>TAG LIST</strong>
      <div className={styles.tagList}>
        {
          tags.map((ele: TTags, idx: number) => {
            return (
              <Link
                key={ele?.tag + idx}
                href={`/posts/${ele?.tag}`}>
                {ele?.tag}
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}