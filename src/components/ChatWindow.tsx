import React, { useEffect, useRef } from 'react';
import Header from './Header';
import Message, { ChatMessage } from './Message';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  isOpen: boolean;
  isTyping: boolean;
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  isTyping,
  messages,
  inputValue,
  onInputChange,
  onSend,
  onClose,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const ta = e.target;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 96) + 'px';
    onInputChange(ta.value);
  };

  return (
    <div className={`cwin${isOpen ? '' : ' hidden'}`}>
      <Header onClose={onClose} />

      {/* Messages area */}
      <div className="cm">
        <div className="dd"><span>Today</span></div>
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="cb">
        <textarea
          ref={textareaRef}
          className="cta"
          placeholder="Type your message…"
          rows={1}
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        <button className="sndb" onClick={onSend} aria-label="Send">
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
