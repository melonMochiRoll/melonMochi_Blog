import React, { FC } from 'react';
import styled from '@emotion/styled';

const Main: FC = () => { // RecentPosts 혹은 선택된 태그에 해당하는 게시글 출력
  return (
    <Block>
      <Tags>
        TAGS
      </Tags>
      <RecentPosts>
        <Article>
          <Title>Title</Title>
          <Paragraph>
            Lorem Ipsum...
          </Paragraph>
          <Timestamp>2024-02-22</Timestamp>
        </Article>
        <Article>
          <Title>Title</Title>
          <Paragraph>
            Lorem Ipsum...
          </Paragraph>
          <Timestamp>2024-02-22</Timestamp>
        </Article>
      </RecentPosts>
    </Block>
  );
};

export default Main;

const Block = styled.main`
  width: 700px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Tags = styled.section`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  padding: 20px 50px;
`;

const RecentPosts = styled.section`
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
`;

const Title = styled.h1`
  font-size: 32px;
  margin: 0;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-bottom: 10px;
`;

const Timestamp = styled.em`
  color: gray;
`;