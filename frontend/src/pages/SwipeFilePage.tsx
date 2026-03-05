import { useEffect, useState } from 'react';
import { Card as CardType } from '../types';
import { SwipeFileList } from '../components/SwipeFileList';
import { TopBar } from '../components/TopBar';
import { useApi } from '../hooks/useApi';

export const SwipeFilePage = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const {
    getCards,
    deleteCard,
    duplicateCard,
    loading,
    error,
  } = useApi();

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const data = await getCards();
      setCards(data);
    } catch (err) {
      console.error('Failed to load cards:', err);
    }
  };

  const handleDeleteCard = async (id: number) => {
    if (!window.confirm('Delete this card?')) return;

    try {
      await deleteCard(id);
      setCards(cards.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Failed to delete card:', err);
    }
  };

  const handleDuplicateCard = async (id: number) => {
    try {
      const newCard = await duplicateCard(id);
      setCards([...cards, newCard]);
    } catch (err) {
      console.error('Failed to duplicate card:', err);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar boardName="Swipe File" />

      <div className="flex-1 overflow-auto p-8">
        {error && (
          <div className="mb-4 p-3 bg-red-900 text-red-100 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-border">
            <p>Loading cards...</p>
          </div>
        ) : (
          <SwipeFileList
            cards={cards}
            onDelete={handleDeleteCard}
            onDuplicate={handleDuplicateCard}
          />
        )}
      </div>
    </div>
  );
};
