import React, { useRef, useState } from "react";
import './App.css';

import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ]
}

let auth = null;
let firestore = null;

function App() {

  // init config ONCE
  firebase.apps.length || firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));

  auth = firebase.auth();
  firestore = firebase.firestore();

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {

  return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Log out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const dummy = useRef();

  const [messages] = useCollectionData(query, {idField: "id"});
  const [formValue, setFormValue] = useState("");

  const sendMessage = e => {
    e.preventDefault();

    const { uid, photoUrl } = auth.currentUser;
    messagesRef.add({
      uid,
      photoUrl: photoUrl || "",
      text: formValue,
      username: auth.currentUser.displayName || "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(_ => {
      setFormValue("");

      dummy.current.scrollIntoView({behaviour: "smooth"});
    });
  }

  return (
    <div className="chat-room">
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} photoUrl={msg.photoUrl} username={msg.username}/>)}
      </main>

      <div ref={dummy}></div>

      <form onSubmit={sendMessage}>
        <input value={formValue} onInput={e => setFormValue(e.currentTarget.value)} />

        <button type="submit">⮚</button>
      </form>
    </div>
  )
}

function ChatMessage(props) {
  const { text, uid, photoUrl, username } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoUrl || null} alt={username}/>

      <p className="message">{text}</p>
    </div>
  )
}

export default App;
