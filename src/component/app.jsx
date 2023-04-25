import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import 'firebase/compat/database';
import NoteBoard from './noteBoard';
import firebasedb from '../services/datatstore';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [notes, setNotes] = useState({});

  useEffect(() => {
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
