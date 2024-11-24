'use client';

import { useState, useEffect } from 'react';
import LoginModal from './Auth/LoginModal';
import RegisterModal from './Auth/SignupModal';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';

export const Navbar = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const handleLogout = () => {
    logout(); 
  };

  if (!isClient) {
    return null;
  }

  return (
    <nav className="bg-black p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="kinetic.jpg" alt="Kinetic Logo" className="h-8 w-auto" />
          <div className="text-lg font-bold text-white">Kinetic</div>
        </div>
        <div className="flex space-x-4 text-center">
          <Link href="/tokens" className="hover:underline">Tokens</Link>
          <Link href="/watchlist" className="hover:underline">Watchlist</Link>
          {user ? (
            <>
              <span className="font-bold text-violet-500">{user?.email?.split('@')[0]}</span>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setLoginModalOpen(true)} className="hover:underline">Login</button>
              <button onClick={() => setRegisterModalOpen(true)} className="hover:underline">Register</button>
            </>
          )}
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setLoginModalOpen(false);
          setRegisterModalOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setRegisterModalOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </nav>
  );
};
