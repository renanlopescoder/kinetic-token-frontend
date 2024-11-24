import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useTokens } from '../../hooks/useTokens';
import { TokenCard } from './TokenCard';
import { WatchlistToken } from '@/types/tokenTypes';

export const TokenList = () => {
  const { user } = useAuth();
  const { watchlistQuery, addToWatchlist } = useWatchlist(user?.id, user?.token);
  const { data: tokens = [], isLoading: isTokensLoading, error: tokensError } = useTokens();
  const { data: watchlist = [], isLoading: isWatchlistLoading } = watchlistQuery;

  const [searchQuery, setSearchQuery] = useState('');

  if (isTokensLoading || isWatchlistLoading) return <div>Loading...</div>;
  if (tokensError instanceof Error) return <div>Error: {tokensError.message}</div>;

  const watchlistTokenIds = new Set(watchlist.map((item: WatchlistToken) => item.tokenId));

  const filteredTokens = tokens.filter((token) => {
    const query = searchQuery.toLowerCase();
    return (
      token.name.toLowerCase().includes(query) || 
      token.symbol.toLowerCase().includes(query) ||
      token.price_change_percentage_24h?.toString().includes(query) 
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Token List</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, symbol, or change..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTokens.map((token) => (
          <TokenCard
            key={token.id}
            token={token}
            isInWatchlist={watchlistTokenIds.has(token.id)}
            onAddToWatchlist={() =>
              addToWatchlist.mutate(token)
            }
          />
        ))}
      </div>

      {filteredTokens.length === 0 && <div>No tokens found matching your search.</div>}
    </div>
  );
};
