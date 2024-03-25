import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { TPostInfo } from '@Typings/post';

interface MainProps {
  list: TPostInfo[];
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
              {post.tags?.map((tag: string, idx: number) =>
                <TagDisplay key={idx}>{tag}</TagDisplay>
              )}
            </TagInfo>
            <Title onClick={() => navigate(`posts/${post.fileName}`)}>{post.title}</Title>
            <CreatedAt>{post.createdAt}</CreatedAt>
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

const Title = styled.h1`
  font-size: 36px;
  margin: 0;
  cursor: pointer;

  &:hover {
    color: #29629C;
  }
`;

const CreatedAt = styled.span`
  font-size: 16px;
  color: gray;
`;