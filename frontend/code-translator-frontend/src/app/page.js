"use client";

import { useState, useEffect } from "react";
import CodeInput from "./components/CodeInput";
import LanguageSelector from "./components/LanguageSelector";
import TranslateButton from "./components/TranslateButton";
import ResultDisplay from "./components/ResultDisplay";

export default function Home() {
  const [code, setCode] = useState("");
  const [sourceLang, setSourceLang] = useState("python");
  const [targetLang, setTargetLang] = useState("java");
  const [translatedCode, setTranslatedCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <main className="max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Theme Toggle */}
      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 rounded-full bg-card border border-border-main text-text-icon hover:text-text-main hover:bg-swap-hover transition-all"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          )}
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-text-main transition-colors">AI Code Translator</h1>
        <p className="text-text-muted text-sm md:text-base max-w-xl mx-auto transition-colors">
          Seamlessly convert syntax between languages with deep learning precision.
        </p>
      </div>
      
      {/* Language Selection */}
      <LanguageSelector 
        sourceLang={sourceLang} 
        targetLang={targetLang} 
        setSourceLang={setSourceLang} 
        setTargetLang={setTargetLang}
        handleSwap={handleSwap} 
      />
      
      {error && <p className="text-error-text text-center mb-4 text-sm bg-error-bg py-2 rounded-md">{error}</p>}

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col gap-4">
          <CodeInput code={code} setCode={setCode} sourceLang={sourceLang} />
          <TranslateButton 
            code={code} 
            sourceLang={sourceLang} 
            targetLang={targetLang} 
            setTranslatedCode={setTranslatedCode} 
            setExplanation={setExplanation}
            setError={setError} 
          />
        </div>

        <div className="flex flex-col gap-4">
          <ResultDisplay 
            translatedCode={translatedCode} 
            explanation={explanation} 
            targetLang={targetLang} 
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </main>
  );
}