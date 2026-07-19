import React from 'react';
import ZenaAvatar from './ZenaAvatar';

interface HeaderProps {
  onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClose }) => (
  <div className="ch">
    <div className="hav">
      <ZenaAvatar size={44} />
    </div>
    <div className="hi">
      <div className="hn">ZeNA</div>
      <div className="hs">
        <span className="sd" />
        Active now
      </div>
    </div>
    <div className="hbadge">ZeAI Soft</div>
    <button className="hclose" onClick={onClose} aria-label="Close">
      &#x2715;
    </button>
  </div>
);

export default Header;
