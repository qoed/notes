import { Switch, Route } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { NotesContextProvider } from './store/notes-context';
import AuthContext from './store/auth-context';

import Auth from './pages/Auth';
import Home from './pages/Home';
import NoteEdit from './pages/NoteEdit';
import Header from './navigation/Header';

import './App.css';

const App: React.FC<{}> = () => {
  const { getMe } = useContext(AuthContext);

  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <div className='App Dark-bg'>
      <NotesContextProvider>
        <Header />
        <main className='App-body Dark-bg'>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/auth'>
              <Auth />
            </Route>
            <Route path='/:id'>
              <NoteEdit />
            </Route>
          </Switch>
        </main>
      </NotesContextProvider>
    </div>
  );
};

export default App;
