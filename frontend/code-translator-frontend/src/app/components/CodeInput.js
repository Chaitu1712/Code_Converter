export default function CodeInput({ code, setCode, sourceLang }) {
  const displayLang = sourceLang.charAt(0).toUpperCase() + sourceLang.slice(1);

  return (
    <div className="flex flex-col h-[450px] bg-editor border border-border-main rounded-lg overflow-hidden focus-within:border-border-focus transition-colors shadow-sm shadow-black/5 dark:shadow-black/20">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-header bg-header transition-colors">
        <span className="text-xs font-mono text-text-muted">Source: {displayLang}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-icon">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
      </div>
      
      <textarea
        className="flex-1 w-full p-4 bg-transparent text-text-main font-mono text-sm resize-none outline-none custom-scrollbar leading-relaxed"
        placeholder={`// Enter your ${displayLang} code here...`}
        value={code}
        spellCheck="false"
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  );
}