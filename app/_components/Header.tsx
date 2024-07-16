import styles from '@/App/_components/styles/Header.module.css';
import Tag from '@/App/_components/Tag';
import { getTags } from '@/Lib/post';
import { TTags } from '@/Lib/typing';

type THeaderProps = {
  tag?: string,
};

export default async function Header({
  tag = '',
}: THeaderProps) {
  const tags = await getTags();

  return (
    <header className={styles.header}>
      <div className={styles.cover}>
        <div className={styles.listInfo}>
          <h1 className={styles.title}>
            {tag || '최근 글'}
          </h1>
          <section className={styles.section}>
            <h2 className={styles.h2}>
              Tags
            </h2>
            <section className={styles.tagsSection}>
              {
                tags.map((ele: TTags, idx: number) => {
                  return (
                    <Tag 
                      key={idx}
                      tags={ele}
                      isActive={ele?.tag === tag} />
                  );
                })
              }
            </section>
          </section>
        </div>
      </div>
    </header>
  );
}