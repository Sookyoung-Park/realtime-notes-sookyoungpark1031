import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './noteItem';

function NoteBoard(props) {
  const { notes, setNotes } = props;
  // console.log({ notes });

  return (
    <div className="note-board">
      {Object.entries(notes).map(([id, note]) => (
        <NoteItem
          key={id}
          id={id}
          note={note}
          notes={notes}
          setNotes={setNotes}
        />
      ))}
    </div>
  );
}

NoteBoard.propTypes = {
  notes: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      // z: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default NoteBoard;
