import React, { FC } from 'react';
import styled from '@emotion/styled';
import ListHeader from '@Containers/ListHeader';

interface PageTemplateProps {
  children: React.ReactNode,
};

const PageTemplate: FC<PageTemplateProps> = ({ children }) => {
  return (
    <Div>
      <ListHeader />
      {children}
    </Div>
  );
};

export default PageTemplate;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;