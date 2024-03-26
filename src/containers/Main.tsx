import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { TPostInfo } from '@Typings/post';
import Article from '@Components/Article';

interface MainProps {
  posts: TPostInfo[];
};

const Main: FC<MainProps> = ({
  posts,
}) => {
  const navigate = useNavigate();

  return (
    <Posts>
      {
        posts.map((post: TPostInfo, idx: number) => 
          <Article
            key={idx}
            post={post}
            navigate={() => navigate(`posts/${post.fileName}`)}/>)
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

const LoadMore = styled.button`

`;