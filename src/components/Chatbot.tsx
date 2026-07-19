import React from 'react';
import FloatingButton from './FloatingButton';
import ChatWindow from './ChatWindow';
import { useChatbot } from '../hooks/useChatbot';

const Chatbot: React.FC = () => {
  const {
    messages,
    isTyping,
    isOpen,
    showNotif,
    inputValue,
    setInputValue,
    toggleChat,
    doSend,
  } = useChatbot();

  return (
    <>
      <FloatingButton isOpen={isOpen} showNotif={showNotif} onClick={toggleChat} />
      <ChatWindow
        isOpen={isOpen}
        isTyping={isTyping}
        messages={messages}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSend={doSend}
        onClose={toggleChat}
      />
    </>
  );
};

export default Chatbot;
