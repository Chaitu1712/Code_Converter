export default function LanguageSelector({ sourceLang, targetLang, setSourceLang, setTargetLang, handleSwap }) {
  const selectClasses = "w-40 appearance-none bg-input border border-border-main text-text-main rounded-md px-4 py-2.5 text-sm outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus transition-all cursor-pointer shadow-sm";

  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      <div className="flex flex-col items-center">
        <label className="text-[10px] uppercase tracking-widest text-text-muted mb-2 font-semibold">From</label>
        <div className="relative">
          <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className={selectClasses}>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </span>
        </div>
      </div>

      <button 
        onClick={handleSwap}
        className="mt-6 p-2.5 rounded-md border border-border-main bg-swap-btn hover:bg-swap-hover text-text-main transition-colors shadow-sm"
        title="Swap languages"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 21H3v-5M3 21l7-7M3 3l7 7" opacity="0" />
          <path d="M7 10L3 6l4-4" />
          <path d="M21 6H3" />
          <path d="M17 14l4 4-4 4" />
          <path d="M3 18h18" />
        </svg>
      </button>

      <div className="flex flex-col items-center">
        <label className="text-[10px] uppercase tracking-widest text-text-muted mb-2 font-semibold">To</label>
        <div className="relative">
          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className={selectClasses}>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </span>
        </div>
      </div>
    </div>
  );
}