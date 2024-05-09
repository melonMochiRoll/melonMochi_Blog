'use client';

import styles from './styles/SearchModal.module.css';
import { usePathname, useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/SearchRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import SearchResult from './SearchResult';
import useSearch from '@/App/_hooks/useSearch';
import Modal from '@/App/_components/Modal';

export default function SearchModal() {
  const router = useRouter();
  const pathname = usePathname();
  const { pagination, status, query, onChangeQuery } = useSearch();

  if (!pathname.includes('search')) {
    return null;
  }

  return (
    <Modal>
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}>
        <header className={styles.searchBar}>
          <SearchIcon
            fontSize='large'
            sx={{ color: '#006bd6' }} />
          <input
            value={query}
            onChange={onChangeQuery}
            className={styles.input} />
          <CloseIcon
            onClick={router.back}
            className={styles.close} />
        </header>
        <SearchResult
          query={query}
          pagination={pagination}
          status={status} />
        <footer className={styles.footer} />
      </div>
    </Modal>
  );
}