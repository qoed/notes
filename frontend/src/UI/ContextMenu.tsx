import styled from 'styled-components';

interface Props {
  x: number;
  y: number;
}

const ContextMenuContainer = styled.div<Props>`
  position: fixed;
  top: ${(props) => props.y + 'px'};
  left: ${(props) => props.x + 'px'};
  min-width: 9.5rem;
  border-radius: 0.2rem;
  font-family: inherit;
  font-size: 1.6rem;
  background-color: var(--dark2);
  border: 1px solid var(--divider);
  z-index: 5000;
`;

const ContextMenuItem = styled.div`
  padding: 0.8rem 1rem;
  cursor: pointer;
  color: var(--primary);

  :hover {
    background-color: var(--dark3);
  }
`;

const ContextMenuDivider = styled.div`
  border-top: 1px solid var(--divider);
`;

const ContextMenuBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4999;
`;

export { ContextMenuContainer, ContextMenuItem, ContextMenuDivider, ContextMenuBackDrop };
