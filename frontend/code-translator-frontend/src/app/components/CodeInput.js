"use client";

export default function CodeInput({ code, setCode, sourceLang, onTranslate }) {
  const displayLang = sourceLang.charAt(0).toUpperCase() + sourceLang.slice(1);

  // Tab key handling for code indentation
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      onTranslate();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = e.target;
      const tabSpace = "  "; // 2 spaces
      const updatedCode =
        value.substring(0, selectionStart) +
        tabSpace +
        value.substring(selectionEnd);

      setCode(updatedCode);

      // Restore caret position right after inserted tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + tabSpace.length;
      }, 0);
    }
  };

  const lineCount = code ? code.split("\n").length : 0;
  const charCount = code.length;

  return (
    <div className="flex flex-col h-[480px] bg-editor border border-border-main rounded-lg overflow-hidden focus-within:border-border-focus transition-colors shadow-sm shadow-black/5 dark:shadow-black/20">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-header bg-header transition-colors">
        <span className="text-xs font-mono text-text-muted">Source: {displayLang}</span>
        
        <div className="flex items-center gap-3">
          {code && (
            <button
              onClick={() => setCode("")}
              className="text-xs text-text-muted hover:text-error-text transition-colors cursor-pointer"
              title="Clear input"
            >
              Clear
            </button>
          )}
          <span className="text-[11px] font-mono text-text-muted opacity-75">
            Ctrl+Enter to Run
          </span>
        </div>
      </div>

      {/* Code Textarea */}
      <textarea
        className="flex-1 w-full p-4 bg-transparent text-text-main font-mono text-sm resize-none outline-none custom-scrollbar leading-relaxed"
        placeholder={`// Enter or paste your ${displayLang} code here...\n// Press Tab to indent, Ctrl+Enter to translate.`}
        value={code}
        spellCheck="false"
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Editor Footer / Counter */}
      <div className="flex justify-end items-center px-4 py-1.5 border-t border-border-header bg-header text-[11px] font-mono text-text-muted transition-colors">
        <span>{lineCount} lines &bull; {charCount} chars</span>
      </div>
    </div>
  );
}