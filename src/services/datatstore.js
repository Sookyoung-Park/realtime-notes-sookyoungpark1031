import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

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

// 인증 상태 변경 감지
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Logged in:', user.uid);
  } else {
    console.log('Logged out');
  }
});

// 이메일/비밀번호 로그인
function loginWithEmail(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

// 이메일/비밀번호 회원 가입
function signUpWithEmail(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

// 로그아웃
function logout() {
  return firebase.auth().signOut();
}

function fetchNotes(setNotes) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    setNotes(newNoteState);
  });
}

function addNotes(note) {
  firebase.database().ref('notes').push(note);
}

function updateNotePosition(noteId, x, y) {
  firebase.database().ref('notes').child(noteId).update({
    x,
    y,
  });
}

const firebasedb = {
  firebase,
  fetchNotes,
  addNotes,
  updateNotePosition,
  loginWithEmail, // 추가된 부분
  signUpWithEmail, // 추가된 부분
  logout, // 추가된 부분
};

export default firebasedb;
