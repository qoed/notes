import React, { useCallback, useState, ReactNode } from 'react';

export interface Note {
  id: string;
  content: string;
  pinned: boolean;
  createdOn: Date;
  updatedOn: Date;
}

export interface NoteTemplate {
  content: string;
}

interface NotesContextInterface {
  viewingNote: boolean;
  noteId: string;
  viewing: (id: string) => void;
  stopViewing: () => void;
}

const defaultValue: NotesContextInterface = {
  viewingNote: false,
  noteId: '',
  viewing: (id) => {},
  stopViewing: () => {},
};

const NotesContext = React.createContext<NotesContextInterface>(defaultValue);

export const NotesContextProvider: React.FC<{}> = ({ children }: { children?: ReactNode }) => {
  const [viewingNote, setViewingNote] = useState(false);
  const [noteId, setNoteId] = useState('');

  const viewing = useCallback(function (id) {
    setViewingNote(true);
    setNoteId(id);
  }, []);

  const stopViewing = useCallback(function () {
    setViewingNote(false);
    setNoteId('');
  }, []);

  return (
    <NotesContext.Provider
      value={{
        viewingNote,
        noteId,
        viewing,
        stopViewing,
      }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
