'use client';

import { useState } from 'react';
import { LogIn } from 'lucide-react';

interface SignInPopupProps {
  onLoginSuccess: (email: string) => void;
  onClose: () => void;
}

export default function SignInPopup({ onLoginSuccess, onClose }: SignInPopupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onLoginSuccess(email.trim());
      onClose();
    } else {
      alert('Please enter your email address.');
    }
  };

  return (
    // This div is responsible for the full-screen overlay and the blur effect
    <div style={{opacity:'0.7'}} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center z-[100]">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In to Wizly</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Experience the full power of Wizly!
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="popup-email" className="sr-only">Email</label>
            <input
              type="email"
              id="popup-email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="popup-password" className="sr-only">Password</label>
            <input
              type="password"
              id="popup-password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <LogIn size={18} /> Login
          </button>
        </form>
      </div>
    </div>
  );
}