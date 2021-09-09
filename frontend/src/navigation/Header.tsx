import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import styled from 'styled-components';

import NotesContext, { Note } from '../store/notes-context';
import Button from '../UI/Button';
import UserMenu from './UserMenu';

import AuthContext from '../store/auth-context';

import './Header.css';
import DeletePrompt from '../UI/DeletePrompt';

const StyledHeader = styled.header`
  margin-bottom: 5.5rem;
`;

const Navbar = styled.nav`
  display: flex;
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5;
  padding: 0.5rem;
`;

const Header: React.FC<{}> = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

  const history = useHistory();

  const notesCtx = useContext(NotesContext);
  const authCtx = useContext(AuthContext);

  function goBack() {
    history.goBack();
  }

  async function createNote() {
    const newNote = {
      content: 'New note..',
    };

    const res = await axios.post<{ data: Note }>(`${apiUrl}/notes`, newNote, {
      withCredentials: true,
    });
    if (res.status === 201) {
      history.push(`/${res.data.data.id}`);
    }
  }

  async function deleteNote() {
    const res = await axios.delete(`${apiUrl}/notes/${notesCtx.noteId}`, { withCredentials: true });
    if (res.status === 200) {
      setShowDeletePrompt(false);
      history.goBack();
    }
  }

  return (
    <StyledHeader>
      {showDeletePrompt && (
        <DeletePrompt onYes={deleteNote} onNo={() => setShowDeletePrompt(false)} />
      )}
      <Navbar className='Dark-bg'>
        <div className='flex flex-align-center Header-item Header-logo'>
          <img src='/qoed_logo_48.png' height='40' alt='logo' />
        </div>

        {notesCtx.viewingNote && (
          <div className='flex Header-item'>
            <Button darkOutline type='button' onClick={goBack}>
              Go back
            </Button>
          </div>
        )}

        {authCtx.authenticated && (
          <div className='flex Header-item auto-left'>
            {!notesCtx.viewingNote && (
              <Button darkOutline type='button' onClick={createNote} className='square'>
                +
              </Button>
            )}

            {notesCtx.viewingNote && (
              <Button darkOutline type='button' onClick={() => setShowDeletePrompt(true)}>
                Delete note
              </Button>
            )}
            {authCtx.authenticated && (
              <UserMenu
                classes='space-left'
                user={authCtx.user}
                onSignout={authCtx.logout}
                onDeleteUser={authCtx.deleteUser}></UserMenu>
            )}
          </div>
        )}
      </Navbar>
    </StyledHeader>
  );
};

export default Header;
