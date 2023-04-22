import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';
import firebase from 'firebase/compat/app';
import CodeBlock from './CodeBlock';
import 'firebase/compat/database';

function NoteItem(props) {
  const {
    notes, id, note, setNotes,
  } = props;
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.text);
  const [position, setPosition] = useState({ x: note.x, y: note.y });
  const [backgroundColor, setBackgroundColor] = useState('');
  const colors = ['#ff8a80', '#80d8ff', '#ccff90'];

  useEffect(() => {
    // Firebase에서 색상 불러오기
    firebase.database().ref('notes').child(id).once('value')
      .then((snapshot) => {
        const savedBackgroundColor = snapshot.val().backgroundColor;
        if (savedBackgroundColor) {
          setBackgroundColor(savedBackgroundColor);
        } else {
          const randomIndex = Math.floor(Math.random() * colors.length);
          const randomColor = colors[randomIndex];
          setBackgroundColor(randomColor);
          firebase.database().ref('notes').child(id).update({ backgroundColor: randomColor })
            .then(() => console.log('Background color saved successfully'))
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, colors]);

  // if (!backgroundColor) {
  //   const colors = ['#ff8a80', '#80d8ff', '#ccff90'];
  //   const randomIndex = Math.floor(Math.random() * colors.length);
  //   setBackgroundColor(colors[randomIndex]);
  // }

  function deleteNote() {
    firebase.database().ref('notes').child(id).remove()
      .then(() => {
        setNotes(
          produce((draftState) => {
            delete draftState[id];
          }),
        );
      })
      .catch((error) => {
        console.error(error);
      });
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
    firebase.database().ref('notes').child(id).update({
      title: newTitle,
      text: newContent,
    })
      .then(() => {
        setEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleStopDrag = (event, ui) => {
    const { x, y } = ui;
    firebase.database().ref('notes').child(id).update({ x, y })
      .then(() => {
        console.log('Position updated successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // function printObject(obj) {
  //   Object.entries(obj).forEach(([key, value]) => {
  //     console.log(key); // id1, id2
  //     console.log(value);
  //   });
  // }
  // printObject(notes);

  return (
    <Draggable
      defaultPosition={{ x: position.x, y: position.y }}
      // onStop={(event, ui) => setPosition({ x: ui.x, y: ui.y }), { handleStopDrag }}
      onStop={(event, ui) => {
        setPosition({ x: ui.x, y: ui.y });
        handleStopDrag(event, ui);
      }}
    >
      <div className="note-item" style={{ position: 'absolute', backgroundColor }}>
        {editing ? (
          <>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <ReactMarkdown
              value={`# ${newTitle}\n\n${newContent}`}
              onChange={(e) => setNewContent(e.target.value)}
              className="note-textarea"
              allowDangerousHtml
              renderers={{
                code: CodeBlock,
              }}
            />
            <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
            <button onClick={handleCancelEditing} type="submit">Cancel</button>
            <button type="submit" onClick={handleSaveEditing}>Save</button>
          </>
        ) : (
          <>
            <h2>{note.title}</h2>
            <ReactMarkdown>{note.text || ''}</ReactMarkdown>
            <button onClick={handleStartEditing} type="submit">Edit</button>
            <button type="button" onClick={deleteNote}>Delete</button>
          </>
        )}
      </div>
    </Draggable>
  );
}

export default NoteItem;
