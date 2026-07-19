import React from 'react';

export interface QuickButtonItem {
  label: string;
  key: string;
}

interface QuickButtonsProps {
  items: QuickButtonItem[];
  onSelect: (item: QuickButtonItem) => void;
}

const QuickButtons: React.FC<QuickButtonsProps> = ({ items, onSelect }) => (
  <div className="qbs">
    {items.map((item) => (
      <button
        key={item.key}
        className="qb"
        onClick={() => onSelect(item)}
      >
        {item.label}
      </button>
    ))}
  </div>
);

export default QuickButtons;
