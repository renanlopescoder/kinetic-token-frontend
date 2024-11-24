interface TokenCardProps {
  token: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
  };
  isInWatchlist: boolean; 
  onAddToWatchlist: () => void;
}

export const TokenCard = ({ token, isInWatchlist, onAddToWatchlist }: TokenCardProps) => {
  return (
    <div className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 relative">

      {isInWatchlist && (
        <div className="absolute top-2 right-2">
          <span className="text-violet-500 text-xl">⭐</span> 
        </div>
      )}
      <div className="flex items-center mb-4">
        <img
          src={token.image}
          alt={token.name}
          className="h-16 w-16 object-contain mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{token.name}</h2>
          <p className="text-sm text-gray-500">Symbol: {token.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">
          <strong>Price:</strong> ${token.current_price.toFixed(2)}
        </p>
        <p className="text-gray-600">
          <strong>Market Cap:</strong> ${token.market_cap.toLocaleString()}
        </p>
        <p
          className={`text-gray-600 ${
            token.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          <strong>24h Change:</strong> {token.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
      <button
        className="w-full bg-violet-600 hover:bg-violet-800 text-white py-2 px-4 rounded transition-colors duration-300 disabled:bg-gray-300"
        onClick={onAddToWatchlist}
        disabled={isInWatchlist} // Disable button if already in watchlist
      >
        {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
      </button>
      <a
        href={`https://www.coingecko.com/en/coins/${token.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center bg-indigo-600 hover:bg-indigo-800 text-white py-2 px-4 rounded transition-colors duration-300"
      >
        View on CoinGecko
      </a>
    </div>
  );
};
