import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { BaseModal, BaseModalBackDrop } from './BaseModal';
import Button from './Button';

interface Props {
  onNo: () => void;
  onYes: () => void;
}

const DeleteModal = styled(BaseModal)`
  background-color: var(--dark2);
  color: var(--primary);
`;

const DeleteModalBackDrop = styled(BaseModalBackDrop)`
  background-color: #00000060;
`;

const DeletePrompt: React.FC<Props> = ({ onNo, onYes }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <React.Fragment>
          <DeleteModalBackDrop />
          <DeleteModal>
            <p className='mb-2'>Are you sure you want to delete this note?</p>
            <Button warn className='mr-1' type='button' onClick={onYes}>
              Yes
            </Button>
            <Button primary type='button' onClick={onNo}>
              No
            </Button>
          </DeleteModal>
        </React.Fragment>,
        document.getElementById('modal')!
      )}
    </React.Fragment>
  );
};

export default DeletePrompt;
