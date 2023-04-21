import React, { useState } from 'react';
import { produce } from 'immer';

import NoteBoard from './noteBoard';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [notes, setNotes] = useState({});
  const [noteCount, setNoteCount] = useState(0);

  // addition function
  function handleUpdate() {
    setNotes(
      produce((draftState) => {
        const newId = `id${noteCount + 1}`;
        const x = Math.floor(Math.random() * 51) + 50;
        const y = Math.floor(Math.random() * 51) + 50;
        draftState[newId] = {
          title: inputValue, text: '', x, y,
        };
      }),
    );
    setNoteCount((prevNoteCount) => prevNoteCount + 1);
    setInputValue('');
  }

  return (
    <main>
      <input value={inputValue} type="text" onChange={(event) => setInputValue(event.target.value)} />
      <button onClick={handleUpdate} type="submit">Create</button>
      <NoteBoard notes={notes} setNotes={setNotes} />

    </main>
  );
}

export default App;
