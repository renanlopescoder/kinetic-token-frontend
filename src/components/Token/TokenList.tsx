import { useAuth } from '../../hooks/useAuth';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useTokens } from '../../hooks/useTokens';
import { TokenCard } from './TokenCard';
import { WatchlistToken } from '@/types/tokenTypes';

export const TokenList = () => {
  const { user } = useAuth();
  const { watchlistQuery, addToWatchlist } = useWatchlist(user?.id, user?.token);
  const { data: tokens = [], isLoading: isTokensLoading, error: tokensError } = useTokens();

  // Watchlist state from React Query
  const { data: watchlist = [], isLoading: isWatchlistLoading } = watchlistQuery;

  if (isTokensLoading || isWatchlistLoading) return <div>Loading...</div>;
  if (tokensError instanceof Error) return <div>Error: {tokensError.message}</div>;

  const watchlistTokenIds = new Set(watchlist.map((item: WatchlistToken) => item.tokenId));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Token List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tokens.map((token) => (
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
    </div>
  );
};
