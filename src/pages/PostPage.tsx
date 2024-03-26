import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PostHeader from '@Containers/PostHeader';
import Content from '@Components/Content';
import { useParams } from 'react-router-dom';

const PostPage: FC = () => {
  const { fileName } = useParams();
  const { info, content } = require(`@Posts/${fileName}`);
  const [ post, setPost ] = useState('');

  useEffect(() => {
    fetch(content)
      .then(res => res.text())
      .then(str => setPost(str));
  }, []);

  return (
    <Block>
      <PostHeader
        info={info} />
      <Content
        post={post} />
    </Block>
  );
};

export default PostPage;

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;