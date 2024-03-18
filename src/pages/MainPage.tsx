import React, { FC } from 'react';
import styled from '@emotion/styled';
import Main from '@Containers/Main';
import ListHeader from '@Containers/ListHeader';

const MainPage: FC = () => {
  return (
    <Block>
      <ListHeader />
      <Main />
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