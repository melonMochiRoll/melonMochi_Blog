import React, { FC } from 'react';
import styled from '@emotion/styled';
import mainBgImage from '@Assets/images/main_background.jpg';
import HeaderNavigator from '@Components/HeaderNavigator';
import Tag from '@Components/Tag';
import { TAGLIST } from '@Assets/posts';

const ListHeader: FC = () => {
  const tags = Object.values(TAGLIST);

  return (
    <Block>
      <Cover>
        <HeaderNavigator />
        <ListInfo>
          <Title>최근 글</Title>
          <Section>
            <TitleSection>
              <H2>Tags</H2>
            </TitleSection>
            <TagsSection>
              {tags.map((tag: string, idx: number) =>
                <Tag
                  key={idx}
                  tagName={tag} />
              )}
            </TagsSection>
          </Section>
        </ListInfo>
      </Cover>
    </Block>
  );
};

export default ListHeader;

const Block = styled.header`
  width: 100%;
  height: 600px;
  background-image: url(${mainBgImage});
  background-size: cover;
  background-position-y: center;
`;

const Cover = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
  padding-bottom: 40px;
  gap: 50px;
`;

const Title = styled.h1`
  font-size: 64px;
  font-weight: 800;
  color: #fff;
  margin: 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TitleSection = styled.section`
  padding: 20px;
`;

const H2 = styled.h2`
  font-size: 30px;
  color: #fff;
  margin: 0;
`;

const TagsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 0 20px;
  gap: 8px;
`;