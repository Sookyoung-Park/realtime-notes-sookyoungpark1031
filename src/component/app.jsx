import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import NoteBoard from './noteBoard';
import firebasedb from '../services/datatstore';

const { database } = firebase;

function App() {
  const [inputValue, setInputValue] = useState('');
  const [notes, setNotes] = useState({});
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    firebasedb.fetchNotes(setNotes);
  }, []);

  // addition function
  function handleUpdate() {
    const newId = `id${noteCount + 1}`;
    const min = 50;
    const max = 800;
    const x = Math.floor(Math.random() * (max - min) + min);
    const y = Math.floor(Math.random() * (max - min) + min);

    const newNoteRef = database().ref('notes').child(newId);
    newNoteRef.set({
      title: inputValue,
      text: '',
      x,
      y,
    });

    setNotes(
      produce((draftState) => {
        draftState[newId] = {
          title: inputValue,
          text: '',
          x,
          y,
        };
      }),
    );

    setNoteCount((prevNoteCount) => prevNoteCount + 1);
    setInputValue('');
    // 원래코드
    // setNotes(
    //   produce((draftState) => {
    //     const newId = `id${noteCount + 1}`;
    //     const min = 50;
    //     const max = 800;
    //     const x = Math.floor(Math.random() * (max - min) + min);
    //     const y = Math.floor(Math.random() * (max - min) + min);

    //     draftState[newId] = {
    //       title: inputValue, text: '', x, y,
    //     };
    //   }),
    // );
    // setNoteCount((prevNoteCount) => prevNoteCount + 1);
    // setInputValue('');
  }

  return (
    <main>
      <form className="form">
        <input value={inputValue} type="text" onChange={(event) => setInputValue(event.target.value)} />
        <button onClick={handleUpdate} type="submit" className="createBtn">Create</button>
      </form>
      <DndProvider backend={HTML5Backend}>
        <NoteBoard notes={notes} setNotes={setNotes} />
      </DndProvider>
    </main>
  );
}

export default App;
