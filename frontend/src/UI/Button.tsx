import styled from 'styled-components';

interface Props {
  primary?: boolean;
  warn?: boolean;
  dark?: boolean;
  logout?: boolean;
  darkOutline?: boolean;
}

const Button = styled.button<Props>`
  padding: 0.8rem 1rem;
  border-radius: 0.2rem;
  font-family: inherit;
  font-size: 1.6rem;
  transition: background-color 0.4s, color 0.4s;
  color: ${(props) =>
    props.primary
      ? 'var(--primary)'
      : props.warn
      ? 'var(--warn)'
      : props.dark
      ? 'var(--primary)'
      : props.logout
      ? 'var(--logout)'
      : props.darkOutline
      ? 'var(--primary)'
      : 'var(--dark)'};
  background-color: ${(props) =>
    props.primary
      ? 'transparent'
      : props.warn
      ? 'transparent'
      : props.dark
      ? 'var(--dark)'
      : props.logout
      ? 'var(--dark2)'
      : props.darkOutline
      ? 'transparent'
      : 'var(--primary)'};
  border: 1px solid
    ${(props) =>
      props.warn
        ? 'var(--warn)'
        : props.dark
        ? 'var(--dark)'
        : props.logout
        ? 'var(--logout)'
        : 'var(--primary)'};

  &:hover {
    color: ${(props) =>
      props.primary
        ? 'var(--dark)'
        : props.warn
        ? 'var(--dark2)'
        : props.dark
        ? 'var(--dark)'
        : props.logout
        ? 'var(--dark2)'
        : props.darkOutline
        ? 'var(--dark)'
        : 'var(--primary)'};
    background-color: ${(props) =>
      props.primary
        ? 'var(--primary)'
        : props.logout
        ? 'var(--logout)'
        : props.warn
        ? 'var(--warn)'
        : props.darkOutline
        ? 'var(--primary)'
        : 'transparent'};
  }

  &:focus-visible {
    outline: none;
  }

  &.top-right {
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    height: 4rem;
  }

  &.top-left {
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    height: 4rem;
  }

  &.square {
    padding: 0.4rem 1.4rem;
    font-weight: 700;
    font-size: 2.2rem;
  }

  &.w-100 {
    width: 100%;
  }
`;

export default Button;
