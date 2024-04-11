import React, { FC } from 'react';
import styled from '@emotion/styled';
import { TPostInfo } from '@Typings/post';

interface ArticleProps {
  post: TPostInfo;
  navigateToPost: () => void;
  navigateToPosts: (tag: string) => void;
};

const Article: FC<ArticleProps> = ({
  post,
  navigateToPost,
  navigateToPosts,
}) => {
  const { title, tags, description, thumbnail, createdAt } = post;

  return (
    <Block>
      <Left>
        <TagInfo>
          {tags?.map((tag: string, idx: number) =>
            <TagDisplay
              key={idx}
              onClick={() => navigateToPosts(tag)}>
              {tag}
            </TagDisplay>
          )}
        </TagInfo>
        <Title onClick={navigateToPost}>{title}</Title>
        <Description>{description}</Description>
        <CreatedAt>{createdAt}</CreatedAt>
      </Left>
      <Right>
        <img src={thumbnail} />
      </Right>
    </Block>
  );
};

export default Article;

const Block = styled.article`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0 20px 20px;
  gap: 15px;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  height: 100%;
  padding: 20px 20px 20px 0;

  img {
    object-fit: cover;
  }
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

const Description = styled.span`
  font-size: 20px;
  color: #495057;
`;

const CreatedAt = styled.span`
  font-size: 16px;
  color: gray;
`;