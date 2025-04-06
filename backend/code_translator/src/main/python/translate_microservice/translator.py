from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
key=os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=key)
def translate_code(source_lang, target_lang, code):
    """
    Uses Gemini API for Java ↔ Python translation
    """
    prompt = f"Convert the following {source_lang} code into {target_lang}:\n\n{code}\n\nProvide in given format \nCode: \n(translated_code)\n Explanation: \n(explanation). For conversion Java codes if no class is provided then generate a suitable and short class name and main method."
    response = client.models.generate_content(model="gemini-2.0-flash", contents=prompt)
    response=response.text
    translated_code=response.split("Code:")[1].split("Explanation:")[0]
    explanation=response.split("Explanation:")[1]
    return translated_code, explanation