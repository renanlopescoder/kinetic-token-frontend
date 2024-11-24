'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface User {
    token: string;
    email: string;
    id: string;
}

const setUser = (user: any | null) => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (user) localStorage.setItem('user', JSON.stringify(user));
  else localStorage.removeItem('user');
};

const getUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    initialData: getUser(),
    // Keep data in memory indefinitely
    staleTime: Infinity, 
  });

  const login = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      return await response.json();
    },
    onSuccess: (data) => {
      const user: User = data.user;
      setUser(user);
      queryClient.setQueryData(['user'], user);
    },
  });

  const logout = () => {
    setUser(null); 
    queryClient.setQueryData(['user'], null); // Clear React Query state
  };

  return { user, login, logout };
};
