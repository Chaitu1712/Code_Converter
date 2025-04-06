import { useState } from "react";
import axios from "axios";

export default function TranslateButton({ code, sourceLang, targetLang, setTranslatedCode, setExplanation, setError }) {
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!code.trim()) {
      setError("Please enter some code!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/translate", {
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        code: code,
      });
      let translatedCode=response.data.translatedCode;
      translatedCode = translatedCode.replaceAll("```","");
      translatedCode = translatedCode.split("\n");
      for(var i=2;i<translatedCode.length-1;i++){
        translatedCode[i-1] = translatedCode[i];
      }
      translatedCode.pop();
      translatedCode = translatedCode.join("\n");
      setTranslatedCode(translatedCode);
      setExplanation(response.data.explanation);
    } catch (error) {
      console.error("Translation error:", error);
      setError("Error translating code. Please try again.");
    }
    setLoading(false);
  };

  return (
    <button
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md flex items-center justify-center"
      onClick={handleTranslate}
      disabled={loading}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        "Convert Code"
      )}
    </button>
  );
}
