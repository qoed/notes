import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';

interface Props {
  user: any;
  classes?: string;
  onSignout?: (e: React.MouseEvent) => void;
  onDeleteUser?: (e: React.MouseEvent) => void;
}

const StyledButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 4.2rem;
  height: 4.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;

  & img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const UserDropDown = styled.div`
  position: fixed;
  top: 5.4rem;
  right: 0.85rem;
  width: 20rem;
  background-color: var(--dark2);
  border: 1px solid var(--divider);
  box-shadow: 0px 8px 24px 0 #2c2c2c;
  border-radius: 0.2rem;

  ::before,
  ::after {
    content: '';
    display: inline-block;
    position: absolute;
  }

  ::before {
    border: 8px solid transparent;
    border-bottom: 8px solid var(--divider);
    left: auto;
    right: 9px;
    top: -16px;
  }

  ::after {
    border: 7px solid transparent;
    border-bottom: 7px solid var(--dark2);
    left: auto;
    right: 10px;
    top: -14px;
  }

  & p {
    font-size: smaller;
  }
`;

const DropDownItem = styled.div`
  padding: 1rem;
  font-size: smaller;
  & .username {
    font-weight: bold;
  }
`;

const DropdownDivider = styled.div`
  border-top: 1px solid var(--divider);
`;

const UserMenu: React.FC<Props> = ({ user, classes, onSignout, onDeleteUser }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  function toggleMenu(e: React.MouseEvent) {
    setShowUserDropdown((prevState) => !prevState);
  }

  function handleBlur(e: React.FocusEvent) {
    setShowUserDropdown(false);
  }

  return (
    <React.Fragment>
      <StyledButton onClick={toggleMenu} className={classes} onBlur={handleBlur}>
        <img src={user.avatar} alt='avatar' />
      </StyledButton>
      {showUserDropdown && (
        <>
          <UserDropDown>
            <DropDownItem>
              Signed in as <span className='username'>{user.name}</span> (
              {user.email || 'no public email'})
            </DropDownItem>
            <DropdownDivider />
            <DropDownItem>
              <Button logout type='button' onMouseDown={onSignout} className='w-100 space-right'>
                Sign out
              </Button>
            </DropDownItem>
            <DropDownItem>
              <Button logout type='button' onMouseDown={onDeleteUser} className='w-100 space-right'>
                Delete user account
              </Button>
            </DropDownItem>
          </UserDropDown>
        </>
      )}
    </React.Fragment>
  );
};

export default UserMenu;
