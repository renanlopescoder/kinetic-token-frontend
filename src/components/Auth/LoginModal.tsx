import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void; // Function to switch to the Register modal
}

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
}: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError(''); 
    try {
      await login.mutateAsync({ email, password });
      setEmail('');
      setPassword('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed'); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <div className="flex justify-center mb-4">
          <img
            src="kinetic.jpg"
            alt="Kinetic Logo"
            className="h-12 w-auto"
          />
        </div>
        <h2 className="text-black text-xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4 text-black"
        />
        <button
          onClick={handleLogin}
          className={`w-full py-2 px-4 rounded bg-black hover:bg-gray-900 text-white`}
        >
          Login
        </button>
        <p className="text-center mt-4 text-sm text-black">
          Don{"'"}t have an account{' '}?{' '}
          <button
            className="text-blue-800 hover:underline"
            onClick={onSwitchToRegister}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
