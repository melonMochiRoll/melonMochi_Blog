import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PostHeader from '@Containers/PostHeader';
import Content from '@Components/Content';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '@Containers/Footer';
import { getPost, getPosts } from '@Posts/index';
import { TPostInfo } from '@Typings/post';
import ArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import ArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

const PostPage: FC = () => {
  const navigate = useNavigate();
  const { fileName } = useParams();
  const result = getPost(Number(fileName));
  const [ post, setPost ] = useState('');
  const [ recentPosts ] = useState(getPosts(undefined, 2, fileName));

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
      <Bottom>
        <Back
          onClick={() => navigate(-1)}>
          <ArrowLeftIcon fontSize='large' />
          돌아가기
        </Back>
        <RecentPostsDiv>
        <span>최근 글</span>
        {
          recentPosts?.posts.map((ele: TPostInfo, idx: number) => {
            return (
              <Back
                key={idx}
                onClick={() => navigate(`/post/${ele.fileName}`)}>
                {ele.title}
                <ArrowRightIcon fontSize='large' />
              </Back>
            );
          })
        }
        </RecentPostsDiv>
      </Bottom>
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

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 750px;
  border-top: 1px solid #00af22;
  padding-bottom: 100px;
`;

const Back = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  gap: 5px;
  cursor: pointer;

  &:hover {
    color: #29629C;
  }
`;

const RecentPostsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 5px;

  span {
    font-size: 20px;
    font-weight: 600;
  }
`;