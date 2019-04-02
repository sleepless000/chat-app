import React, { useEffect, useRef } from 'react';
import { useCollection } from './hooks/useCollection';
import MessageWithAvatar from './MessageWithAvatar';
import isSameDay from 'date-fns/is_same_day';

function Messages({ channelId }) {
  const scroller = useRef();
  const messages = useCollection(`channels/${channelId}/messages`, 'createdAt');
  useEffect(() => {
    const node = scroller.current;
    node.scrollTop = node.scrollHeight;
  });
  return (
    <div className="Messages" ref={scroller}>
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, index) => {
        const previous = messages[index - 1];
        const showDay = shouldShawDay(previous, message);
        const showAvatar = shouldShawAvatar(previous, message);

        return showAvatar ? (
          <MessageWithAvatar
            message={message}
            showDay={showDay}
            key={message.id}
          />
        ) : (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function shouldShawDay(previous, message) {
  const isFirst = !previous;
  if (isFirst) return true;

  const isNewDay = !isSameDay(
    previous.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  );

  return isNewDay;
}

function shouldShawAvatar(previous, message) {
  const isFirst = !previous;
  if (isFirst) return true;

  const diffrentUser = message.user.id !== previous.user.id;
  if (diffrentUser) return true;

  const hasBeenaWhile =
    message.createdAt.seconds - previous.createdAt.seconds > 180;
  return hasBeenaWhile;
}

export default Messages;
