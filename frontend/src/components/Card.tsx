import { useState } from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
  onRename: (id: number, newTitle: string) => void;
  onExpand?: (card: CardType) => void;
}

export const Card = ({
  card,
  onDelete,
  onDuplicate,
  onRename,
  onExpand,
}: CardProps) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [showMenu, setShowMenu] = useState(false);

  const handleRename = () => {
    if (newTitle.trim()) {
      onRename(card.id, newTitle);
      setIsRenaming(false);
    }
  };

  const getPreview = () => {
    if (card.type === 'youtube' && card.transcript) {
      return card.transcript.substring(0, 200) + '...';
    }
    if (card.content) {
      return card.content.substring(0, 200) + '...';
    }
    return 'No content';
  };

  const getTypeColor = () => {
    switch (card.type) {
      case 'youtube':
        return 'bg-red-900';
      case 'text':
        return 'bg-blue-900';
      case 'script':
        return 'bg-green-900';
      default:
        return 'bg-border';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden hover:border-accent-primary transition-colors">
      {/* Card Header */}
      <div className={`${getTypeColor()} h-2`} />

      {/* Thumbnail/Preview */}
      {card.type === 'youtube' && card.thumbnail_url && (
        <div className="w-full h-32 bg-border overflow-hidden">
          <img
            src={card.thumbnail_url}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Card Content */}
      <div className="p-4">
        {isRenaming ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename();
              if (e.key === 'Escape') setIsRenaming(false);
            }}
            className="w-full bg-dark border border-border rounded px-2 py-1 text-light text-sm focus:outline-none focus:border-accent-primary"
            autoFocus
          />
        ) : (
          <h3 className="text-sm font-semibold text-light mb-2 truncate cursor-pointer hover:text-accent-primary" onClick={() => setIsRenaming(true)}>
            {card.title}
          </h3>
        )}

        <p className="text-xs text-border mb-3 line-clamp-2">
          {getPreview()}
        </p>

        {/* Card Type Badge */}
        <div className="flex items-center justify-between">
          <span className="px-2 py-1 bg-border rounded text-xs text-light capitalize">
            {card.type}
          </span>

          {/* Menu Button */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="px-2 py-1 text-border hover:text-light transition-colors"
            >
              ⋯
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-dark border border-border rounded shadow-lg z-10">
                <button
                  onClick={() => {
                    onExpand?.(card);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-light hover:bg-surface transition-colors"
                >
                  Expand
                </button>
                <button
                  onClick={() => {
                    setIsRenaming(true);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-light hover:bg-surface transition-colors"
                >
                  Rename
                </button>
                <button
                  onClick={() => {
                    onDuplicate(card.id);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-light hover:bg-surface transition-colors"
                >
                  Duplicate
                </button>
                <button
                  onClick={() => {
                    onDelete(card.id);
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-surface transition-colors border-t border-border"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {card.type === 'youtube' && card.youtube_url && (
          <a
            href={card.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent-primary hover:text-accent-hover mt-2 inline-block"
          >
            View on YouTube →
          </a>
        )}
      </div>
    </div>
  );
};
