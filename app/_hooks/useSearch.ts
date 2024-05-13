import { useEffect, useState } from "react";
import useInput from "./useInput";
import { getPostsByQuery } from "@/Lib/post";
import { TPagination } from "@/Lib/typing";

export const enum ESearchStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  ERROR = 'error',
};

type TUseSearchReturnType = {
  query: string,
  onChangeQuery: (e: any) => void,
  pagination: TPagination,
  status: ESearchStatus,
  loadMore: () => Promise<void>,
  canLoadMore: boolean,
};

export default function useSearch(): TUseSearchReturnType {
  const [ query, onChangeQuery ] = useInput('');
  const [ pagination, setPagination ] = useState<TPagination>({ cursor: 0, posts: [] });
  const [ status, setStatus ] = useState<ESearchStatus>(ESearchStatus.PENDING);
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
    try {
      setStatus(ESearchStatus.PENDING);
      const { cursor, posts } = await getPostsByQuery(currentCursor, query);

      if (posts.length < 10) {
        setCanLoadMore(false);
      }

      setPagination({ cursor, posts });
      setStatus(ESearchStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setStatus(ESearchStatus.ERROR);
    }
  };

  const loadMore = async () => {
    try {
      setStatus(ESearchStatus.PENDING);
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
      setStatus(ESearchStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setStatus(ESearchStatus.ERROR);
    }
  };

  return {
    query,
    onChangeQuery,
    pagination,
    status,
    loadMore,
    canLoadMore,
  };
}