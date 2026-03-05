import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { SwipeFileList } from '../components/SwipeFileList';
import { TopBar } from '../components/TopBar';
import { useApi } from '../hooks/useApi';
export const SwipeFilePage = () => {
    const [cards, setCards] = useState([]);
    const { getCards, deleteCard, duplicateCard, loading, error, } = useApi();
    useEffect(() => {
        loadCards();
    }, []);
    const loadCards = async () => {
        try {
            const data = await getCards();
            setCards(data);
        }
        catch (err) {
            console.error('Failed to load cards:', err);
        }
    };
    const handleDeleteCard = async (id) => {
        if (!window.confirm('Delete this card?'))
            return;
        try {
            await deleteCard(id);
            setCards(cards.filter((c) => c.id !== id));
        }
        catch (err) {
            console.error('Failed to delete card:', err);
        }
    };
    const handleDuplicateCard = async (id) => {
        try {
            const newCard = await duplicateCard(id);
            setCards([...cards, newCard]);
        }
        catch (err) {
            console.error('Failed to duplicate card:', err);
        }
    };
    return (_jsxs("div", { className: "flex flex-col h-screen", children: [_jsx(TopBar, { boardName: "Swipe File" }), _jsxs("div", { className: "flex-1 overflow-auto p-8", children: [error && (_jsx("div", { className: "mb-4 p-3 bg-red-900 text-red-100 rounded", children: error })), loading ? (_jsx("div", { className: "text-center py-16 text-border", children: _jsx("p", { children: "Loading cards..." }) })) : (_jsx(SwipeFileList, { cards: cards, onDelete: handleDeleteCard, onDuplicate: handleDuplicateCard }))] })] }));
};
