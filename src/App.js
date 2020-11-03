import React from "react";
import './App.css';

import ChatRoom from './components/chatRoom/ChatRoom';
import {SignIn, SignOut} from './components/auth/Auth';

import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';


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
        <SignOut auth={auth} />
      </header>

      <section>
        {user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth} />}
      </section>
    </div>
  );
}

export default App;
