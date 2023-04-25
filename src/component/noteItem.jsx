import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';
import firebase from 'firebase/compat/app';
import CodeBlock from './codeblock';
import 'firebase/compat/database';
import firebasedb from '../services/datatstore';

function NoteItem(props) {
  const {
    notes, id, note, setNotes,
  } = props;
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.text);
  const [position, setPosition] = useState({ x: note.x, y: note.y });
  const [backgroundColor, setBackgroundColor] = useState('');
  const [dragging, setDragging] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const colors = ['#FFE7F4', '#E3FFBA', '#FFFFB1'];

  useEffect(() => {
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

    const handleSnapshot = (snapshot) => {
      const data = snapshot.val();
      const currentUser = firebase.auth().currentUser.uid;
      setEditing(data.editing === currentUser);
      setEditingUser(data.editing);
    };

    firebase.database().ref('notes').child(id).on('value', handleSnapshot);

    return () => {
      firebase.database().ref('notes').child(id).off('value', handleSnapshot);
    };
  }, [id, colors]);

  function deleteNote() {
    if (editingUser) {
      alert('No! Someone is editing now');
    } else {
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
  }

  const handleStartEditing = () => {
    const currentUser = firebase.auth().currentUser.uid;

    if (editingUser) {
      alert('No! Someone is editing now');
    } else {
      firebase.database().ref('notes').child(id).update({ editing: currentUser })
        .then(() => setEditing(true))
        .catch((error) => console.error(error));
    }

    console.log('This note is being edited by another user.');
  };

  const handleCancelEditing = () => {
    setNewTitle(note.title);
    setNewContent(note.text);
    setEditing(false);

    firebase.database().ref('notes').child(id).update({ editing: null })
      .then(() => console.log('Editing finished successfully'))
      .catch((error) => console.error(error));
  };

  const handleSaveEditing = () => {
    firebase.database().ref('notes').child(id).update({
      title: newTitle,
      text: newContent,
      editing: null,
    })
      .then(() => {
        setEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleStartDrag = () => {
    setDragging(true);
  };

  const handleStopDrag = (event, ui) => {
    const { x, y } = ui;
    firebasedb.updateNotePosition(id, x, y);
  };

  return (
    // </Draggable>
    <Draggable
      bounds={{
        left: 20,
        top: 30,
        right: window.innerWidth - 330,
        bottom: window.innerHeight - 220,
      }}
      defaultPosition={{ x: position.x, y: position.y }}
      position={{ x: notes[id].x, y: notes[id].y }}
      onStart={handleStartDrag}
      onDrag={handleStopDrag}
    >

      <div className="note-item" style={{ position: 'absolute', backgroundColor }}>
        {editing && editingUser === firebase.auth().currentUser.uid ? (
          <div>
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
          </div>
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
