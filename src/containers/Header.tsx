import React, { FC } from 'react';
import styled from '@emotion/styled';

const Header: FC = () => {
  return (
    <Block>
      <Nav>
        <span>Logo</span>
        <span>Search</span>
        <span>Nav</span>
      </Nav>
    </Block>
  );
};

export default Header;

const Block = styled.header`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ced4da;
`;

const Nav = styled.nav`
  width: 850px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 300px;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;