interface WatchlistCardProps {
    token: {
      id: string;
      name: string;
      symbol: string;
      image: string;
      current_price: number;
      price_change_percentage_24h: number;
      market_cap: number;
    };
    onRemove: () => void; // Callback to remove the token
  }
  
  export const WatchlistCard = ({ token, onRemove }: WatchlistCardProps) => {
    return (
      <div className="p-4 border rounded shadow">
        
        <img src={token.image} alt={token.name} className="h-12 w-12 mb-2" />
        <h2 className="text-xl font-bold">{token.name}</h2>
        <p>Symbol: {token.symbol.toUpperCase()}</p>
        <p>Price: ${token.current_price.toFixed(2)}</p>
        <p>24h Change: {token.price_change_percentage_24h.toFixed(2)}%</p>
        <p>Market Cap: ${token.market_cap.toLocaleString()}</p>
        <button
          onClick={onRemove}
          className="w-full mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    );
  };
  