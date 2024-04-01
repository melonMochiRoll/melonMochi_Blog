import React, { FC, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Main from '@Containers/Main';
import Header from '@Containers/Header';
import { getPosts } from '@Posts/index';
import Footer from '@Containers/Footer';

const MainPage: FC = () => {
  const [ posts, setPosts ] = useState(getPosts(0, 6));
  const [ canLoadMore, setCanLoadMore ] = useState(true);
  const loadCount = useRef(1);
  
  const getMorePosts = () => {
    const cursor = loadCount.current * 6;
    const morePosts = getPosts(0 + cursor, 6 + cursor);

    if (morePosts.length < 6) {
      setCanLoadMore(false);
    }

    setPosts((prev) => [...prev, ...morePosts]);
    ++loadCount.current;
  };
  
  return (
    <Block>
      <Header />
      <Main
        posts={posts}
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