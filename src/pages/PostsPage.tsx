import React, { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Header from '@Containers/Header';
import Main from '@Containers/Main';
import { getPostsByTag } from '@Posts/index';
import { useSearchParams } from 'react-router-dom';
import { TPostInfo } from '@Typings/post';

const PostsPage: FC = () => {
  const [ tagsParams ] = useSearchParams();
  const [ posts, setPosts ] = useState<TPostInfo[]>([]);
  const [ canLoadMore, setCanLoadMore ] = useState(true);
  const currentTag = tagsParams.get('tags') || '';
  const cursor = useRef(0);

  useEffect(() => {
    cursor.current = 0;
    setCanLoadMore(true);
  }, [tagsParams]);

  useEffect(() => {
    const { posts, lastCursor } = getPostsByTag(currentTag, 0);

    if (posts.length < 6) {
      setCanLoadMore(false);
    }

    setPosts(posts);
    cursor.current = lastCursor;
  }, [tagsParams]);
  
  const getMorePosts = () => {
    const { posts, lastCursor } = getPostsByTag(currentTag, cursor.current);

    if (posts.length < 6) {
      setCanLoadMore(false);
    }

    setPosts(prev => [...prev, ...posts]);
    cursor.current = lastCursor;
  };

  return (
    <Block>
      <Header
        currentTag={currentTag} />
      <Main
        posts={posts}
        getMorePosts={getMorePosts}
        canLoadMore={canLoadMore} />
    </Block>
  );
};

export default PostsPage;

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;