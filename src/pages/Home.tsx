import React, { FC } from 'react';
import styled from '@emotion/styled';
import Header from '@Containers/Header';
import Main from '@Containers/Main';

const Home: FC = () => {
  return (
    <Block>
      <Header />
      <Main />
    </Block>
  );
};

export default Home;

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;