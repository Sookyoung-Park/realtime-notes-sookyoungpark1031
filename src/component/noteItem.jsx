import React from 'react';
// import PropTypes from 'prop-types';

function NoteItem(props) {
  // const { item } = props;
  // console.log({ item });
  return (
    <div className="todo-item">
      <div key={props.itemtitle}>
        <h2>{props.itemtitle}</h2>
        <p>{props.itemtext}</p>
      </div>
      {/* <h3>{props.itemtitle}</h3>
      <h4>{props.itemtext}</h4> */}

      <button type="submit">Delete</button>
    </div>
  );
}

// NoteItem.propTypes = {
//   item: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     text: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default NoteItem;
