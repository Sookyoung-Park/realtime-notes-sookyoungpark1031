import React from 'react';
import { produce } from 'immer';

function NoteItem(props) {
  const { note, setNotes } = props;

  // delete function
  // function handleDelete(id) {
  //   setNotes(
  //     produce((draftState) => {
  //       return Object.values(draftState).filter((note) => note.id !== id);
  //     }),
  //   );
  // }
  function handleDelete(event) {
    const { id } = event.currentTarget;
    setNotes(
      produce((draftState) => {
        delete draftState.notes[id];
      }),
    );
  }

  return (
    <div className="todo-item">
      <h2>{note.title}</h2>
      <p>{note.text}</p>
      <button type="submit" onClick={handleDelete}>Delete</button>
      <button type="submit">Edit</button>
    </div>
  );
}
// function NoteItem(props) {
//   return (
//     <div className="todo-item">
//       <h3>{props.itemtitle}</h3>
//       <button type="submit">Delete</button>
//     </div>
//   );
// }

export default NoteItem;
