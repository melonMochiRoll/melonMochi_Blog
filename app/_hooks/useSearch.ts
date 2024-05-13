import { useEffect, useState } from "react";
import useInput from "./useInput";
import { TMetaData, getPostsByQuery } from "@/Lib/post";

export const enum ESearchStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  ERROR = 'error',
};

export type TPagination = {
  cursor: number,
  posts: TMetaData[],
};

type TUseSearchReturnType = {
  query: string,
  onChangeQuery: (e: any) => void,
  pagination: TPagination,
  status: ESearchStatus,
};

export default function useSearch(): TUseSearchReturnType {
  const [ query, onChangeQuery ] = useInput('');
  const [ pagination, setPagination ] = useState<TPagination>({ cursor: 0, posts: [] });
  const [ status, setStatus ] = useState<ESearchStatus>(ESearchStatus.PENDING);

  useEffect(() => {
    if (query) {
      const delay = setTimeout(() => {
        getSearchResult(0, query)
          .then(_ => {
            setStatus(ESearchStatus.SUCCESS);
          })
          .catch(_ => setStatus(ESearchStatus.ERROR));
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

      setPagination({ cursor, posts });
      setStatus(ESearchStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setStatus(ESearchStatus.ERROR);
    }
  };

  const loadMore = () => {}; // 추가 불러오기

  return {
    query,
    onChangeQuery,
    pagination,
    status,
  };
}