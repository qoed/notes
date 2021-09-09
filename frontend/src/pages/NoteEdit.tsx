import React, { useCallback } from 'react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Editor as TinyMCEEditor } from 'tinymce';

import NotesEditor from '../notes/NotesEditor';
import NotesContext, { Note } from '../store/notes-context';
import Spinner from '../UI/Spinner';

import './NoteEdit.css';

import ErrorModal from '../UI/ErrorModal';
import Button from '../UI/Button';

const NoteEdit: React.FC<{}> = () => {
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { viewing, stopViewing } = useContext(NotesContext);

  const params = useParams<{ id: string }>();

  function updateCurrentNote(content: string, editor: TinyMCEEditor) {
    const updatedNote: Note = {
      ...currentNote!,
      content,
    };
    setCurrentNote(updatedNote);
  }

  async function saveChanges() {
    if (!currentNote) {
      return;
    }

    try {
      const res = await axios.patch<{ data: Note }>(
        `${process.env.REACT_APP_API_URL}/notes/${currentNote.id}`,
        currentNote,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setCurrentNote(res.data.data);
      }
    } catch (err) {
      // TODO: Implement proper error handling
      console.log(err);
    }
  }

  const fetchNote = useCallback(
    async function () {
      try {
        setLoading(true);
        const id = params.id;
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/notes/${id}`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setCurrentNote(res.data.data);
          viewing(res.data.data.id);
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.response.data.error);
        setLoading(false);
      }
    },
    [viewing, params.id]
  );

  useEffect(() => {
    fetchNote();

    return function cleanup() {
      stopViewing();
    };
  }, [fetchNote, stopViewing]);

  // const dateOpts = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

  return (
    <React.Fragment>
      {loading && <Spinner />}
      {currentNote && (
        <NotesEditor
          handleEditorChange={updateCurrentNote}
          handleSave={saveChanges}
          editorContent={currentNote.content}
        />
      )}
      {error && (
        <ErrorModal className='flex flex-col'>
          <p>{error}</p>
          <Button onClick={() => history.push('/')} warn className='mt-1'>
            Back to notes
          </Button>
        </ErrorModal>
      )}
    </React.Fragment>
  );
};

export default NoteEdit;
