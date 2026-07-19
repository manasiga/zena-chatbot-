import React from 'react';

interface ZenaAvatarProps {
  size?: number;
}

const ZenaAvatar: React.FC<ZenaAvatarProps> = ({ size = 30 }) => (
  <svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
    <rect x="8" y="8" width="26" height="18" rx="6" fill="rgba(255,255,255,0.92)" />
    <rect x="18" y="3" width="6" height="7" rx="3" fill="rgba(255,255,255,0.85)" />
    <circle cx="21" cy="2" r="2.5" fill="#c084fc" />
    <ellipse cx="15" cy="16" rx="3.5" ry="4" fill="#7c3aed" />
    <ellipse cx="27" cy="16" rx="3.5" ry="4" fill="#7c3aed" />
    <ellipse cx="15" cy="16" rx="1.5" ry="2.2" fill="#c084fc" />
    <ellipse cx="27" cy="16" rx="1.5" ry="2.2" fill="#c084fc" />
    <circle cx="15.5" cy="14.5" r="1" fill="#fff" opacity=".8" />
    <circle cx="27.5" cy="14.5" r="1" fill="#fff" opacity=".8" />
    <rect x="14" y="22" width="14" height="3" rx="1.5" fill="rgba(124,58,237,0.4)" />
    <rect x="10" y="27" width="22" height="12" rx="5" fill="rgba(255,255,255,0.85)" />
    <circle cx="21" cy="32" r="3" fill="#7c3aed" />
    <rect x="3" y="28" width="7" height="9" rx="3.5" fill="rgba(255,255,255,0.7)" />
    <rect x="32" y="28" width="7" height="9" rx="3.5" fill="rgba(255,255,255,0.7)" />
  </svg>
);

export default ZenaAvatar;
