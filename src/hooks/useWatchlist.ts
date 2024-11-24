import { Token } from '@/types/tokenTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useWatchlist = (userId: string | null, token: string | null) => {
  const queryClient = useQueryClient();

  const watchlistQuery = useQuery({
    queryKey: ['watchlist', userId],
    queryFn: async () => {
      if (!userId || !token) return [];
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch watchlist');
      return response.json();
    },
    enabled: !!userId && !!token,
    staleTime: 1000 * 60 * 5, // Cache the result for 5 minutes
  });

  // Add token to watchlist
  const addToWatchlist = useMutation({
    mutationFn: async (tokenData: Token) => {
      if (!userId || !token) throw new Error('User not authenticated');
      
      console.log('Adding to watchlist:', tokenData);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tokenData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error adding to watchlist:', errorData);
        throw new Error(errorData.message || 'Failed to add to watchlist');
      }
  
      return response.json();
    },
    onSuccess: () => {
      // @ts-ignore-next-line
      queryClient.invalidateQueries(['watchlist', userId]); 
    },
    onError: (error) => {
      console.error('Add to watchlist error:', error); 
    },
  });
  

  // Remove token from watchlist
  const removeFromWatchlist = useMutation({
    mutationFn: async (tokenId: string) => {
      if (!userId || !token) throw new Error('User not authenticated');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${userId}/${tokenId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to remove from watchlist');
    },
    onSuccess: () => {
      // @ts-ignore-next-line
      queryClient.invalidateQueries(['watchlist', userId]); // Refresh the watchlist query
    },
  });

  return { watchlistQuery, addToWatchlist, removeFromWatchlist };
};
