import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router';
import { Note } from '../store/notes-context';
import DeletePrompt from '../UI/DeletePrompt';
import {
  ContextMenuContainer,
  ContextMenuBackDrop,
  ContextMenuItem,
  ContextMenuDivider,
} from '../UI/ContextMenu';

import './NoteItem.css';

interface Props {
  note: Note;
  onPinNote: (note: Note) => void;
  onDeleteNote: (note: Note) => Promise<void>;
}

const NoteItem: React.FC<Props> = ({ note, onPinNote, onDeleteNote }) => {
  const history = useHistory();

  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextPosition, setContextPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  function handleSelectNote(note: Note) {
    history.push(`/${note.id}`);
  }

  function handleContextMenu(e: React.MouseEvent, note: Note) {
    e.preventDefault();
    setContextPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  }

  function closeContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    setShowContextMenu(false);
  }

  async function deleteNote() {
    await onDeleteNote(note);
    setShowDeletePrompt(false);
  }

  function handleDelete() {
    setShowContextMenu(false);
    setShowDeletePrompt(true);
  }

  return (
    <>
      {showDeletePrompt && (
        <DeletePrompt onYes={deleteNote} onNo={() => setShowDeletePrompt(false)} />
      )}
      {showContextMenu && (
        <React.Fragment>
          {ReactDOM.createPortal(
            <React.Fragment>
              <ContextMenuBackDrop onClick={closeContextMenu} onContextMenu={closeContextMenu} />
              <ContextMenuContainer x={contextPosition.x} y={contextPosition.y}>
                <ContextMenuItem onClick={() => onPinNote(note)}>
                  {note.pinned ? 'Unpin' : 'Pin'}
                </ContextMenuItem>
                <ContextMenuDivider />
                <ContextMenuItem onClick={handleDelete}>Delete</ContextMenuItem>
              </ContextMenuContainer>
            </React.Fragment>,
            document.getElementById('modal')!
          )}
        </React.Fragment>
      )}
      <div className='Note-item-container' key={note.id}>
        <div className='Note-item' dangerouslySetInnerHTML={{ __html: note.content }} />
        <div
          className='Note-overlay'
          onClick={() => handleSelectNote(note)}
          onContextMenu={(e) => handleContextMenu(e, note)}></div>
        <span className='material-icons Pin-icon' onClick={() => onPinNote(note)}>
          push_pin
        </span>
      </div>
    </>
  );
};

export default NoteItem;
