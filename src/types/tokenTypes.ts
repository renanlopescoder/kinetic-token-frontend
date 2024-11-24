export interface Token {
  id: string; 
  name: string; 
  symbol: string; // Token symbol (e.g., BTC)
  current_price: number; // Current price in USD
  market_cap: number; 
  price_change_percentage_24h: number; // 24-hour price change percentage
  image: string; // URL
}

export interface WatchlistToken extends Token {
  tokenId: string; // Unique identifier for watchlist
}