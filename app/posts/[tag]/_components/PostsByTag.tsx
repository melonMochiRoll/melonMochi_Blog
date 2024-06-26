'use client';

import Article from "@/App/_components/Article";
import LoadingPosts from "@/App/_components/LoadingPosts";
import styles from "@/App/_components/styles/RecentPosts.module.css";
import usePostsData from "@/App/_hooks/usePostsData";
import { TMetaData } from "@/Lib/typing";

type TPostsByTagProps = {
  tag: string,
};

export default function PostsByTag({
  tag,
}: TPostsByTagProps) {
  const {
    pagination,
    isLoading,
    loadMore,
    canLoadMore,
  } = usePostsData(tag);
  
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