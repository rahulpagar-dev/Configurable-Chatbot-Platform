export default function SignIn() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 bg-white shadow rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Sign In to Wizly</h2>
        <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Sign In</button>
      </div>
    </div>
  )
}