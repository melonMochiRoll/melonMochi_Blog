import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import NotFoundBgImage from '@Assets/images/not_found_background.jpg';

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Block>
      <Div>
        <Button onClick={() => navigate('/')}>
          홈으로
        </Button>
      </Div>
    </Block>
  );
};

export default NotFoundPage;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url(${NotFoundBgImage});
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  color: #000;
  font-size: 38px;
  font-weight: 800;
  padding: 8px 25px;
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: rgba(220, 220, 220, 1);
  }
`;