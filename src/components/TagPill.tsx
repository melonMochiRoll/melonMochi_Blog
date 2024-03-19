import React, { FC } from 'react';
import styled from '@emotion/styled';

interface TagPillProps {
  tagName: string;
};

const TagPill: FC<TagPillProps> = ({
  tagName,
}) => {
  return (
    <Block>
      {tagName}
    </Block>
  );
};

export default TagPill;

const Block = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: 2px solid #00AF22;
  border-radius: 25px;
  padding: 8px 15px;
  background-color: #00AF22;
  gap: 4px;

  &:hover {
    border: 2px solid #00AF22;
  }
`;