import styles from '@/App/post/[tag]/[fileName]/_components/styles/TableOfContent.module.css';
import ScrollControl from './ScrollControl';
import { TTableOfContent } from '@/Lib/typing';
import Link from 'next/link';

type TTableOfContentProps = {
  toc: TTableOfContent[],
};

export default function TableOfContent({
  toc,
}: TTableOfContentProps) {
  return (
    <div className={styles.sticky}>
      <strong>CONTENTS</strong>
      <div className={styles.tocList}>
        {
          toc.map((ele: TTableOfContent, idx: number) => {
            return <Link
              key={ele.id + idx}
              href={ele.id}>
                {ele.title}
              </Link>
          })
        }
      </div>
      <ScrollControl />
    </div>
  );
}