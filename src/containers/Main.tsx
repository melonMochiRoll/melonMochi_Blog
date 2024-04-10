import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { TPostInfo } from '@Typings/post';
import Article from '@Components/Article';

interface MainProps {
  posts: TPostInfo[];
  getMorePosts: () => void;
  canLoadMore: boolean;
};

const Main: FC<MainProps> = ({
  posts,
  getMorePosts,
  canLoadMore,
}) => {
  const navigate = useNavigate();

  const navigateToPosts = (tag: string) => {
    navigate(`/posts?tags=${tag}`);
  };

  return (
    <Posts>
      {
        posts.map((post: TPostInfo, idx: number) => 
          <Article
            key={idx}
            post={post}
            navigateToPost={() => navigate(`/post/${post.fileName}`)} 
            navigateToPosts={navigateToPosts} />)
      }
      {canLoadMore &&
      <LoadMore
        onClick={getMorePosts}>
        Load More
      </LoadMore>
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
  margin-bottom: 100px;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LoadMore = styled.button`
  font-size: 24px;
  font-weight: 600;
  padding: 10px 15px;
  margin: 40px 0;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.1s linear;

  &:hover {
    color: #fff;
    background-color: #f94449;
    border: 1px solid #f94449;
  }
`;