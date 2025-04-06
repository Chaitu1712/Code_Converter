import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "prismjs/themes/prism-tomorrow.css";

const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter").then(mod => mod.Prism), { ssr: false });

export default function ResultDisplay({ translatedCode, explanation }) {
  const [codeLanguage, setCodeLanguage] = useState("python");

  useEffect(() => {
    if (translatedCode.startsWith("import") || translatedCode.includes("def ")) {
      setCodeLanguage("python");
    } else {
      setCodeLanguage("java");
    }
  }, [translatedCode]);

  return (
    <div className="mt-4 p-3 border rounded-md bg-gray-900 text-white">
      {/* Translated Code Section */}
      <h2 className="font-bold mb-2">Translated Code:</h2>
      <div className="max-h-60 overflow-y-auto border border-gray-700 p-2 rounded-md custom-scrollbar scroll-smooth">
        <SyntaxHighlighter language={codeLanguage} className="p-2">
          {translatedCode || "No translation yet."}
        </SyntaxHighlighter>
      </div>

      {/* Explanation Section */}
      <h2 className="font-bold mt-4 mb-2">Explanation:</h2>
      <div className="max-h-40 overflow-y-auto border border-gray-700 p-2 rounded-md text-sm text-gray-300 custom-scrollbar scroll-smooth">
        {explanation || "No explanation available."}
      </div>
    </div>
  );
}
