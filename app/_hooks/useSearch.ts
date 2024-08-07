import { useEffect, useState } from "react";
import useInput from "./useInput";
import { getPostsByQuery } from "@/Lib/post";
import { TMetadata } from "@/Lib/typing";

type TUseSearchReturnType = {
  query: string,
  onChangeQuery: (e: any) => void,
  posts: TMetadata[],
  isLoading: boolean,
  canLoadMore: boolean,
  nextCursor: () => void,
};

export default function useSearch(): TUseSearchReturnType {
  const [ query, onChangeQuery ] = useInput('');
  const [ posts, setPosts ] = useState<TMetadata[]>([]);
  const [ cursor, setCursor ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ canLoadMore, setCanLoadMore ] = useState(true);

  useEffect(() => {
    if (query) {
      const delay = setTimeout(() => {
        setCursor(0);
        setCanLoadMore(true);
        setIsLoading(true);
        getSearchResult(query);
      }, 500);
  
      return () => {
        clearTimeout(delay);
      };
    }
  }, [query]);

  useEffect(() => {
    if (cursor > 0) {
      setCanLoadMore(true);
      setIsLoading(true);
      loadMore(query, cursor);
    }
  }, [cursor]);

  const getSearchResult = (query: string) => {
    getPostsByQuery(query)
      .then(res => {
        if (res?.length < 10) {
          setCanLoadMore(false);
        }
        setPosts(res);
      })
      .catch(() => setPosts([]))
      .finally(() => setIsLoading(false));
  };

  const loadMore = (query: string, currentCursor: number) => {
    getPostsByQuery(query, currentCursor)
      .then(res => {
        if (res?.length < 10) {
          setCanLoadMore(false);
        }
        setPosts(prev => [ ...prev, ...res ]);
      })
      .catch(() => setPosts(prev => [ ...prev ]))
      .finally(() => setIsLoading(false));
  };

  return {
    query,
    onChangeQuery,
    posts,
    isLoading,
    canLoadMore,
    nextCursor: () => setCursor(prev => prev + 1),
  };
}