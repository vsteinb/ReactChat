import React from "react";
import './Auth.css';

import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
	signInFlow: "popup",
	signInOptions: [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID
	]
}


export function SignIn({ auth }) {

	return (
		<StyledFirebaseAuth className="sign-in" uiConfig={uiConfig} firebaseAuth={auth} />
	)
}


export function SignOut({ auth }) {
	return auth.currentUser && (
		<button onClick={() => auth.signOut()}>Log out</button>
	)
}
