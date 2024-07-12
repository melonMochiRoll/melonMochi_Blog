import { getPostsByTag } from "@/Lib/post";
import { TMetaData } from "@/Lib/typing";
import { useEffect, useState } from "react";

type TUsePostDataReturnType = {
  posts: TMetaData[],
  isLoading: boolean,
  canLoadMore: boolean,
  setCursor: React.Dispatch<React.SetStateAction<number>>,
};

export default function usePostsData(tag: string): TUsePostDataReturnType {
  const [ posts, setPosts ] = useState<TMetaData[]>([]);
  const [ cursor, setCursor ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ canLoadMore, setCanLoadMore ] = useState(true);

  useEffect(() => {
    if (cursor < 1) {
      getPostsByTag(tag)
        .then(res => {
          if (res?.length < 6) {
            setCanLoadMore(false);
          }
          setPosts(res);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    if (cursor > 0) {
      getPostsByTag(tag, cursor)
        .then(res => {
          if (res?.length < 6) {
            setCanLoadMore(false);
          }
          setPosts((prev: TMetaData[]) => [ ...prev, ...res ]);
        })
        .finally(() => setIsLoading(false))
    }
  }, [cursor]);

  return {
    posts,
    isLoading,
    canLoadMore,
    setCursor,
  };
}