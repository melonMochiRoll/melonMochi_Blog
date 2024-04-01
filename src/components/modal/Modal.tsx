import React, { FC } from 'react';
import styled from '@emotion/styled';

interface ModalProps {
  toggleModal: () => void;
  children: React.ReactNode;
};

const Modal: FC<ModalProps> = ({
  toggleModal,
  children,
}) => {
  return (
    <Block
      onClick={toggleModal}>
      {children}
    </Block>
  );
};

export default Modal;

const Block = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;