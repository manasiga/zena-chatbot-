import React from 'react';
import ZenaAvatar from './ZenaAvatar';
import QuickButtons, { QuickButtonItem } from './QuickButtons';
import GlassCard, { GlassCardItem } from './GlassCard';
import DynamicForm, { FormField } from './DynamicForm';
import ThankYou from './ThankYou';
import SocialLinks from './SocialLinks';

export interface CompositeExtra {
  bubbleHtml: string;
  inner: MessageExtra;
}

export type MessageExtra =
  | { type: 'quickButtons'; items: QuickButtonItem[]; onSelect: (item: QuickButtonItem) => void }
  | { type: 'glassCard'; title?: string; items: GlassCardItem[]; onSelect: (item: GlassCardItem) => void }
  | { type: 'form'; fields: FormField[]; submitLabel?: string; onSubmit: (vals: Record<string, string>) => void }
  | { type: 'thankYou'; name?: string }
  | { type: 'social' }
  | { type: 'composite'; bubbleHtml: string; inner: MessageExtra };

export interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  html?: string;
  text?: string;
  extra?: MessageExtra;
  timestamp: string;
}

interface MessageProps {
  message: ChatMessage;
}

function renderExtra(extra: MessageExtra): React.ReactNode {
  switch (extra.type) {
    case 'quickButtons':
      return <QuickButtons items={extra.items} onSelect={extra.onSelect} />;
    case 'glassCard':
      return <GlassCard title={extra.title} items={extra.items} onSelect={extra.onSelect} />;
    case 'form':
      return (
        <DynamicForm
          fields={extra.fields}
          submitLabel={extra.submitLabel}
          onSubmit={extra.onSubmit}
        />
      );
    case 'thankYou':
      return <ThankYou name={extra.name} />;
    case 'social':
      return <SocialLinks />;
    case 'composite':
      return (
        <div>
          <div
            className="bub b"
            style={{ marginBottom: '6px' }}
            dangerouslySetInnerHTML={{ __html: extra.bubbleHtml }}
          />
          {renderExtra(extra.inner)}
        </div>
      );
    default:
      return null;
  }
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`mr${isUser ? ' u' : ''}`}>
      {!isUser && (
        <div className="mav">
          <ZenaAvatar size={30} />
        </div>
      )}
      <div className="mc">
        {/* Bot message with HTML */}
        {!isUser && message.html && (
          <div
            className="bub b"
            dangerouslySetInnerHTML={{ __html: message.html }}
          />
        )}
        {/* Bot message plain text */}
        {!isUser && message.text && (
          <div className="bub b">{message.text}</div>
        )}
        {/* User message */}
        {isUser && (
          <div className="bub u">{message.text}</div>
        )}
        {/* Extra content */}
        {message.extra && renderExtra(message.extra)}
        {/* Timestamp */}
        <div className="mt">{message.timestamp}</div>
      </div>
    </div>
  );
};

export default Message;
