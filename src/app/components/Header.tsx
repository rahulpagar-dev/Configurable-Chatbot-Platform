import { Menu } from 'lucide-react'

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="flex justify-between items-center p-4 bg-white">
    <button onClick={onMenuClick}><Menu /></button>
    <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">Hello, Rahul</h1>
    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
      <img src="/avatar.png" alt="User" className="object-cover w-full h-full" />
    </div>
  </header>
)

export default Header