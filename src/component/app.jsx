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
    if (currentUser) {
      firebasedb.fetchNotes(setNotes);
    }
  }, [currentUser]);

  function handleUpdate(event) {
    event.preventDefault(); // 기본 동작 막기

    /// left: 20, top: 30, right: window.innerWidth - 330, bottom: window.innerHeight - 220,
    const minX = 20;
    const maxX = window.innerWidth - 330;
    const minY = 30;
    const maxY = window.innerHeight - 330;
    const x = Math.floor(Math.random() * (maxX - minX) + minX);
    const y = Math.floor(Math.random() * (maxY - minY) + minY);

    const newNote = {
      title: inputValue,
      text: '',
      x,
      y,

    };

    firebasedb.addNotes(newNote);

    setInputValue('');
    // firebasedb.fetchNotes(setNotes);
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
            <button className="SignOutBtn" onClick={handleSignOut} type="submit">Sign Out</button>
          </form>
          <DndProvider backend={HTML5Backend}>
            <NoteBoard notes={notes} setNotes={setNotes} />
          </DndProvider>

        </>
      ) : (
        <div className="signinPage">
          <h1>Please sign in to use the app</h1>
          <button className="SignIn" onClick={handleSignIn} type="submit">Sign In with Google</button>
        </div>
      )}
    </main>
  );
}

export default App;
