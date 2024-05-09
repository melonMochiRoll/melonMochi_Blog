'use client';

import styles from '@/App/_components/styles/Modal.module.css';
import { useRouter } from 'next/navigation';

type TModalProps = {
  children: React.ReactNode,
};

export default function Modal({
  children,
}: TModalProps) {
  const router = useRouter();
  
  return (
    <div
      className={styles.modalBackground}
      onClick={router.back}>
      {children}
    </div>
  );
}