const PromptSuggestions = () => (
  <div className="mt-6 flex gap-4">
    <button className="bg-white border px-4 py-2 rounded-xl text-left shadow text-sm">
      <div className="font-medium">Help me book a flight</div>
      <div className="text-gray-500 text-xs">from San Francisco to London</div>
    </button>
    <button className="bg-white border px-4 py-2 rounded-xl text-left shadow text-sm">
      <div className="font-medium">What is the status</div>
      <div className="text-gray-500 text-xs">of flight BA142 flying tmrw?</div>
    </button>
  </div>
)

export default PromptSuggestions
