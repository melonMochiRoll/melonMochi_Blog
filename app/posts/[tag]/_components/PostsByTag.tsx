'use client';

import Article from "@/App/_components/Article";
import LoadingPosts from "@/App/_components/LoadingPosts";
import styles from "@/App/_components/styles/RecentPosts.module.css";
import { getPostsByTag } from "@/Lib/post";
import { TMetaData } from "@/Lib/typing";
import { useEffect, useState } from "react";

type TPagination = {
  cursor: number,
  posts: TMetaData[],
};

type TPostsByTagProps = {
  tag: string,
};

export default function PostsByTag({
  tag,
}: TPostsByTagProps) {
  const [ pagination, setPagination ] = useState<TPagination>({ cursor: 0, posts: [] });
  const [ isLoading, setIsLoading ] = useState(true);
  const [ canLoadMore, setCanLoadMore ] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const result = await getPostsByTag(pagination.cursor, tag);
    setIsLoading(false);

    if (result.posts.length < 6) {
      setCanLoadMore(false);
    }

    setPagination(result);
  };

  const loadMore = async () => {
    setIsLoading(true);

    const result = await getPostsByTag(pagination.cursor, tag);
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