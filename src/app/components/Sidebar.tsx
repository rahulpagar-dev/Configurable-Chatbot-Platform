import Link from 'next/link'

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <aside style={{  backgroundColor: "#eef8ff"}}
      className={`fixed top-0 left-0 h-full w-64 bg-gray-50 shadow-lg transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-extrabold text-gray-800">Wizly</h2>
        <span className="text-xl cursor-pointer">✕</span>
      </div>
      <nav className="flex flex-col gap-5 p-6 text-[16px] font-medium text-gray-700">
        <Link href="#" className="hover:text-blue-500">New Chat</Link>
        <Link href="#" className="hover:text-blue-500">Settings</Link>
        <Link href="#" className="hover:text-blue-500">Help</Link>
        <Link href="#" className="hover:text-blue-500">Feedback</Link>
        <Link href="/signin" className="hover:text-blue-500 mt-6">Sign Out</Link>
      </nav>
      <div className="absolute bottom-4 left-4 text-xs text-gray-400">rahulkpagar@gmail.com</div>
    </aside>
  )
}

export default Sidebar