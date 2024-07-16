import styles from '@/App/_components/styles/Tag.module.css';
import { TTags } from '@/Lib/typing';
import Link from 'next/link';

type TTagProps = {
  tags: TTags,
  isActive: boolean,
};

export default function Tag({
  tags,
  isActive,
}: TTagProps) {
  const href = isActive ? '/' : `/posts/${tags?.tag}`;
  const status = isActive ? styles.active : styles.inactive;
  
  return (
    <Link
      prefetch
      scroll={false}
      href={href}>
      <div className={`${styles.tag} ${status}`}>
        {`${tags?.tag} (${tags?.count})`}
      </div>
    </Link>
  );
}