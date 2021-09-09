import styled from 'styled-components';
import { BaseModal } from './BaseModal';

const ErrorModal = styled(BaseModal)`
  border: 1px solid var(--warn-bg);
  color: var(--dark-warn);
  background-color: var(--warn-bg);
`;

export default ErrorModal;
