import React, { useState } from 'react';
import { produce } from 'immer';
import NoteBoard from './noteBoard';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [notes, setNotes] = useState({
    id1: {
      title: 'boo',
      text: 'avcs',
    },
    id2: {
      title: 'coo',
      text: 'avcdfs',
    },
  });

  // const updatedFields = { title: 'howdy' };

  // addition function
  function handleUpdate() {
    setNotes(
      produce((draftState) => {
        draftState.id1 = { ...notes, inputValue };
      }),
    );
  }

  return (
    <main>
      <input value={inputValue} type="text" onChange={(event) => setInputValue(event.target.value)} />
      <button onClick={handleUpdate} type="submit">Create</button>
      <NoteBoard notes={notes} />
    </main>
  );
}

export default App;
