import React from 'react';

export interface GlassCardItem {
  label: string;
  key: string;
  [key: string]: unknown;
}

interface GlassCardProps {
  title?: string;
  items: GlassCardItem[];
  onSelect: (item: GlassCardItem) => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ title, items, onSelect }) => (
  <div className="gc">
    {title && <div className="gct">{title}</div>}
    {items.map((item) => (
      <div key={item.key} className="gi" onClick={() => onSelect(item)}>
        {item.label}
      </div>
    ))}
  </div>
);

export default GlassCard;
