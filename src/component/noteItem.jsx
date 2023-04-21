import React from 'react';
import { produce } from 'immer';

function NoteItem(props) {
  const {
    notes, id, note, setNotes,
  } = props;

  // mine
  // /not class it's functional component
  // function elete(event) {
  //   console.log(event);
  //   // const { id } = event.currentTarget; // null
  //   setNotes(
  //     produce((draftState) => {
  //       // console.log(draftState);
  //       delete draftState[abc];
  //     }),
  //   );
  // }

  function deleteNote() {
    setNotes(
      produce((draftState) => {
        delete draftState[id];
      }),
    );
  }

  function printObject(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      console.log(key); // id1, id2
      console.log(value);
    });
  }
  printObject(notes);

  return (
    <div className="note-item" key={id}>
      <h2>{note.title}</h2>
      <p>{note.text}</p>
      <p>{id}</p>
      <button type="button" onClick={deleteNote}>Delete</button>
    </div>
  // <div className="note-item" key={id}>
  //   <h2>{note.title}</h2>
  //   <p>{note.text}</p>
  //   <p>{note.id}</p>
  //   <button type="submit" onClick={deleteNote}>Delete</button>
  // </div>

  );
}

export default NoteItem;

// import React, { useState } from 'react';

// function NoteItem(props) {
//   const { note, onDelete } = props;
//   const [editing, setEditing] = useState(false);
//   const [newTitle, setNewTitle] = useState(note.title);
//   const [newContent, setNewContent] = useState(note.content);

//   const handleDelete = () => {
//     onDelete(note.id);
//   };

//   const handleStartEditing = () => {
//     setEditing(true);
//   };

//   const handleCancelEditing = () => {
//     setNewTitle(note.title);
//     setNewContent(note.content);
//     setEditing(false);
//   };

//   const handleSaveEditing = () => {
//     props.onEdit(note.id, newTitle, newContent);
//     setEditing(false);
//   };

//   return (
//     <div className="note">
//       {editing ? (
//         <>
//           <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
//           <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
//           <button onClick={handleSaveEditing} type="submit">Save</button>
//           <button onClick={handleCancelEditing} type="submit">Cancel</button>
//         </>
//       ) : (
//         <>
//           <h2>{note.title}</h2>
//           <p>{note.content}</p>
//           <button onClick={handleStartEditing} type="submit">Edit</button>
//           <button onClick={handleDelete} type="submit">Delete</button>
//         </>
//       )}
//     </div>
//   );
// }
// export default NoteItem;
