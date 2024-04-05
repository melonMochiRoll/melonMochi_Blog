import useInput from "@Hooks/useInput";
import { getPostsBySearchQuery } from "@Posts/index";
import { TPostInfo } from "@Typings/post";
import { useEffect, useState } from "react";

export const enum ESearchStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
};

type TUseSearchReturnType = {
  query: string,
  onChangeQuery: (e: any) => void;
  searchResult: TPostInfo[];
  searchStatus: ESearchStatus;
};

const useSearch = (): TUseSearchReturnType => {
  const [ query, onChangeQuery ] = useInput('');
  const [ searchResult, setSearchResult ] = useState<TPostInfo[]>([]);
  const [ searchStatus, setSearchStatus ] = useState<ESearchStatus>(ESearchStatus.PENDING);

  useEffect(() => {
    setSearchStatus(ESearchStatus.PENDING);

    const delay = setTimeout(() => {
      if (query) {
        getPostsBySearchQuery(query)
        .then(res => {
          setSearchResult(res);
          setSearchStatus(ESearchStatus.SUCCESS);
        })
        .catch(err => {
          console.error(err);
          setSearchResult([]);
          setSearchStatus(ESearchStatus.ERROR);
        });
      }
    }, 500);
    
    return () => {
      clearTimeout(delay);
    };
  }, [query]);

  return {
    query,
    onChangeQuery,
    searchResult,
    searchStatus,
  };
};

export default useSearch;