export default function LanguageSelector({ sourceLang, targetLang, setSourceLang, setTargetLang }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
      {/* Source Language Dropdown */}
      <div className="relative">
        <label className="block text-gray-600 text-sm font-semibold mb-1 text-center">From</label>
        <select
          className="px-4 py-2 border rounded-md bg-white text-gray-700 shadow-md focus:ring-2 focus:ring-blue-400 transition-all"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
        >
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>

      <span className="text-xl" style={{position:"relative", top:"11px"}}>➡️</span>

      {/* Target Language Dropdown */}
      <div className="relative">
        <label className="block text-gray-600 text-sm font-semibold mb-1 text-center">To</label>
        <select
          className="px-4 py-2 border rounded-md bg-white text-gray-700 shadow-md focus:ring-2 focus:ring-blue-400 transition-all"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>
    </div>
  );
}
