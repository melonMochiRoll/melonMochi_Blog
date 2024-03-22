import React, { FC } from 'react';
import styled from '@emotion/styled';
import MarkDown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/stackoverflow-dark.min.css';

interface PostArticleProps {
  post: string;
};

const PostArticle: FC<PostArticleProps> = ({
  post,
}) => {
  return (
    <Article>
      <MarkDown
        children={post}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        remarkPlugins={[remarkGfm]} />
    </Article>
  );
};

export default PostArticle;

const Article = styled.article`
  width: 700px;
  min-height: 100vh;

  h1 {
    font-size: 48px;
  }

  h2 {
    font-size: 36px;
  }

  p {
    font-size: 20px;
  }
  
  hr {
    border: 1px solid #E3E3E3;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;