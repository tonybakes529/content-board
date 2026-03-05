import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { TopBar } from '../components/TopBar';
import { useApi } from '../hooks/useApi';
export const BoardDetailPage = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState([]);
    const [showAddCard, setShowAddCard] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);
    const [formData, setFormData] = useState({
        type: 'text',
        title: '',
    });
    const { getCards, createCard, deleteCard, updateCard, duplicateCard, getYoutubeTranscript, loading, error, } = useApi();
    useEffect(() => {
        if (boardId) {
            loadBoardAndCards(parseInt(boardId));
        }
    }, [boardId]);
    const loadBoardAndCards = async (id) => {
        try {
            const data = await getCards(id);
            setCards(data);
            // Mock board loading - in real app, would fetch from API
            setBoard({
                id,
                name: `Board ${id}`,
                created_at: new Date().toISOString(),
            });
        }
        catch (err) {
            console.error('Failed to load cards:', err);
        }
    };
    const handleAddCard = async () => {
        if (!formData.title.trim())
            return;
        try {
            let cardData = {
                board_id: parseInt(boardId),
                type: formData.type,
                title: formData.title,
                position_index: cards.length,
            };
            if (formData.type === 'youtube' && formData.youtubeUrl) {
                try {
                    const transcript = await getYoutubeTranscript(formData.youtubeUrl);
                    cardData = {
                        ...cardData,
                        youtube_url: formData.youtubeUrl,
                        youtube_video_id: transcript.videoId,
                        transcript: transcript.transcript,
                        thumbnail_url: transcript.thumbnail,
                    };
                }
                catch (err) {
                    console.error('Failed to fetch YouTube transcript:', err);
                    alert('Failed to fetch YouTube transcript. Please check the URL.');
                    return;
                }
            }
            else if (formData.type !== 'youtube') {
                cardData.content = formData.content || '';
            }
            const newCard = await createCard(cardData);
            setCards([...cards, newCard]);
            setFormData({ type: 'text', title: '' });
            setShowAddCard(false);
        }
        catch (err) {
            console.error('Failed to create card:', err);
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
    const handleRenameCard = async (id, newTitle) => {
        try {
            await updateCard(id, { title: newTitle });
            setCards(cards.map((c) => (c.id === id ? { ...c, title: newTitle } : c)));
        }
        catch (err) {
            console.error('Failed to rename card:', err);
        }
    };
    if (!board) {
        return _jsx("div", { className: "text-light", children: "Loading..." });
    }
    return (_jsxs("div", { className: "flex flex-col h-screen", children: [_jsx(TopBar, { boardName: board.name, onAddCard: () => setShowAddCard(true) }), _jsxs("div", { className: "flex-1 overflow-auto p-8", children: [showAddCard && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-surface border border-border rounded-lg p-6 w-96 shadow-lg", children: [_jsx("h3", { className: "text-xl font-bold text-light mb-4", children: "Add Card" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-light mb-2", children: "Type" }), _jsxs("select", { value: formData.type, onChange: (e) => setFormData({
                                                        ...formData,
                                                        type: e.target.value,
                                                    }), className: "w-full px-3 py-2 bg-dark border border-border rounded text-light focus:outline-none focus:border-accent-primary", children: [_jsx("option", { value: "text", children: "Text Note" }), _jsx("option", { value: "youtube", children: "YouTube" }), _jsx("option", { value: "script", children: "Script" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-light mb-2", children: "Title" }), _jsx("input", { type: "text", value: formData.title, onChange: (e) => setFormData({ ...formData, title: e.target.value }), placeholder: "Card title...", className: "w-full px-3 py-2 bg-dark border border-border rounded text-light placeholder-border focus:outline-none focus:border-accent-primary" })] }), formData.type === 'youtube' && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-light mb-2", children: "YouTube URL" }), _jsx("input", { type: "url", value: formData.youtubeUrl || '', onChange: (e) => setFormData({
                                                        ...formData,
                                                        youtubeUrl: e.target.value,
                                                    }), placeholder: "https://youtube.com/watch?v=...", className: "w-full px-3 py-2 bg-dark border border-border rounded text-light placeholder-border focus:outline-none focus:border-accent-primary" })] })), (formData.type === 'text' || formData.type === 'script') && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-light mb-2", children: "Content" }), _jsx("textarea", { value: formData.content || '', onChange: (e) => setFormData({ ...formData, content: e.target.value }), placeholder: "Enter content...", className: "w-full px-3 py-2 bg-dark border border-border rounded text-light placeholder-border focus:outline-none focus:border-accent-primary h-24 resize-none" })] }))] }), _jsxs("div", { className: "mt-6 flex gap-2", children: [_jsx("button", { onClick: handleAddCard, disabled: loading, className: "flex-1 px-4 py-2 bg-accent-primary hover:bg-accent-hover text-dark rounded font-medium disabled:opacity-50 transition-colors", children: loading ? 'Adding...' : 'Add Card' }), _jsx("button", { onClick: () => setShowAddCard(false), className: "flex-1 px-4 py-2 bg-border hover:bg-border text-light rounded font-medium transition-colors", children: "Cancel" })] }), error && (_jsx("div", { className: "mt-3 p-2 bg-red-900 text-red-100 rounded text-sm", children: error }))] }) })), expandedCard && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-surface border border-border rounded-lg p-6 w-2xl max-w-2xl shadow-lg max-h-96 overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsx("h3", { className: "text-xl font-bold text-light", children: expandedCard.title }), _jsx("button", { onClick: () => setExpandedCard(null), className: "text-border hover:text-light text-2xl", children: "\u00D7" })] }), expandedCard.type === 'youtube' && (_jsxs(_Fragment, { children: [expandedCard.thumbnail_url && (_jsx("div", { className: "mb-4 w-full h-48 rounded overflow-hidden", children: _jsx("img", { src: expandedCard.thumbnail_url, alt: expandedCard.title, className: "w-full h-full object-cover" }) })), expandedCard.youtube_url && (_jsx("a", { href: expandedCard.youtube_url, target: "_blank", rel: "noopener noreferrer", className: "text-accent-primary hover:text-accent-hover block mb-3", children: "Watch on YouTube \u2192" }))] })), _jsx("div", { className: "text-light whitespace-pre-wrap", children: expandedCard.type === 'youtube'
                                        ? expandedCard.transcript
                                        : expandedCard.content }), _jsx("button", { onClick: () => setExpandedCard(null), className: "mt-4 w-full px-4 py-2 bg-border hover:bg-border text-light rounded font-medium transition-colors", children: "Close" })] }) })), cards.length === 0 ? (_jsx("div", { className: "text-center py-16", children: _jsx("p", { className: "text-border text-lg mb-4", children: "No cards yet. Add one to get started!" }) })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: cards.map((card) => (_jsx(Card, { card: card, onDelete: handleDeleteCard, onDuplicate: handleDuplicateCard, onRename: handleRenameCard, onExpand: setExpandedCard }, card.id))) }))] })] }));
};
