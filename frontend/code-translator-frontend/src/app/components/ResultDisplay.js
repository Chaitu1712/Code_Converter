import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { tomorrow, prism } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter").then(mod => mod.Prism), { ssr: false });

export default function ResultDisplay({ translatedCode, explanation, targetLang, isDarkMode }) {
  const [codeLanguage, setCodeLanguage] = useState(targetLang || "java");
  const [copied, setCopied] = useState(false);
  const displayLang = targetLang.charAt(0).toUpperCase() + targetLang.slice(1);

  useEffect(() => {
    setCodeLanguage(targetLang);
  }, [targetLang]);

  const handleCopy = () => {
    if (translatedCode) {
      navigator.clipboard.writeText(translatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="flex flex-col h-[450px] bg-editor border border-border-main rounded-lg overflow-hidden shadow-sm shadow-black/5 dark:shadow-black/20 transition-colors">
        <div className="flex justify-between items-center px-4 py-2 border-b border-border-header bg-header transition-colors">
          <span className="text-xs font-mono text-text-muted">Translated: {displayLang}</span>
          <button 
            onClick={handleCopy} 
            className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-main transition-colors"
          >
            {copied ? (
               <span className="text-border-focus font-semibold">Copied!</span>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
        
        <div className="flex-1 overflow-auto custom-scrollbar p-1">
          {translatedCode ? (
            <SyntaxHighlighter 
              language={codeLanguage} 
              style={isDarkMode ? tomorrow : prism}
              showLineNumbers={true}
              customStyle={{
                backgroundColor: 'transparent',
                margin: 0,
                padding: '1rem',
                fontSize: '14px',
                lineHeight: '1.6',
                fontFamily: 'var(--font-jetbrains-mono)'
              }}
              lineNumberStyle={{ minWidth: '3.5em', opacity: 0.4, paddingRight: '1em', textAlign: 'right' }}
            >
              {translatedCode}
            </SyntaxHighlighter>
          ) : (
            <div className="h-full flex items-center justify-center text-text-icon font-mono text-sm">
              // Awaiting translation...
            </div>
          )}
        </div>
      </div>

      <div className="bg-card border border-border-main rounded-lg p-5 mt-2 min-h-[140px] shadow-sm shadow-black/5 dark:shadow-black/20 transition-colors">
        <h3 className="text-xs font-semibold text-text-main flex items-center gap-2 mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--explanation-icon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="9" y1="18" x2="15" y2="18"></line>
            <line x1="10" y1="22" x2="14" y2="22"></line>
            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
          </svg>
          AI Explanation
        </h3>
        <p className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap font-sans">
          {explanation || "Translation logic and optimizations will be explained here."}
        </p>
      </div>
    </>
  );
}