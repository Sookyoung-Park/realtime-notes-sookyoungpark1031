import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import NoteBoard from './noteBoard';
import firebasedb from '../services/datatstore';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [notes, setNotes] = useState({});
  const [currentUser, setCurrentUser] = useState(null); // added

  useEffect(() => {
    // added
    firebase.auth().onAuthStateChanged(setCurrentUser);
    firebasedb.fetchNotes(setNotes);
  }, []);

  function handleUpdate() {
    const min = 50;
    const max = 800;
    const x = Math.floor(Math.random() * (max - min) + min);
    const y = Math.floor(Math.random() * (max - min) + min);

    const newNote = {
      title: inputValue,
      text: '',
      x,
      y,

    };

    firebasedb.addNotes(newNote);

    setInputValue('');
  }

  function handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email'); // 추가
    firebase.auth().signInWithPopup(provider)
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSignOut() {
    // Firebase 로그아웃을 수행합니다.
    firebase.auth().signOut();
  }

  return (
    <main>
      {currentUser ? (
        <>
          <form className="form">
            <input value={inputValue} type="text" onChange={(event) => setInputValue(event.target.value)} />
            <button onClick={handleUpdate} type="submit" className="createBtn">Create</button>
          </form>
          <DndProvider backend={HTML5Backend}>
            <NoteBoard notes={notes} setNotes={setNotes} />
          </DndProvider>
          <button onClick={handleSignOut} type="submit">Sign Out</button>
        </>
      ) : (
        <>
          <p>Please sign in to use the app.</p>
          <button onClick={handleSignIn} type="submit">Sign In with Google</button>
        </>
      )}
    </main>
  );
}

export default App;
