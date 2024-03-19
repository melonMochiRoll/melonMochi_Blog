import React, { FC } from 'react';
import styled from '@emotion/styled';
import mainBgImage from '@Assets/images/main_background.jpg';
import HeaderNavigator from '@Components/HeaderNavigator';
import Tags from '@Components/Tags';

const ListHeader: FC = () => {
  return (
    <Block>
      <Cover>
        <HeaderNavigator />
        <ListInfo>
          <Title>최근 글</Title>
          <Tags />
        </ListInfo>
      </Cover>
    </Block>
  );
};

export default ListHeader;

const Block = styled.header`
  width: 100%;
  height: 600px;
  background-image: url(${mainBgImage});
  background-size: cover;
  background-position-y: center;
`;

const Cover = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
  padding-bottom: 40px;
  gap: 50px;
`;

const Title = styled.h1`
  font-size: 64px;
  font-weight: 800;
  color: #fff;
  margin: 0;
`;