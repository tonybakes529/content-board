import { useState } from 'react';

interface TopBarProps {
  boardName?: string;
  onAddCard?: () => void;
}

export const TopBar = ({ boardName, onAddCard }: TopBarProps) => {
  return (
    <div className="h-16 bg-surface border-b border-border px-6 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-light">
        {boardName || 'Boards'}
      </h2>
      {onAddCard && (
        <button
          onClick={onAddCard}
          className="px-4 py-2 bg-accent-primary hover:bg-accent-hover text-dark rounded font-medium transition-colors"
        >
          + Add Card
        </button>
      )}
    </div>
  );
};
