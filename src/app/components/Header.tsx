'use client'

import Image from 'next/image'
import { Search, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  userName: string;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, isLoggedIn, onLogout }) => {
  const router = useRouter()

  const handleAvatarClick = () => {
    if (isLoggedIn) {
      onLogout();
    } else {
      router.push('/signup');
    }
  }

  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white min-h-[64px]">
      {isLoggedIn ? (
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
          Hello, {userName}
        </h1>
      ) : (
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
          Wizly AI
        </h1>
      )}

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          // Show Logout button with text if logged in
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            aria-label="Logout"
          >
            <LogOut size={20} /> Logout
          </button>
        ) : (
          // Show Search icon if not logged in
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <Search size={24} className="text-gray-600" />
          </button>
        )}

        <button
          onClick={handleAvatarClick}
          className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="User profile and sign-in options"
        >
          {isLoggedIn ? (
          <Image src="/images/avatar.svg" alt="User" width={32} height={32} className="object-cover w-full h-full" />
          ) : (
            <span className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-semibold">
              <Image
              src="/images/fingerprint.png" // Path to your PNG
              alt="User placeholder"
              width={32} // Set desired width
              height={32} // Set desired height
              className="w-full h-full object-cover" // Tailwind classes for sizing within the container
            />
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header