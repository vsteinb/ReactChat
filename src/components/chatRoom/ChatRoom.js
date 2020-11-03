import React, { useRef, useState } from "react";
import './ChatRoom.css';

import ChatMessage from '../chatMessage/ChatMessage';

import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';


function ChatRoom({ auth, firestore }) {
	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy("createdAt").limit(25);
	const dummy = useRef();

	const [messages] = useCollectionData(query, { idField: "id" });
	const [formValue, setFormValue] = useState("");

	const sendMessage = e => {
		e.preventDefault();

		var text = formValue.trim();
		if(!text.length) return;

		const { uid, photoUrl } = auth.currentUser;
		messagesRef.add({
			uid,
			photoUrl: photoUrl || "",
			text,
			username: auth.currentUser.displayName || "",
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		}).then(_ => {
			setFormValue("");

			dummy.current.scrollIntoView({ behaviour: "smooth" });
		});
	}

	return (
		<div className="chatroom">
			<main>
				{messages && messages.map(msg => <ChatMessage key={msg.id} auth={auth} uid={msg.uid} text={msg.text} photoUrl={msg.photoUrl} username={msg.username} />)}
				<div ref={dummy}></div>
			</main>

			<form onSubmit={sendMessage}>
				<input value={formValue} onInput={e => setFormValue(e.currentTarget.value)} />

				<button type="submit">⮚</button>
			</form>
		</div>
	)
}

export default ChatRoom;
