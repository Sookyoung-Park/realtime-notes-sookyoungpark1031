import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './noteItem';

function NoteBoard(props) {
  const { notes, setNotes } = props;
  console.log({ notes });

  return (

    <div>
      {Object.entries(notes).map(([id, note]) => (
        <NoteItem key={id} note={note} setNotes={setNotes} />
      ))}
      {/* {Object.entries(notes).map(([id, note]) => (
        <NoteItem key={id} note={note} handleDelete={() => handleDelete(id)} />
      ))} */}
    </div>
  );
}

NoteBoard.propTypes = {
  notes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default NoteBoard;
