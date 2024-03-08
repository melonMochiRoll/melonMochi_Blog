import React, { FC } from 'react';
import styled from '@emotion/styled';
import Header from '@Containers/Header';

interface PageTemplateProps {
  children: React.ReactNode,
};

const PageTemplate: FC<PageTemplateProps> = ({ children }) => {
  return (
    <Block>
      <Header />
      {children}
    </Block>
  );
};

export default PageTemplate;

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;