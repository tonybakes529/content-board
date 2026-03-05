import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Board } from '../types';

interface BoardCardProps {
  board: Board;
  onDelete: (id: number) => void;
  onRename: (id: number, newName: string) => void;
}

export const BoardCard = ({ board, onDelete, onRename }: BoardCardProps) => {
  const navigate = useNavigate();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(board.name);
  const [showMenu, setShowMenu] = useState(false);

  const handleRename = () => {
    if (newName.trim()) {
      onRename(board.id, newName);
      setIsRenaming(false);
    }
  };

  return (
    <div
      onClick={() => !isRenaming && navigate(`/board/${board.id}`)}
      className="bg-surface border border-border rounded-lg p-6 cursor-pointer hover:border-accent-primary transition-colors"
    >
      {/* Board Thumbnail Placeholder */}
      <div className="w-full h-32 bg-border rounded mb-4 flex items-center justify-center text-border">
        {board.thumbnail ? (
          <img src={board.thumbnail} alt={board.name} className="w-full h-full object-cover rounded" />
        ) : (
          <span className="text-4xl">📋</span>
        )}
      </div>

      {/* Board Name */}
      {isRenaming ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename();
            if (e.key === 'Escape') setIsRenaming(false);
          }}
          className="w-full bg-dark border border-border rounded px-2 py-1 text-light mb-3 focus:outline-none focus:border-accent-primary"
          autoFocus
        />
      ) : (
        <h3 className="text-lg font-semibold text-light mb-3 truncate">
          {board.name}
        </h3>
      )}

      {/* Menu Button */}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="px-2 py-1 text-border hover:text-light transition-colors"
        >
          ⋯
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-1 w-32 bg-dark border border-border rounded shadow-lg z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsRenaming(true);
                setShowMenu(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm text-light hover:bg-surface transition-colors"
            >
              Rename
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(board.id);
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
  );
};
