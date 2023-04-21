import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { produce } from 'immer';

function NoteItem(props) {
  const {
    notes, id, note, setNotes,
  } = props;
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.text);
  const [position, setPosition] = useState({ x: note.x, y: note.y });

  function deleteNote() {
    setNotes(
      produce((draftState) => {
        delete draftState[id];
      }),
    );
  }

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleCancelEditing = () => {
    setNewTitle(note.title);
    setNewContent(note.text);
    setEditing(false);
  };

  const handleSaveEditing = () => {
    setNotes(
      produce((draftState) => {
        draftState[id].title = newTitle;
        draftState[id].text = newContent;
      }),
    );
    setEditing(false);
  };

  function printObject(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      console.log(key); // id1, id2
      console.log(value);
    });
  }
  printObject(notes);

  return (
    <div className="note-item" key={id} style={{ position: 'absolute', left: position.x, top: position.y }}>
      {editing ? (
        <>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
          <button onClick={handleCancelEditing} type="submit">Cancel</button>
          <button type="submit" onClick={handleSaveEditing}>Save</button>
        </>
      ) : (
        <>
          <h2>{note.title}</h2>
          <p>{note.text}</p>
          {/* <p>{id}</p> */}
          <button onClick={handleStartEditing} type="submit">Edit</button>
          <button type="button" onClick={deleteNote}>Delete</button>

        </>
      )}

    </div>

  );
}

export default NoteItem;
