import styled from 'styled-components';

interface Props {}

const BaseModal = styled.div<Props>`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.8rem 1rem;
  border-radius: 0.2rem;
  font-family: inherit;
  font-size: 1.6rem;
  z-index: 5000;
`;

const BaseModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4999;
`;

export { BaseModal, BaseModalBackDrop };
