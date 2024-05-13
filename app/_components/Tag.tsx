import styles from '@/App/_components/styles/Tag.module.css';
import Link from 'next/link';

type TTagProps = {
  tagName: string,
  isActive: boolean,
};

export default function Tag({
  tagName,
  isActive,
}: TTagProps) {
  const href = isActive ? '/' : `/posts/${tagName}`;
  const status = isActive ? styles.active : styles.inactive;
  
  return (
    <Link
      prefetch
      href={href}>
      <div className={`${styles.tag} ${status}`}>
        {tagName}
      </div>
    </Link>
  );
}