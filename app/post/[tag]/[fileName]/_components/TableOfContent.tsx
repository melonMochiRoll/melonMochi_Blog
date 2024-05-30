'use client';

import styles from '@/App/post/[tag]/[fileName]/_components/styles/TableOfContent.module.css';
import ScrollControl from './ScrollControl';
import { TTableOfContent } from '@/Lib/typing';
import useHeadingTracker from '@/App/_hooks/useHeadingTracker';

type TTableOfContentProps = {
  toc: TTableOfContent[],
};

export default function TableOfContent({
  toc,
}: TTableOfContentProps) {
  const [ activeId ] = useHeadingTracker('h2, h3');

  return (
    <div className={styles.sticky}>
      <strong>CONTENTS</strong>
      <div className={styles.tocList}>
        {
          toc.map((ele: TTableOfContent, idx: number) => {
            const className = ele.id === activeId ? styles.active : styles.inactive;

            if (ele.indent) {
              return <a
                key={ele.id + idx}
                href={ele.id}
                className={`${className} ${styles.indent}`}>
                  {ele.title}
                </a>
            }

            return <a
              key={ele.id + idx}
              href={ele.id}
              className={className}>
                {ele.title}
              </a>
          })
        }
      </div>
      <ScrollControl />
    </div>
  );
}