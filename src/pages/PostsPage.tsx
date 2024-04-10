import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Header from '@Containers/Header';
import Main from '@Containers/Main';
import { getPostsByTag } from '@Posts/index';
import { useSearchParams } from 'react-router-dom';
import Footer from '@Containers/Footer';

const PostsPage: FC = () => {
  const [ tagsParam ] = useSearchParams();
  const tag = tagsParam.get('tags') || '';
  const [ info, setInfo ] = useState(getPostsByTag(tag));
  const [ canLoadMore, setCanLoadMore ] = useState(true);

  useEffect(() => {
    setCanLoadMore(true);
  }, [tag]);
  
  useEffect(() => {
    const { posts, cursor } = getPostsByTag(tag);

    if (posts.length < 6) {
      setCanLoadMore(false);
    }

    setInfo(() => {
      return {
        posts,
        cursor,
      };
    });
  }, [tag]);
  
  const getMorePosts = useCallback(() => {
    const { posts, cursor } = getPostsByTag(tag, info.cursor);

    if (posts.length < 6) {
      setCanLoadMore(false);
    }

    setInfo((prev: any) => {
      return {
        posts: [ ...prev.posts, ...posts ],
        cursor,
      };
    });
  }, [info.cursor]);

  return (
    <Block>
      <Header
        currentTag={tag} />
      <Main
        posts={info.posts}
        getMorePosts={getMorePosts}
        canLoadMore={canLoadMore} />
      <Footer />
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