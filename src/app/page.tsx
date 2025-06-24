'use client'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import Header from './components/Header'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 transform ${
          sidebarOpen ? 'translate-x-64' : 'translate-x-0'
        }`}
      >
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto relative">
          <ChatWindow />
        </main>
      </div>
    </div>
  )
}