import React from 'react';
import { Note } from '../store/notes-context';
import NoteItem from './NoteItem';

import './NotesList.css';

interface Props {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  onPinNote: (note: Note) => void;
  onDeleteNote: (note: Note) => Promise<void>;
}

const NotesList: React.FC<Props> = ({ notes, onSelectNote, onPinNote, onDeleteNote }) => {
  let notesList: JSX.Element[] = [];
  if (Array.isArray(notes)) {
    notesList = notes.map((note) => {
      return (
        <NoteItem key={note.id} note={note} onPinNote={onPinNote} onDeleteNote={onDeleteNote} />
      );
    });
  }

  return <div className='Notes-list'>{notesList}</div>;
};

export default NotesList;
