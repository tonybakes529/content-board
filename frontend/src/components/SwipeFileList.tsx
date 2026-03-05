import { useState, useMemo } from 'react';
import { Card as CardType, CardType as CardTypeEnum } from '../types';

interface SwipeFileListProps {
  cards: CardType[];
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
}

export const SwipeFileList = ({
  cards,
  onDelete,
  onDuplicate,
}: SwipeFileListProps) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<CardTypeEnum | 'all'>('all');
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        card.title.toLowerCase().includes(search.toLowerCase()) ||
        (card.content && card.content.toLowerCase().includes(search.toLowerCase())) ||
        (card.transcript && card.transcript.toLowerCase().includes(search.toLowerCase()));

      const matchesType = typeFilter === 'all' || card.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [cards, search, typeFilter]);

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-surface border border-border rounded text-light placeholder-border focus:outline-none focus:border-accent-primary"
        />

        <div className="flex gap-2 flex-wrap">
          {(['all', 'youtube', 'text', 'script'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                typeFilter === type
                  ? 'bg-accent-primary text-dark'
                  : 'bg-surface border border-border text-light hover:border-accent-primary'
              }`}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-2">
        {filteredCards.length === 0 ? (
          <div className="text-center py-8 text-border">
            <p>No cards found</p>
          </div>
        ) : (
          filteredCards.map((card) => (
            <div key={card.id} className="bg-surface border border-border rounded overflow-hidden">
              {/* Card Header */}
              <div
                onClick={() =>
                  setExpandedCardId(
                    expandedCardId === card.id ? null : card.id
                  )
                }
                className="p-4 cursor-pointer hover:bg-border transition-colors flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-border rounded text-xs text-light capitalize">
                      {card.type}
                    </span>
                    <h4 className="text-light font-semibold flex-1">
                      {card.title}
                    </h4>
                  </div>
                  <p className="text-xs text-border line-clamp-1">
                    {card.type === 'youtube' && card.transcript
                      ? card.transcript.substring(0, 100)
                      : card.content?.substring(0, 100)}
                  </p>
                </div>
                <span className="text-border">
                  {expandedCardId === card.id ? '▼' : '▶'}
                </span>
              </div>

              {/* Expanded Content */}
              {expandedCardId === card.id && (
                <div className="border-t border-border px-4 py-4 bg-dark">
                  {card.type === 'youtube' && (
                    <>
                      {card.thumbnail_url && (
                        <div className="mb-4 w-full h-32 rounded overflow-hidden">
                          <img
                            src={card.thumbnail_url}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {card.youtube_url && (
                        <a
                          href={card.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-primary hover:text-accent-hover text-sm block mb-3"
                        >
                          Watch on YouTube →
                        </a>
                      )}
                    </>
                  )}

                  <div className="text-light text-sm max-h-48 overflow-y-auto whitespace-pre-wrap mb-4">
                    {card.type === 'youtube' ? card.transcript : card.content}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onDuplicate(card.id)}
                      className="px-3 py-1 bg-accent-primary hover:bg-accent-hover text-dark rounded text-sm font-medium transition-colors"
                    >
                      Duplicate
                    </button>
                    <button
                      onClick={() => onDelete(card.id)}
                      className="px-3 py-1 bg-red-900 hover:bg-red-800 text-light rounded text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
