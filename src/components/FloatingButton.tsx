import React from 'react';
import ZenaAvatar from './ZenaAvatar';

interface FloatingButtonProps {
  isOpen: boolean;
  showNotif: boolean;
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ isOpen, showNotif, onClick }) => (
  <button
    className={`fab${isOpen ? ' open' : ''}`}
    onClick={onClick}
    aria-label="Open ZeNA chat"
  >
    <ZenaAvatar size={30} />
    {showNotif && <div className="fab-notif">1</div>}
  </button>
);

export default FloatingButton;
