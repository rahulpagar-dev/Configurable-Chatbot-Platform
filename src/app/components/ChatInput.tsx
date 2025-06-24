import { Paperclip, ArrowUp } from 'lucide-react'

const ChatInput = () => (
  <div className="w-full max-w-2xl mt-auto flex items-center gap-2 p-4 ">
    <input
      type="text"
      placeholder="Send a message..."
      className="flex-1 p-3 border rounded-full text-sm"
    />
    <button className="text-gray-400 hover:text-black">
      <Paperclip size={18} />
    </button>
    <button className="bg-purple-100 p-2 rounded-full text-purple-700 hover:bg-purple-200">
      <ArrowUp size={18} />
    </button>
  </div>
)

export default ChatInput
