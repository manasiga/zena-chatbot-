import React from 'react';
import ZenaAvatar from './ZenaAvatar';

const TypingIndicator: React.FC = () => (
  <div className="tr">
    <div className="mav">
      <ZenaAvatar size={30} />
    </div>
    <div className="tb">
      <div className="td" />
      <div className="td" />
      <div className="td" />
    </div>
  </div>
);

export default TypingIndicator;
