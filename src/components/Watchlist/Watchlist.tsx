'use client';

import { useAuth } from '../../hooks/useAuth';
import { useWatchlist } from '../../hooks/useWatchlist';
import { WatchlistCard } from './WatchlistCard';
import { Token } from '@/types/tokenTypes';
import { useState, useEffect } from 'react';

export const Watchlist = () => {
  const { user } = useAuth();
  const { watchlistQuery, removeFromWatchlist } = useWatchlist(user?.id, user?.token);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; 

  // Watchlist state from React Query
  const { data: watchlist = [], isLoading: isWatchlistLoading, isError } = watchlistQuery;

  if (isWatchlistLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading watchlist.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Watchlist</h1>
      {watchlist?.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {watchlist?.map((token: Token) => (
            <WatchlistCard
              key={token.id}
              token={token}
              onRemove={() => removeFromWatchlist.mutate(token.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
