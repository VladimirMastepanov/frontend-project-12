import React from 'react';
import { useSelector } from 'react-redux';
import { messagesSelector } from '../../features/messages/messagesSlice';

const MessagesList = () => {
  const ids = useSelector(messagesSelector.selectIds);
  const entities = useSelector(messagesSelector.selectEntities);
  const activeChannelId = 1;
  const actualMessages = Object.values(entities).filter((m) => m.channelId === activeChannelId);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {actualMessages ?? actualMessages.map((message) => (
        <div className="text-break mb-2">
          <b>!{message.username}</b>
          : {message.body}
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
