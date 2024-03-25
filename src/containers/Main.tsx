import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ETags, TPostInfo } from '@Typings/post';

interface MainProps {
  list: any;
};

const Main: FC<MainProps> = ({
  list,
}) => {
  const navigate = useNavigate();

  return (
    <Posts>
      {
        list.map((post: TPostInfo, idx: number) => 
          <Article
            key={idx}>
            <TagInfo>
              {post.tags?.map((tag: ETags, idx: number) =>
                <TagDisplay key={idx}>{tag}</TagDisplay>
              )}
            </TagInfo>
            <Info onClick={() => navigate(`post/${post.id}`)}>
              <Title>{post.title}</Title>
              <Paragraph>{post.preview}</Paragraph>
              <CreatedAt>{post.createdAt}</CreatedAt>
            </Info>
          </Article>)
      }
    </Posts>
  );
};

export default Main;

const Posts = styled.main`
  width: 700px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 20px;
  border-bottom: 1px solid #e9ecef;
  gap: 15px;
`;

const TagInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TagDisplay = styled.div`
  display: flex;
  align-items: center;
  color: #0d47a1;
  font-size: 14px;
  font-weight: 600;
  border-radius: 25px;
  padding: 8px 15px;
  background-color: #d2f7ff;
  gap: 4px;
  cursor: pointer;
  transition: all 0.1s linear;

  &:hover {
    color: #fff;
    background-color: #0d47a1;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;

  &:hover {
    color: #29629C;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 0;
  cursor: pointer;
`;

const Paragraph = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  margin: 0;
`;

const CreatedAt = styled.span`
  font-size: 16px;
  color: gray;
`;