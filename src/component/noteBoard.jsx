import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './noteItem';

function NoteBoard(props) {
  const { notes } = props;
  console.log({ notes });

  return (
    <div>
      {Object.values(notes).map((note) => (
        <NoteItem key={note.title} note={note} />
      ))}
    </div>
  );

  // return (

  //   <div>
  //     {Object.values(notes).map((note) => (
  //       <div key={note.title}>
  //         <h2>{note.title}</h2>
  //         <p>{note.text}</p>
  //       </div>
  //     ))}

  //     {Object.values(notes).map((note) => <NoteItem itemtitle={note.title} />)}
  //     {Object.values(notes).map((note) => <NoteItem itemtext={note.text} />)}

  //   </div>
  // );
}

NoteBoard.propTypes = {
  notes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoteBoard;
