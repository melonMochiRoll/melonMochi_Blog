'use client';

import styles from './styles/SearchResult.module.css';
import recentPostsStyles from '@/App/_components/styles/RecentPosts.module.css';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/SearchRounded';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { CircularProgress } from '@mui/material';
import { TMetaData, TPagination } from '@/Lib/typing';

type TSearchResultProps = {
  query: string,
  pagination: TPagination,
  isLoading: boolean,
  loadMore: () => Promise<void>,
  canLoadMore: boolean,
};

export default function SearchResult({
  query,
  pagination,
  isLoading,
  loadMore,
  canLoadMore,
}: TSearchResultProps) {
  const router = useRouter();
  const { posts } = pagination;

  if (!query) {
    return (
      <main className={styles.main}>
        <SearchIcon className={styles.searchIcon} />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className={styles.main}>
        <CircularProgress size={70}/>
      </main>
    );
  }

  const onClickItem = (tag: string, fileName: string) => {
    router.push(`/post/${tag}/${fileName}`);
  };

  return (
    <main className={styles.main}>
      {
        posts.length ?
        <ul className={styles.searchList}>
          {
            posts.map((ele: TMetaData, idx: number) => {
              const { fileName, title, tag } = ele;

              return (
                <li
                  key={idx}
                  onClick={() => onClickItem(tag, fileName)}
                  className={styles.searchItem}>
                  <span className={styles.span}>{title}</span>
                  <div className={styles.tagDisplay}>{tag}</div>
                </li>
              );
            })
          }
        </ul> :
        <>
          <ErrorIcon className={styles.errorIcon} />
          <span className={styles.span}>
            {`"${query}" 에 대한 검색 결과가 없습니다.`}
          </span>
        </>
      }
      {
        canLoadMore ?
        <button
          onClick={loadMore}
          className={recentPostsStyles.loadMore}>
          Load More
        </button> :
        <button
          disabled
          className={recentPostsStyles.loadMore}>
          목록 없음
        </button>
      }
    </main>
  );
}