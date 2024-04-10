import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PostHeader from '@Containers/PostHeader';
import Content from '@Components/Content';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '@Containers/Footer';
import { getPost } from '@Posts/index';

const PostPage: FC = () => {
  const navigate = useNavigate();
  const { fileName } = useParams();
  const result = getPost(Number(fileName));
  const [ post, setPost ] = useState('');

  useEffect(() => {
    if (!result) {
      navigate('/not-found');
    }
  }, [result]);
  
  useEffect(() => {
    fetch(result.content)
      .then(res => res.text())
      .then(str => setPost(str));
  }, []);

  return (
    <Block>
      <PostHeader
        info={result.info} />
      <Content
        post={post} />
      <Footer />
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