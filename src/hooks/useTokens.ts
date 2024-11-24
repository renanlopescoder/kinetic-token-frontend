import { useQuery } from '@tanstack/react-query';
import { Token } from '../types/tokenTypes';

const fetchTokens = async (): Promise<Token[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch token data');
  }
  return response.json();
};

export const useTokens = () => {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  });
};
