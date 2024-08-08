import styles from '@/App/_components/styles/Header.module.css';
import Tag from '@/App/_components/Tag';
import { getTags } from '@/Lib/post';
import { TTags } from '@/Lib/typing';
import Image from 'next/image';

type THeaderProps = {
  tag?: string,
};

export default async function Header({
  tag = '',
}: THeaderProps) {
  const tags = await getTags();
  const headerBgSrc = '/images/main_bg.jpg';

  return (
    <header className={styles.header}>
      <Image
        className={styles.bgWrap}
        fill
        alt='background'
        src={headerBgSrc}
        quality={80}
        priority={true} />
      <div className={styles.cover}>
        <div className={styles.listInfo}>
          <section className={styles.topSection}>
            <h1 className={styles.h1}>{tag || '최근 글'}</h1>
          </section>
          <section className={styles.bottomSection}>
            <h2 className={styles.h2}>Tags</h2>
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