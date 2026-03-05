import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { BoardCard } from '../components/BoardCard';
import { useApi } from '../hooks/useApi';
export const BoardsPage = () => {
    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const { getBoards, createBoard, deleteBoard, updateBoard, loading, error } = useApi();
    useEffect(() => {
        loadBoards();
    }, []);
    const loadBoards = async () => {
        try {
            const data = await getBoards();
            setBoards(data);
        }
        catch (err) {
            console.error('Failed to load boards:', err);
        }
    };
    const handleCreateBoard = async () => {
        if (!newBoardName.trim())
            return;
        try {
            const newBoard = await createBoard(newBoardName);
            setBoards([...boards, newBoard]);
            setNewBoardName('');
            setIsCreating(false);
        }
        catch (err) {
            console.error('Failed to create board:', err);
        }
    };
    const handleDeleteBoard = async (id) => {
        if (!window.confirm('Delete this board?'))
            return;
        try {
            await deleteBoard(id);
            setBoards(boards.filter((b) => b.id !== id));
        }
        catch (err) {
            console.error('Failed to delete board:', err);
        }
    };
    const handleRenameBoard = async (id, newName) => {
        try {
            await updateBoard(id, newName);
            setBoards(boards.map((b) => (b.id === id ? { ...b, name: newName } : b)));
        }
        catch (err) {
            console.error('Failed to rename board:', err);
        }
    };
    return (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-light mb-4", children: "Your Boards" }), isCreating ? (_jsxs("div", { className: "flex gap-2 max-w-md", children: [_jsx("input", { type: "text", placeholder: "Board name...", value: newBoardName, onChange: (e) => setNewBoardName(e.target.value), onKeyDown: (e) => {
                                    if (e.key === 'Enter')
                                        handleCreateBoard();
                                    if (e.key === 'Escape') {
                                        setIsCreating(false);
                                        setNewBoardName('');
                                    }
                                }, className: "flex-1 px-4 py-2 bg-surface border border-border rounded text-light focus:outline-none focus:border-accent-primary", autoFocus: true }), _jsx("button", { onClick: handleCreateBoard, disabled: loading, className: "px-4 py-2 bg-accent-primary hover:bg-accent-hover text-dark rounded font-medium disabled:opacity-50 transition-colors", children: "Create" }), _jsx("button", { onClick: () => {
                                    setIsCreating(false);
                                    setNewBoardName('');
                                }, className: "px-4 py-2 bg-border hover:bg-border text-light rounded font-medium transition-colors", children: "Cancel" })] })) : (_jsx("button", { onClick: () => setIsCreating(true), className: "px-6 py-2 bg-accent-primary hover:bg-accent-hover text-dark rounded font-medium transition-colors", children: "+ New Board" }))] }), error && (_jsx("div", { className: "mb-4 p-3 bg-red-900 text-red-100 rounded", children: error })), boards.length === 0 ? (_jsx("div", { className: "text-center py-16", children: _jsx("p", { className: "text-border text-lg mb-4", children: loading ? 'Loading boards...' : 'No boards yet. Create one to get started!' }) })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: boards.map((board) => (_jsx(BoardCard, { board: board, onDelete: handleDeleteBoard, onRename: handleRenameBoard }, board.id))) }))] }));
};
