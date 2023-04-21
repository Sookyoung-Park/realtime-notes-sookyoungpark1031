import React from 'react';

function NoteItem(props) {
  return (
    <div className="todo-item">
      {props.item}
      <button type="submit">Delete</button>
    </div>
  );
}

export default NoteItem;
