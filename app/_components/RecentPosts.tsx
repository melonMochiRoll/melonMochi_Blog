'use client';

import styles from '@/App/_components/styles/RecentPosts.module.css';
import Article from '@/App/_components/Article';
import { TMetaData, getRecentPosts } from '@/Lib/post';
import { useEffect, useState } from 'react';
import LoadingPosts from '@/App/_components/LoadingPosts';

type TPagination = {
  cursor: number,
  posts: TMetaData[],
};

export default function RecentPosts() {
  const [ pagination, setPagination ] = useState<TPagination>({ cursor: 0, posts: [] });
  const [ isLoading, setIsLoading ] = useState(true);
  const [ canLoadMore, setCanLoadMore ] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const result = await getRecentPosts(pagination.cursor);
    setIsLoading(false);

    if (result.posts.length < 6) {
      setCanLoadMore(false);
    }

    setPagination(result);
  };

  const loadMore = async () => {
    setIsLoading(true);

    const result = await getRecentPosts(pagination.cursor);
    setIsLoading(false);

    if (result.posts.length < 6) {
      setCanLoadMore(false);
    }

    setPagination((prev: TPagination) => {
      return {
        cursor: result.cursor,
        posts: [ ...prev.posts, ...result.posts ],
      };
    });
  };
  
  return (
    <main className={styles.main}>
      {pagination.posts.map((ele: TMetaData, idx: number) => {
        return (
          <Article
            key={idx}
            article={ele} />
        );
      })}
      {isLoading && <LoadingPosts />}
      {canLoadMore ?
        <button
          onClick={loadMore}
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