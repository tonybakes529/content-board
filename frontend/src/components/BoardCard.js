import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const BoardCard = ({ board, onDelete, onRename }) => {
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
    return (_jsxs("div", { onClick: () => !isRenaming && navigate(`/board/${board.id}`), className: "bg-surface border border-border rounded-lg p-6 cursor-pointer hover:border-accent-primary transition-colors", children: [_jsx("div", { className: "w-full h-32 bg-border rounded mb-4 flex items-center justify-center text-border", children: board.thumbnail ? (_jsx("img", { src: board.thumbnail, alt: board.name, className: "w-full h-full object-cover rounded" })) : (_jsx("span", { className: "text-4xl", children: "\uD83D\uDCCB" })) }), isRenaming ? (_jsx("input", { type: "text", value: newName, onChange: (e) => setNewName(e.target.value), onClick: (e) => e.stopPropagation(), onBlur: handleRename, onKeyDown: (e) => {
                    if (e.key === 'Enter')
                        handleRename();
                    if (e.key === 'Escape')
                        setIsRenaming(false);
                }, className: "w-full bg-dark border border-border rounded px-2 py-1 text-light mb-3 focus:outline-none focus:border-accent-primary", autoFocus: true })) : (_jsx("h3", { className: "text-lg font-semibold text-light mb-3 truncate", children: board.name })), _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            setShowMenu(!showMenu);
                        }, className: "px-2 py-1 text-border hover:text-light transition-colors", children: "\u22EF" }), showMenu && (_jsxs("div", { className: "absolute right-0 mt-1 w-32 bg-dark border border-border rounded shadow-lg z-10", children: [_jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    setIsRenaming(true);
                                    setShowMenu(false);
                                }, className: "block w-full text-left px-3 py-2 text-sm text-light hover:bg-surface transition-colors", children: "Rename" }), _jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    onDelete(board.id);
                                    setShowMenu(false);
                                }, className: "block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-surface transition-colors border-t border-border", children: "Delete" })] }))] })] }));
};
