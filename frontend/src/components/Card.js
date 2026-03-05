import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export const Card = ({ card, onDelete, onDuplicate, onRename, onExpand, }) => {
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
    return (_jsxs("div", { className: "bg-surface border border-border rounded-lg overflow-hidden hover:border-accent-primary transition-colors", children: [_jsx("div", { className: `${getTypeColor()} h-2` }), card.type === 'youtube' && card.thumbnail_url && (_jsx("div", { className: "w-full h-32 bg-border overflow-hidden", children: _jsx("img", { src: card.thumbnail_url, alt: card.title, className: "w-full h-full object-cover" }) })), _jsxs("div", { className: "p-4", children: [isRenaming ? (_jsx("input", { type: "text", value: newTitle, onChange: (e) => setNewTitle(e.target.value), onBlur: handleRename, onKeyDown: (e) => {
                            if (e.key === 'Enter')
                                handleRename();
                            if (e.key === 'Escape')
                                setIsRenaming(false);
                        }, className: "w-full bg-dark border border-border rounded px-2 py-1 text-light text-sm focus:outline-none focus:border-accent-primary", autoFocus: true })) : (_jsx("h3", { className: "text-sm font-semibold text-light mb-2 truncate cursor-pointer hover:text-accent-primary", onClick: () => setIsRenaming(true), children: card.title })), _jsx("p", { className: "text-xs text-border mb-3 line-clamp-2", children: getPreview() }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "px-2 py-1 bg-border rounded text-xs text-light capitalize", children: card.type }), _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowMenu(!showMenu), className: "px-2 py-1 text-border hover:text-light transition-colors", children: "\u22EF" }), showMenu && (_jsxs("div", { className: "absolute right-0 mt-1 w-36 bg-dark border border-border rounded shadow-lg z-10", children: [_jsx("button", { onClick: () => {
                                                    onExpand?.(card);
                                                    setShowMenu(false);
                                                }, className: "block w-full text-left px-3 py-2 text-sm text-light hover:bg-surface transition-colors", children: "Expand" }), _jsx("button", { onClick: () => {
                                                    setIsRenaming(true);
                                                    setShowMenu(false);
                                                }, className: "block w-full text-left px-3 py-2 text-sm text-light hover:bg-surface transition-colors", children: "Rename" }), _jsx("button", { onClick: () => {
                                                    onDuplicate(card.id);
                                                    setShowMenu(false);
                                                }, className: "block w-full text-left px-3 py-2 text-sm text-light hover:bg-surface transition-colors", children: "Duplicate" }), _jsx("button", { onClick: () => {
                                                    onDelete(card.id);
                                                    setShowMenu(false);
                                                }, className: "block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-surface transition-colors border-t border-border", children: "Delete" })] }))] })] }), card.type === 'youtube' && card.youtube_url && (_jsx("a", { href: card.youtube_url, target: "_blank", rel: "noopener noreferrer", className: "text-xs text-accent-primary hover:text-accent-hover mt-2 inline-block", children: "View on YouTube \u2192" }))] })] }));
};
