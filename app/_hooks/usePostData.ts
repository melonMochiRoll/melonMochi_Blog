import { getRecentPosts } from "@/Lib/post";
import { TPagination } from "@/Lib/typing";
import { useEffect, useState } from "react";

type TUsePostDataReturnType = {
  pagination: TPagination,
  isLoading: boolean,
  loadMore: () => Promise<void>,
  canLoadMore: boolean,
};

export default function usePostData(): TUsePostDataReturnType {
  const [ pagination, setPagination ] = useState<TPagination>({ cursor: 0, posts: [] });
  const [ isLoading, setIsLoading ] = useState(true);
  const [ canLoadMore, setCanLoadMore ] = useState(true);

  useEffect(() => {
    getPosts(pagination.cursor);
  }, []);

  const getPosts = async (cursor: number) => {
    setIsLoading(true);
    const result = await getRecentPosts(cursor);

    if (result.posts.length < 6) {
      setCanLoadMore(false);
    }

    setPagination(result);
    setIsLoading(false);
  };

  const loadMore = async () => {
    setIsLoading(true);
    const result = await getRecentPosts(pagination.cursor);

    if (result.posts.length < 6) {
      setCanLoadMore(false);
    }

    setPagination((prev: TPagination) => {
      return {
        cursor: result.cursor,
        posts: [ ...prev.posts, ...result.posts ],
      };
    });
    setIsLoading(false);
  };

  return {
    pagination,
    isLoading,
    loadMore,
    canLoadMore,
  };
}