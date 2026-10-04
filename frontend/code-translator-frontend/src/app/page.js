"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import CodeInput from "./components/CodeInput";
import LanguageSelector from "./components/LanguageSelector";
import TranslateButton from "./components/TranslateButton";
import ResultDisplay from "./components/ResultDisplay";

const SAMPLES = {
  python: `def fibonacci(n):
    if n <= 0:
        return []
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]

print(fibonacci(7))`,
  java: `public class Solution {
    public static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
  javascript: `function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
  cpp: `#include <iostream>
#include <vector>

void printEvens(const std::vector<int>& nums) {
    for (int n : nums) {
        if (n % 2 == 0) {
            std::cout << n << " ";
        }
    }
    std::cout << std::endl;
}`
};

export default function Home() {
  const [code, setCode] = useState("");
  const [sourceLang, setSourceLang] = useState("python");
  const [targetLang, setTargetLang] = useState("java");
  const [translatedCode, setTranslatedCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);

    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Direct translation handler shared by button click and Ctrl+Enter
  const handleTranslate = async () => {
    if (loading) return;
    if (!code.trim()) {
      setError("Please enter some code to translate.");
      return;
    }

    setLoading(true);
    setError("");

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

    try {
      const response = await axios.post(`${baseUrl}/api/translate`, {
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        code: code,
      });

      let cleanCode = response.data.translatedCode || "";
      cleanCode = cleanCode
        .replace(/^```[\w-]*\r?\n?/i, "")
        .replace(/\r?\n?```$/i, "")
        .trim();

      setTranslatedCode(cleanCode);
      setExplanation(response.data.explanation || "No explanation provided.");
    } catch (err) {
      console.error("Translation error:", err);
      const serverMessage = err.response?.data?.message;
      setError(
        serverMessage ||
          "Error translating code. Please check your backend connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    if (translatedCode) {
      setCode(translatedCode);
      setTranslatedCode("");
      setExplanation("");
    }
  };

  const handleLoadSample = (lang) => {
    if (SAMPLES[lang]) {
      setCode(SAMPLES[lang]);
      setSourceLang(lang);
      if (targetLang === lang) {
        setTargetLang(lang === "python" ? "java" : "python");
      }
    }
  };

  return (
    <main className="max-w-[1240px] mx-auto p-4 md:p-8">
      {/* Theme Toggle & Sample Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-muted">Load sample:</span>
          {["python", "java", "javascript", "cpp"].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLoadSample(lang)}
              className="text-xs px-2.5 py-1 rounded bg-card border border-border-main text-text-muted hover:text-text-main hover:border-border-focus transition-all capitalize cursor-pointer"
            >
              {lang === "cpp" ? "C++" : lang}
            </button>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-card border border-border-main text-text-icon hover:text-text-main hover:bg-swap-hover transition-all cursor-pointer"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {mounted && isDarkMode ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-text-main transition-colors">
          AI Code Translator
        </h1>
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

      {error && (
        <p className="text-error-text text-center mb-4 text-sm bg-error-bg py-2.5 px-4 rounded-md max-w-2xl mx-auto">
          {error}
        </p>
      )}

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col gap-4">
          <CodeInput
            code={code}
            setCode={setCode}
            sourceLang={sourceLang}
            onTranslate={handleTranslate}
          />
          <TranslateButton
            loading={loading}
            onTranslate={handleTranslate}
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