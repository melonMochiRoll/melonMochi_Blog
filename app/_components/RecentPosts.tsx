'use client';

import styles from '@/App/_components/styles/RecentPosts.module.css';
import Article from '@/App/_components/Article';
import LoadingPosts from '@/App/_components/LoadingPosts';
import { TMetaData } from '@/Lib/typing';
import useRecentPostsData from '@/App/_hooks/useRecentPostsData';

export default function RecentPosts() {
  const {
    posts,
    isLoading,
    canLoadMore,
    nextCursor,
  } = useRecentPostsData();

  return (
    <main className={styles.main}>
      {posts.map((ele: TMetaData, idx: number) => {
        return (
          <Article
            key={idx}
            article={ele} />
        );
      })}
      {isLoading && <LoadingPosts />}
      {canLoadMore ?
        <button
          onClick={nextCursor}
          className={styles.loadMore}>
          Load More
        </button> :
        <button
          disabled
          className={styles.loadMore}>
          목록 없음
        </button>}
    </main>
  );
}