import React from 'react';
// import NoteItem from './noteItem';
import PropTypes from 'prop-types';

function NoteBoard(props) {
  const { notes } = props;

  return (
    <div>
      <h1>할 일 목록</h1>
      {/* {props.notes.map((item) => <NoteItem item={item} />)} */}
    </div>
  );
}

NoteBoard.propTypes = {
  notes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoteBoard;
// 내꺼
// function NoteBoard(props) {
//   console.log(props);
//   // 씨발
//   const { notes } = props;

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <h1>{props}</h1>
//       {/* {props.notes.map((item) => <NoteItem item={item} />)} */}
//     </div>
//   );
// }

// export default NoteBoard;
