'use client';

import styles from './styles/SearchResult.module.css';
import recentPostsStyles from '@/App/_components/styles/RecentPosts.module.css';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/SearchRounded';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { CircularProgress } from '@mui/material';
import { TMetaData } from '@/Lib/typing';

type TSearchResultProps = {
  query: string,
  posts: TMetaData[],
  isLoading: boolean,
  canLoadMore: boolean,
  nextCursor: () => void,
};

export default function SearchResult({
  query,
  posts,
  isLoading,
  canLoadMore,
  nextCursor,
}: TSearchResultProps) {
  const router = useRouter();

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
          {
            canLoadMore ?
            <button
              onClick={nextCursor}
              className={recentPostsStyles.loadMore}>
              Load More
            </button> :
            <button
              disabled
              className={recentPostsStyles.loadMore}>
              목록 없음
            </button>
          }
        </ul> :
        <>
          <ErrorIcon className={styles.errorIcon} />
          <span className={styles.span}>
            {`"${query}" 에 대한 검색 결과가 없습니다.`}
          </span>
        </>
      }
    </main>
  );
}