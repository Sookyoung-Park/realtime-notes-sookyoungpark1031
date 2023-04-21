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
        draftState[newId] = { title: inputValue, text: '' };
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

// import React, { useState } from 'react';
// import NoteBoard from './noteBoard';

// function App() {
//   const [notes, setNotes] = useState([]);

//   function handleAddNote() {
//     setNotes([...notes, { id: Date.now(), text: '' }]);
//   }

//   function handleDeleteNote(id) {
//     setNotes(notes.filter((note) => note.id !== id));
//   }

//   function handleNoteTextChange(id, text) {
//     setNotes(
//       notes.map((note) => {
//         if (note.id === id) {
//           return { ...note, text };
//         }
//         return note;
//       }),
//     );
//   }

//   return (
//     <div>
//       <button onClick={handleAddNote} type="submit">Add Note</button>
//       <NoteBoard notes={notes} onNoteTextChange={(id, text) => handleNoteTextChange(id, text)} onDeleteNote={(id) => handleDeleteNote(id)} />
//     </div>
//   );
// }

// export default App;
