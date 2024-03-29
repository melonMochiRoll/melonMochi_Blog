import React, { FC } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';

const HeaderNavigator: FC = () => {
  const navigate = useNavigate();
  
  return (
    <Nav>
      <Left>
        <Logo
          onClick={() => navigate('/')}>
          MELONMOCHI'S BLOG
        </Logo>
      </Left>
      <Right>
        <Searchbar>
          <SearchIcon
            sx={{ color: '#64b5f6'}} />
          <span>Search...</span>
        </Searchbar>
      </Right>
    </Nav>
  );
};

export default HeaderNavigator;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  width: 60%;
  padding: 20px;

  * {
    cursor: pointer;
  }
`;

const Left = styled.div`
  display: flex;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.strong`
  font-size: 22px;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Searchbar = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #f8f9fa;
  width: 160px;
  height: 35px;
  padding: 0 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.6);
  gap: 7px;
  outline: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;