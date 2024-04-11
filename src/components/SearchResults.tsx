import React, { FC } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/SearchRounded';
import { CircularProgress, SxProps } from '@mui/material';
import { TPostInfo } from '@Typings/post';
import { ESearchStatus } from '@Hooks/useSearch';
import ErrorIcon from '@mui/icons-material/ErrorOutline';

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

  if (!searchQuery) {
    return (
      <Block>
        <SearchIcon sx={SearchIconCSS} />
      </Block>
    );
  }

  if (searchStatus === ESearchStatus.PENDING) {
    return (
      <Block>
        <CircularProgress size={70}/>
      </Block>
    );
  }

  return (
    <Block>
      {searchResult?.length ?
        <SearchList>
          {
            searchResult.map((ele: TPostInfo, idx: number) => {
              const { title, tags } = ele;

              return (
                <SearchItem
                  key={idx}>
                  <Span>{title}</Span>
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
        <>
          <ErrorIcon sx={{ color: '#000', fontSize: '64px', paddingBottom: '15px' }} />
          <Span>{`"${searchQuery}" 에 대한 검색 결과가 없습니다.`}</Span>
        </>
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

  &:hover {
    border: 1px solid #006bd6;
    background-color: #ebf5ff;
  }
`;

const Span = styled.span`
  color: #000;
  font-size: 20px;
  font-weight: 600;
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