import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Board, Card as CardType } from '../types';
import { Card } from '../components/Card';
import { TopBar } from '../components/TopBar';
import { useApi } from '../hooks/useApi';

interface AddCardFormData {
  type: 'youtube' | 'text' | 'script';
  title: string;
  youtubeUrl?: string;
  content?: string;
}

export const BoardDetailPage = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<Board | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [expandedCard, setExpandedCard] = useState<CardType | null>(null);
  const [formData, setFormData] = useState<AddCardFormData>({
    type: 'text',
    title: '',
  });

  const {
    getCards,
    createCard,
    deleteCard,
    updateCard,
    duplicateCard,
    getYoutubeTranscript,
    loading,
    error,
  } = useApi();

  useEffect(() => {
    if (boardId) {
      loadBoardAndCards(parseInt(boardId));
    }
  }, [boardId]);

  const loadBoardAndCards = async (id: number) => {
    try {
      const data = await getCards(id);
      setCards(data);
      // Mock board loading - in real app, would fetch from API
      setBoard({
        id,
        name: `Board ${id}`,
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to load cards:', err);
    }
  };

  const handleAddCard = async () => {
    if (!formData.title.trim()) return;

    try {
      let cardData: any = {
        board_id: parseInt(boardId!),
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
        } catch (err) {
          console.error('Failed to fetch YouTube transcript:', err);
          alert('Failed to fetch YouTube transcript. Please check the URL.');
          return;
        }
      } else if (formData.type !== 'youtube') {
        cardData.content = formData.content || '';
      }

      const newCard = await createCard(cardData);
      setCards([...cards, newCard]);
      setFormData({ type: 'text', title: '' });
      setShowAddCard(false);
    } catch (err) {
      console.error('Failed to create card:', err);
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

  const handleRenameCard = async (id: number, newTitle: string) => {
    try {
      await updateCard(id, { title: newTitle });
      setCards(
        cards.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
      );
    } catch (err) {
      console.error('Failed to rename card:', err);
    }
  };

  if (!board) {
    return <div className="text-light">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <TopBar boardName={board.name} onAddCard={() => setShowAddCard(true)} />

      <div className="flex-1 overflow-auto p-8">
        {/* Add Card Modal */}
        {showAddCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-surface border border-border rounded-lg p-6 w-96 shadow-lg">
              <h3 className="text-xl font-bold text-light mb-4">Add Card</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-light mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as AddCardFormData['type'],
                      })
                    }
                    className="w-full px-3 py-2 bg-dark border border-border rounded text-light focus:outline-none focus:border-accent-primary"
                  >
                    <option value="text">Text Note</option>
                    <option value="youtube">YouTube</option>
                    <option value="script">Script</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-light mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Card title..."
                    className="w-full px-3 py-2 bg-dark border border-border rounded text-light placeholder-border focus:outline-none focus:border-accent-primary"
                  />
                </div>

                {formData.type === 'youtube' && (
                  <div>
                    <label className="block text-sm text-light mb-2">
                      YouTube URL
                    </label>
                    <input
                      type="url"
                      value={formData.youtubeUrl || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          youtubeUrl: e.target.value,
                        })
                      }
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-3 py-2 bg-dark border border-border rounded text-light placeholder-border focus:outline-none focus:border-accent-primary"
                    />
                  </div>
                )}

                {(formData.type === 'text' || formData.type === 'script') && (
                  <div>
                    <label className="block text-sm text-light mb-2">
                      Content
                    </label>
                    <textarea
                      value={formData.content || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="Enter content..."
                      className="w-full px-3 py-2 bg-dark border border-border rounded text-light placeholder-border focus:outline-none focus:border-accent-primary h-24 resize-none"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={handleAddCard}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-accent-primary hover:bg-accent-hover text-dark rounded font-medium disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Adding...' : 'Add Card'}
                </button>
                <button
                  onClick={() => setShowAddCard(false)}
                  className="flex-1 px-4 py-2 bg-border hover:bg-border text-light rounded font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>

              {error && (
                <div className="mt-3 p-2 bg-red-900 text-red-100 rounded text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Expanded Card Modal */}
        {expandedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-surface border border-border rounded-lg p-6 w-2xl max-w-2xl shadow-lg max-h-96 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-light">
                  {expandedCard.title}
                </h3>
                <button
                  onClick={() => setExpandedCard(null)}
                  className="text-border hover:text-light text-2xl"
                >
                  ×
                </button>
              </div>

              {expandedCard.type === 'youtube' && (
                <>
                  {expandedCard.thumbnail_url && (
                    <div className="mb-4 w-full h-48 rounded overflow-hidden">
                      <img
                        src={expandedCard.thumbnail_url}
                        alt={expandedCard.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {expandedCard.youtube_url && (
                    <a
                      href={expandedCard.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-primary hover:text-accent-hover block mb-3"
                    >
                      Watch on YouTube →
                    </a>
                  )}
                </>
              )}

              <div className="text-light whitespace-pre-wrap">
                {expandedCard.type === 'youtube'
                  ? expandedCard.transcript
                  : expandedCard.content}
              </div>

              <button
                onClick={() => setExpandedCard(null)}
                className="mt-4 w-full px-4 py-2 bg-border hover:bg-border text-light rounded font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        {cards.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-border text-lg mb-4">
              No cards yet. Add one to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                onDelete={handleDeleteCard}
                onDuplicate={handleDuplicateCard}
                onRename={handleRenameCard}
                onExpand={setExpandedCard}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
