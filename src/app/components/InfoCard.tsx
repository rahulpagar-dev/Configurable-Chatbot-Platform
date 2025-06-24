const InfoCard = () => (
  <div className="bg-gray-100 p-6 rounded-xl text-center max-w-xl">
    <div className="text-xl mb-2">▲ + 💬</div>
    <p className="text-gray-700 text-sm">
      This is an open source Chatbot template powered by the Google Gemini model built with Next.js and the AI SDK by Vercel.
      It uses the <code className="bg-gray-200 px-1 rounded">streamText</code> function on the server and the <code className="bg-gray-200 px-1 rounded">useChat</code> hook on the client to create a seamless chat experience.
    </p>
    <p className="text-sm mt-2">
      You can learn more about the AI SDK by visiting the <a href="#" className="text-blue-600 underline">Docs</a>.
    </p>
  </div>
)

export default InfoCard
