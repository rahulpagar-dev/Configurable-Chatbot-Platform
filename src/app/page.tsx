'use client'
import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow' // This will be updated
import Header from './components/Header'
import SignInPopup from './components/SignInPopup'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('User')
  const [showSignInPopup, setShowSignInPopup] = useState(false)

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setIsLoggedIn(true);
      setUserName(userEmail.split('@')[0]);
      setShowSignInPopup(false);
    } else {
      setShowSignInPopup(true); // Show popup if not logged in
    }
  }, []);

  const handleLoginSuccess = (email: string) => {
    localStorage.setItem('userEmail', email);
    setIsLoggedIn(true);
    setUserName(email.split('@')[0]);
    setShowSignInPopup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserName('User');
    window.location.href = '/signup';
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {showSignInPopup && (
        <SignInPopup onLoginSuccess={handleLoginSuccess} onClose={() => setShowSignInPopup(false)} />
      )}

      {/* Main App Layout */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 transform ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <Header
          userName={userName}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto relative">
          {/* Pass isLoggedIn to ChatWindow */}
          <ChatWindow isLoggedIn={isLoggedIn} />
        </main>
      </div>
    </div>
  )
}