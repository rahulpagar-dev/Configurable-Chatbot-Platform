import Link from 'next/link'
import { Menu, Edit2, Gem, Settings } from 'lucide-react' // Import necessary Lucide icons

// Define a type for the component props for better type safety
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full ${
        isOpen ? 'w-64' : 'w-20' // Full width if open, compact width if closed
      } bg-white shadow-lg border-r border-gray-200 transition-all duration-300 z-50 flex flex-col`}
      // The background color from your images looks slightly off-white/light gray, adjusting `bg-white` to `bg-gray-50` or `bg-blue-50` might be closer.
      // Keeping bg-white for now as per previous, but consider adjusting if needed.
    >
      <div className="flex items-center p-4 min-h-[64px]"> {/* Fixed height for consistency */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Menu size={24} className="text-gray-600" /> {/* Hamburger icon always present */}
        </button>
        {isOpen && (
          <span className="ml-4 text-xl font-medium text-gray-800">
            Wizly
          </span>
        )}
      </div>

      {/* Main Navigation (Scrollable) */}
      <nav className="flex flex-col flex-grow overflow-y-auto custom-scrollbar"> {/* Added custom-scrollbar */}
        <div className="flex flex-col gap-1 p-2 text-sm font-medium text-gray-700"> {/* Adjusted padding and font size */}
          {/* New Chat */}
          <Link href="#" className="flex items-center gap-4 hover:bg-gray-100 p-3 rounded-full transition-colors duration-200">
            <Edit2 size={20} className="text-gray-600" /> {/* Smaller icon for menu items */}
            {isOpen && <span className="whitespace-nowrap">New chat</span>}
          </Link>
          {/* Explore Gems */}
          <Link href="#" className="flex items-center gap-4 hover:bg-gray-100 p-3 rounded-full transition-colors duration-200">
            <Gem size={20} className="text-gray-600" />
            {isOpen && <span className="whitespace-nowrap">Explore Gems</span>}
          </Link>
        </div>

        {/* Recent Chats Section */}
        {isOpen && (
          <div className="mt-6 px-4 pb-2 text-xs font-semibold text-gray-500 uppercase">
            Recent
          </div>
        )}
        {isOpen && (
          <div className="flex flex-col gap-1 p-2 text-sm text-gray-700">
            {/* Example Recent Chat Link */}
            <Link href="#" className="hover:bg-gray-100 p-3 rounded-full transition-colors duration-200 truncate">
              Next.js Chatbot Sidebar Re...
            </Link>
            {/* Add more recent chats as needed */}
          </div>
        )}
      </nav>

      {/* Bottom Fixed Section: Settings and Help, User Email/Icon */}
      <div className="flex flex-col p-4 border-t border-gray-200">
        <Link href="#" className="flex items-center gap-4 hover:bg-gray-100 p-3 rounded-full transition-colors duration-200 mb-2">
          <Settings size={20} className="text-gray-600" />
          {isOpen && <span className="whitespace-nowrap">Settings and help</span>}
        </Link>
        {isOpen && (
          <div className="text-xs text-gray-400 mt-2 px-3 truncate">rahulkpagar@gmail.com</div>
        )}
        {!isOpen && ( // User Avatar/Icon in compact mode
             <div className="flex items-center justify-center p-3 rounded-full text-gray-600">
                {/* You can replace this with an actual user avatar if you have one */}
                <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-semibold">R</span>
             </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar