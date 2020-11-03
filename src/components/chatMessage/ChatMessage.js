import React from "react";
import './ChatMessage.css';


function ChatMessage({ text, uid, photoUrl, username, auth }) {

	const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

	return (
		<div className={`message ${messageClass}`}>
			{uid === auth.currentUser.uid || ((photoUrl && <img className="username" src={photoUrl || null} alt={username} />) || <p className="username">{username}</p>)}

			<p className="text">{text}</p>
		</div>
	)
}

export default ChatMessage;
