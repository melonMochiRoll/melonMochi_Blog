import React, { FC } from 'react';
import styled from '@emotion/styled';
import Modal from '@Components/modal/Modal';
import SearchIcon from '@mui/icons-material/SearchRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { SxProps } from '@mui/material';
import useSearch from '@Hooks/useSearch';
import SearchResults from '@Components/SearchResults';

interface SearchModalProps {
  toggleModal: () => void;
};

const SearchModal: FC<SearchModalProps> = ({
  toggleModal,
}) => {
  const {
    query,
    onChangeQuery,
    searchResult,
    searchStatus,
  } = useSearch();

  return (
    <Modal
      toggleModal={toggleModal}>
      <Block
        onClick={(e: any) => e.stopPropagation()}>
        <SearchBar>
          <SearchIcon
            fontSize='large'
            sx={{ color: '#006bd6' }} />
          <Input
            type='text'
            value={query}
            onChange={onChangeQuery}
            placeholder={'무엇을 찾으시나요?'} />
          <CloseIcon
            sx={CloseButtonCSS}
            onClick={toggleModal} />
        </SearchBar>
        <SearchResults
          searchQuery={query}
          searchResult={searchResult}
          searchStatus={searchStatus} />
        <Footer />
      </Block>
    </Modal>
  );
};

export default SearchModal;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  height: 500px;
  background-color: #fff;
  border-radius: 15px;
`;

const SearchBar = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 15%;
  padding: 20px;
  border-bottom: 1px solid #adb5bd;
`;

const Input = styled.input`
  width: 100%;
  padding: 0 20px;
  font-size: 24px;
  border: none;
  outline: none;
`;

const CloseButtonCSS: SxProps = {
  color: '#000',
  fontSize: '35px',
  cursor: 'pointer',
};

const Footer = styled.footer`
  width: 100%;
  height: 5%;
  background-color: #f1f3f5;
  border-top: 1px solid #adb5bd;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;