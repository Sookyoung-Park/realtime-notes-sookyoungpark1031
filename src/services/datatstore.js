import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// ^ we are using compat notation here as the new firebase 9 api is a mess and i kinda hate it

const firebaseConfig = {
  apiKey: 'AIzaSyCsd7Y1YCoyATaFmUk1uKlxpT_F3PifPdg',
  authDomain: 'firenotes-aeddb.firebaseapp.com',
  databaseURL: 'https://firenotes-aeddb-default-rtdb.firebaseio.com',
  projectId: 'firenotes-aeddb',
  storageBucket: 'firenotes-aeddb.appspot.com',
  messagingSenderId: '30411644489',
  appId: '1:30411644489:web:183b804209376ff09c6998',
  measurementId: 'G-SF495RRKQG',
};

firebase.initializeApp(firebaseConfig);

function fetchNotes(setNotes) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    // callback(newNoteState);
    setNotes(newNoteState);
  });
}
const firebasedb = {
  firebase,
  fetchNotes,
};

export default firebasedb;

// fetchNotes((notes) => {
//   this.setState({ notes });
// });

// firebasedb.fetchNotes((notes) => {
//   this.setState({ notes });
// });

// firebase.database().ref('notes').child(id).remove();
// // firebase.database().ref('notes').child(id).update()도 사용할 수 있습니다.
