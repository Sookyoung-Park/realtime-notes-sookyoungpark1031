import React from 'react';

function NoteItem(props) {
  const { note } = props;

  return (
    <div className="todo-item">
      <h2>{note.title}</h2>
      <p>{note.text}</p>
      <button type="submit">Delete</button>
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
