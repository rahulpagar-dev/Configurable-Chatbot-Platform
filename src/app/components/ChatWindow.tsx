import { Mic, PlusCircle, Search, FilePlus } from 'lucide-react'

const ChatWindow = () => (
  <div className="flex flex-col justify-between h-full">
    <div className="flex-grow flex flex-col items-center justify-center px-8">
      <div className="bg-blue-50 rounded-xl px-6 py-4 max-w-3xl">
        <p className="text-sm text-center">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 font-medium">Wizly</span>, your personal AI assistant
        </p>
      </div>
    </div>
    <div className="p-6 bg-white">
      <div style={{height:"6rem"}} className="w-full max-w-4xl mx-auto bg-white border border-gray-300 rounded-3xl shadow-sm px-6 py-4 flex items-center gap-4">
        <span className="text-gray-500"><PlusCircle size={20} /></span>
        <input
          type="text"
          placeholder="Ask Wizly"
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 text-gray-500 text-sm"><Search size={16} /> Deep Research</span>
          <span className="flex items-center gap-1 text-gray-500 text-sm"><FilePlus size={16} /> Canvas</span>
        </div>
        <span className="text-gray-500"><Mic size={20} /></span>
      </div>
    </div>
  </div>
)

export default ChatWindow