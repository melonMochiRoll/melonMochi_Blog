import React, { FC } from 'react';
import styled from '@emotion/styled';
import mainBgImage from '@Assets/images/main_background.jpg';
import HeaderNavigator from '@Components/HeaderNavigator';

const ListHeader: FC = () => {
  return (
    <Block>
      <Cover>
        <HeaderNavigator />
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
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;