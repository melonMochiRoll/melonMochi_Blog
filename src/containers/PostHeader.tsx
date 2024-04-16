import React, { FC } from 'react';
import styled from '@emotion/styled';
import mainBgImage from '@Assets/images/main_background.jpg';
import HeaderNavigator from '@Components/HeaderNavigator';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import TagPill from '@Components/TagPill';
import { TPostInfo } from '@Typings/post';

interface PostHeaderProps {
  info: TPostInfo;
};

const PostHeader: FC<PostHeaderProps> = ({
  info,
}) => {
  const { title, tags, thumbnail, createdAt } = info || { title: '', tags: [], thumbnail: mainBgImage, reatedAt: '' };
  
  return (
    <Block img={thumbnail}>
      <Cover>
        <HeaderNavigator />
        <PostInfo>
          <TagDiv>
            {
              tags.map((ele: string, idx: number) => 
                <TagPill
                  key={idx}
                  tagName={ele}/>
              )
            }
          </TagDiv>
          <Title>{title}</Title>
          <TimeDiv>
            <CalendarIcon />
            <CreatedAt>{createdAt}</CreatedAt>
          </TimeDiv>
        </PostInfo>
      </Cover>
    </Block>
  );
};

export default PostHeader;

const Block = styled.header<{ img: string }>`
  width: 100%;
  height: 600px;
  background-image: url(${props => props.img });
  background-size: cover;
  background-position-y: center;
`;

const Cover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 58px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  margin: 0;
`;

const TimeDiv = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
`;

const CreatedAt = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
`;

const TagDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;