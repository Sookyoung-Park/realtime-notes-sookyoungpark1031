import React, { useState } from 'react';
import { produce } from 'immer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
        const min = 50;
        const max = 800;
        const x = Math.floor(Math.random() * (max - min) + min);
        const y = Math.floor(Math.random() * (max - min) + min);

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
      <DndProvider backend={HTML5Backend}>
        <NoteBoard notes={notes} setNotes={setNotes} />
      </DndProvider>
      {/* <NoteBoard notes={notes} setNotes={setNotes} /> */}
    </main>
  );
}

export default App;
