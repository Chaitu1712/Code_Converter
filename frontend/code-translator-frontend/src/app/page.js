"use client";

import { useState } from "react";
import CodeInput from "./components/CodeInput";
import LanguageSelector from "./components/LanguageSelector";
import TranslateButton from "./components/TranslateButton";
import ResultDisplay from "./components/ResultDisplay";

export default function Home() {
  const [code, setCode] = useState("");
  const [sourceLang, setSourceLang] = useState("java");
  const [targetLang, setTargetLang] = useState("python");
  const [translatedCode, setTranslatedCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">AI Code Translator</h1>
      
      <LanguageSelector 
        sourceLang={sourceLang} 
        targetLang={targetLang} 
        setSourceLang={setSourceLang} 
        setTargetLang={setTargetLang} 
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <CodeInput code={code} setCode={setCode} />
      <TranslateButton 
        code={code} 
        sourceLang={sourceLang} 
        targetLang={targetLang} 
        setTranslatedCode={setTranslatedCode} 
        setExplanation={setExplanation}
        setError={setError} 
      />

      <ResultDisplay translatedCode={translatedCode} explanation={explanation} />
    </main>
  );
}
