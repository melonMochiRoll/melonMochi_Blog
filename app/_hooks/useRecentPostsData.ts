import { getRecentPosts } from "@/Lib/post";
import { TMetadata } from "@/Lib/typing";
import { useEffect, useState } from "react";

type TUseRecentPostsDataReturnType = {
  posts: TMetadata[],
  isLoading: boolean,
  canLoadMore: boolean,
  nextCursor: () => void,
};

export default function useRecentPostsData(): TUseRecentPostsDataReturnType {
  const [ posts, setPosts ] = useState<TMetadata[]>([]);
  const [ cursor, setCursor ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ canLoadMore, setCanLoadMore ] = useState(true);

  useEffect(() => {
    if (cursor < 1) {
      getRecentPosts()
        .then(res => {
          if (res?.length < 6) {
            setCanLoadMore(false);
          }
          setPosts(res);
        })
        .catch(() => {
          setPosts([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    if (cursor > 0) {
      getRecentPosts(cursor)
        .then(res => {
          if (res?.length < 6) {
            setCanLoadMore(false);
          }
          setPosts((prev: TMetadata[]) => [ ...prev, ...res ]);
        })
        .catch(() => {
          setPosts([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [cursor]);

  return {
    posts,
    isLoading,
    canLoadMore,
    nextCursor: () => setCursor(prev => prev + 1),
  };
}