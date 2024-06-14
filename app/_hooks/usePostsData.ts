import { getPostsByTag } from "@/Lib/post";
import { TPagination } from "@/Lib/typing";
import { useEffect, useState } from "react";

type TUsePostDataReturnType = {
  pagination: TPagination,
  isLoading: boolean,
  loadMore: () => Promise<void>,
  canLoadMore: boolean,
};

export default function usePostsData(tag: string): TUsePostDataReturnType {
  const [ pagination, setPagination ] = useState<TPagination>({ cursor: 0, posts: [] });
  const [ isLoading, setIsLoading ] = useState(true);
  const [ canLoadMore, setCanLoadMore ] = useState(true);

  useEffect(() => {
    getPosts(pagination.cursor, tag);
  }, []);

  const getPosts = async (cursor: number, tag: string) => {
    setIsLoading(true);
    const result = await getPostsByTag(cursor, tag);

    if (result.posts.length < 6) {
      setCanLoadMore(false);
    }

    setPagination(result);
    setIsLoading(false);
  };

  const loadMore = async () => {
    setIsLoading(true);
    const result = await getPostsByTag(pagination.cursor, tag);

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