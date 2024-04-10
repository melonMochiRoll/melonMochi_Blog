import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import Main from '@Containers/Main';
import Header from '@Containers/Header';
import { getPosts } from '@Posts/index';
import Footer from '@Containers/Footer';

const MainPage: FC = () => {
  const [ info, setInfo ] = useState(getPosts());
  const [ canLoadMore, setCanLoadMore ] = useState(true);
  
  const getMorePosts = useCallback(() => {
    const { posts, cursor } = getPosts(info.cursor);

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
      <Header />
      <Main
        posts={info.posts}
        getMorePosts={getMorePosts}
        canLoadMore={canLoadMore} />
      <Footer />
    </Block>
  );
};

export default MainPage;

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;