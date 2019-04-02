import React from 'react';
import { db } from './firebase';

function ChatInputBox({ user, channelId }) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const { value } = e.target.elements[0];
        db.collection('channels')
          .doc(channelId)
          .collection('messages')
          .add({
            user: db.collection('users').doc(user.uid),
            text: value,
            createdAt: new Date()
          });
        e.target.reset();
      }}
      className="ChatInputBox"
    >
      <input className="ChatInput" placeholder={`Message #${channelId}`} />
    </form>
  );
}

export default ChatInputBox;
