import { useEffect, useState } from "react";
import useInput from "./useInput";
import { getPostsByQuery } from "@/Lib/post";
import { TPagination } from "@/Lib/typing";

type TUseSearchReturnType = {
  query: string,
  onChangeQuery: (e: any) => void,
  pagination: TPagination,
  isLoading: boolean,
  loadMore: () => Promise<void>,
  canLoadMore: boolean,
};

export default function useSearch(): TUseSearchReturnType {
  const [ query, onChangeQuery ] = useInput('');
  const [ pagination, setPagination ] = useState<TPagination>({ cursor: 0, posts: [] });
  const [ isLoading, setIsLoading ] = useState(true);
  const [ canLoadMore, setCanLoadMore ] = useState(true);

  useEffect(() => {
    if (query) {
      const delay = setTimeout(() => {
        getSearchResult(0, query);
      }, 500);
  
      return () => {
        clearTimeout(delay);
      };
    }
  }, [query]);

  const getSearchResult = async (currentCursor: number, query: string) => {
    setIsLoading(true);
    const { cursor, posts } = await getPostsByQuery(currentCursor, query);

    if (posts.length < 10) {
      setCanLoadMore(false);
    }

    setPagination({ cursor, posts });
    setIsLoading(false);
  };

  const loadMore = async () => {
    setIsLoading(true);
    const { cursor, posts } = await getPostsByQuery(pagination.cursor, query);

    if (posts.length < 10) {
      setCanLoadMore(false);
    }

    setPagination((prev: TPagination) => {
      return {
        cursor,
        posts: [ ...prev.posts, ...posts ],
      };
    });
    setIsLoading(false);
  };

  return {
    query,
    onChangeQuery,
    pagination,
    isLoading,
    loadMore,
    canLoadMore,
  };
}