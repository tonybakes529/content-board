import { useEffect, useState } from 'react';
import { Board } from '../types';
import { BoardCard } from '../components/BoardCard';
import { useApi } from '../hooks/useApi';

export const BoardsPage = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { getBoards, createBoard, deleteBoard, updateBoard, loading, error } =
    useApi();

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      const data = await getBoards();
      setBoards(data);
    } catch (err) {
      console.error('Failed to load boards:', err);
    }
  };

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) return;

    try {
      const newBoard = await createBoard(newBoardName);
      setBoards([...boards, newBoard]);
      setNewBoardName('');
      setIsCreating(false);
    } catch (err) {
      console.error('Failed to create board:', err);
    }
  };

  const handleDeleteBoard = async (id: number) => {
    if (!window.confirm('Delete this board?')) return;

    try {
      await deleteBoard(id);
      setBoards(boards.filter((b) => b.id !== id));
    } catch (err) {
      console.error('Failed to delete board:', err);
    }
  };

  const handleRenameBoard = async (id: number, newName: string) => {
    try {
      await updateBoard(id, newName);
      setBoards(
        boards.map((b) => (b.id === id ? { ...b, name: newName } : b))
      );
    } catch (err) {
      console.error('Failed to rename board:', err);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-light mb-4">Your Boards</h2>

        {isCreating ? (
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="Board name..."
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateBoard();
                if (e.key === 'Escape') {
                  setIsCreating(false);
                  setNewBoardName('');
                }
              }}
              className="flex-1 px-4 py-2 bg-surface border border-border rounded text-light focus:outline-none focus:border-accent-primary"
              autoFocus
            />
            <button
              onClick={handleCreateBoard}
              disabled={loading}
              className="px-4 py-2 bg-accent-primary hover:bg-accent-hover text-dark rounded font-medium disabled:opacity-50 transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewBoardName('');
              }}
              className="px-4 py-2 bg-border hover:bg-border text-light rounded font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="px-6 py-2 bg-accent-primary hover:bg-accent-hover text-dark rounded font-medium transition-colors"
          >
            + New Board
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900 text-red-100 rounded">
          {error}
        </div>
      )}

      {boards.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-border text-lg mb-4">
            {loading ? 'Loading boards...' : 'No boards yet. Create one to get started!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onDelete={handleDeleteBoard}
              onRename={handleRenameBoard}
            />
          ))}
        </div>
      )}
    </div>
  );
};
