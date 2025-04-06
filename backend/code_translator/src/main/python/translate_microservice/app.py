from flask import Flask, request, jsonify
from translator import translate_code
import logging
app = Flask(__name__)
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

@app.route("/translate", methods=["POST"])
def translate():
    data = request.json
    source_lang = data.get("sourceLanguage")
    target_lang = data.get("targetLanguage")
    code = data.get("code")

    if not source_lang or not target_lang or not code:
        return jsonify({"error": "Missing required fields"}), 400

    translated_code, explanation = translate_code(source_lang, target_lang, code)

    return jsonify({
        "translatedCode": translated_code,
        "explanation": explanation
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
