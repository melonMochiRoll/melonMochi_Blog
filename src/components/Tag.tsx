import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/CheckRounded';
import AddIcon from '@mui/icons-material/AddRounded';

interface TagProps {
  tagName: string;
};

const Tag: FC<TagProps> = ({
  tagName,
}) => {
  const [ checked, setChecked ] = useState(false);

  const onClick = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Article
      checked={checked}
      onClick={onClick}>
      {tagName}
      {checked ?
        <CheckIcon fontSize='small' /> : 
        <AddIcon fontSize='small' sx={{ color: '#495057' }} />}
    </Article>
  );
};

export default Tag;

const Article = styled.article<{ checked: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ checked }) => checked ? '#fff' : '#000'};
  font-size: 14px;
  font-weight: 600;
  border: 2px solid ${({ checked }) => checked ? '#01a020' : '#868e96'};
  border-radius: 25px;
  padding: 8px 10px 8px 15px;
  background-color: ${({ checked }) => checked ? '#01a020' : '#fff'};
  cursor: pointer;
  user-select: none;
  gap: 4px;

  &:hover {
    border: 2px solid #01a020;
  }
`;