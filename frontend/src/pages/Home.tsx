import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import NotesList from '../notes/NotesList';

import { Note } from '../store/notes-context';

import './Home.css';

function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [visibleNotes, setVisibleNotes] = useState<Note[]>([]);
  const [pinnedNotes, setPinnedNotes] = useState<Note[]>([]);
  const [showPinned, setShowPinned] = useState(true);

  const history = useHistory();

  function handleSelectNote(note: Note) {
    history.push(`/${note.id}`);
  }

  async function handlePinNote(note: Note) {
    // Make API call to toggle pinned
    const res = await axios.patch<{ data: Note }>(
      `${process.env.REACT_APP_API_URL}/notes/${note.id}`,
      { ...note, pinned: !note.pinned },
      { withCredentials: true }
    );
    // if successful, update state
    if (res.status === 200) {
      let updatedNote = res.data.data;
      let updatedNotes: Note[];
      // replace the updated note in state, this will trigger useEffect and update visibleNotes
      setNotes((state) => {
        updatedNotes = state.filter((n) => n.id !== note.id);
        updatedNotes.unshift(updatedNote);

        return updatedNotes;
      });
      // add note to pinnedNotes if it was pinned, or remove it if it was unpinned
      setPinnedNotes((state) => {
        if (updatedNote.pinned) {
          updatedNotes = [...state];
          updatedNotes.unshift(res.data.data);
        } else {
          updatedNotes = state.filter((n) => n.id !== note.id);
        }
        return updatedNotes;
      });
    }
  }

  async function handleDeleteNote(note: Note) {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${note.id}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      console.log('note deleted');
      setNotes(notes.filter((n) => n.id !== note.id));
    }
  }

  function searchNote(e: React.FormEvent<HTMLInputElement>) {
    // query all notes when a value is typed in the search field
    if (e.currentTarget.value.length > 0) {
      setShowPinned(false);
      // get notes that match the query
      const notesMatchingQuery = notes.filter((n) =>
        n.content.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      );
      setVisibleNotes(notesMatchingQuery);
    } else {
      // reset to show all notes again
      setShowPinned(true);
      setVisibleNotes(notes.filter((n) => !n.pinned));
    }
  }

  const fetchNotes = useCallback(async function () {
    const res = await axios.get<{ data: Note[] }>(`${process.env.REACT_APP_API_URL}/notes`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      setNotes(res.data.data);
      setPinnedNotes(res.data.data.filter((n) => n.pinned));
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    setVisibleNotes(notes.filter((n) => !n.pinned));
  }, [notes]);

  return (
    <React.Fragment>
      <header className='App-header'>
        <input
          className='Search-box Flex-1'
          type='text'
          placeholder='Search'
          onInput={searchNote}
        />
      </header>

      <main>
        {showPinned && pinnedNotes.length > 0 && (
          <div className='mb-2'>
            <h2 className='mb-2'>Pinned notes</h2>
            <NotesList
              onSelectNote={handleSelectNote}
              onPinNote={handlePinNote}
              onDeleteNote={handleDeleteNote}
              notes={pinnedNotes}></NotesList>
          </div>
        )}
        <div>
          <h2 className='mb-2'>My notes</h2>
          <NotesList
            onSelectNote={handleSelectNote}
            onPinNote={handlePinNote}
            onDeleteNote={handleDeleteNote}
            notes={visibleNotes}
          />
        </div>
      </main>
    </React.Fragment>
  );
}

export default Home;
