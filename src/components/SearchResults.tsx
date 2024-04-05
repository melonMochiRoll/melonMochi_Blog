import React, { FC } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/SearchRounded';
import { SxProps } from '@mui/material';
import { TPostInfo } from '@Typings/post';
import { ESearchStatus } from '@Hooks/useSearch';

interface SearchResultsProps {
  searchQuery: string;
  searchResult: TPostInfo[];
  searchStatus: ESearchStatus;
};

const SearchResults: FC<SearchResultsProps> = ({
  searchQuery,
  searchResult,
  searchStatus,
}) => {
  return (
    <Block>
      {searchQuery ?
        <SearchList>
          {
            searchResult.map((ele: TPostInfo, idx: number) => {
              const { title, tags } = ele;

              return (
                <SearchItem
                  key={idx}>
                  <span>{title}</span>
                  <TagList>
                    {tags.map((tag: string, idx: number) => 
                      <TagDisplay key={idx}>{tag}</TagDisplay>
                    )}
                  </TagList>
                </SearchItem>
              );
            })
          }
        </SearchList> :
        <SearchIcon
          sx={SearchIconCSS} />
      }
    </Block>
  );
};

export default SearchResults;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

const SearchList = styled.ul`
  width: 100%;
  height: 100%;
  padding: 10px;
  margin: 0;
  list-style: none;
  overflow: auto;
`;

const SearchIconCSS: SxProps = {
  color: '#f1f3f5',
  fontSize: '250px',
};

const SearchItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid #dee2e6;
  border-radius: 15px;
  cursor: pointer;
  user-select: none;

  span {
    color: #000;
    font-size: 20px;
    font-weight: 600;
  }

  &:hover {
    border: 1px solid #006bd6;
    background-color: #ebf5ff;
  }
`;

const TagList = styled.div`
  display: flex;
  align-item: center;
  gap: 7px;
`;

const TagDisplay = styled.div`
  display: flex;
  align-items: center;
  color: #0d47a1;
  font-size: 14px;
  font-weight: 600;
  border-radius: 25px;
  padding: 8px 15px;
  background-color: #d2f7ff;
`;