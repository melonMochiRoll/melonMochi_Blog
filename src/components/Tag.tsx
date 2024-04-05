import React, { FC } from 'react';
import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/CheckRounded';
import AddIcon from '@mui/icons-material/AddRounded';

interface TagProps {
  tagName: string;
  checked: boolean;
  onClickTag: (tag: string, checked: boolean) => void;
};

const Tag: FC<TagProps> = ({
  tagName,
  checked,
  onClickTag,
}) => {
  return (
    <Block
      checked={checked}
      onClick={() => onClickTag(tagName, checked)}>
      {tagName}
      {checked ?
        <CheckIcon fontSize='small' /> : 
        <AddIcon fontSize='small' sx={{ color: '#495057' }} />}
    </Block>
  );
};

export default Tag;

const Block = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ checked }) => checked ? '#fff' : '#000'};
  font-size: 14px;
  font-weight: 600;
  border: 2px solid ${({ checked }) => checked ? '#00AF22' : '#868e96'};
  border-radius: 25px;
  padding: 8px 10px 8px 15px;
  background-color: ${({ checked }) => checked ? '#00AF22' : '#fff'};
  cursor: pointer;
  user-select: none;
  gap: 4px;

  &:hover {
    border: 2px solid #00AF22;
  }
`;