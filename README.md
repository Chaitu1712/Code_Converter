# AI Code Translator 🚀

An intelligent, multi-language code translation tool that converts source code between **Python**, **Java**, **JavaScript**, and **C++** with high precision using Google's native Gemini API.

Built with a modern full-stack architecture featuring a **Spring Boot** backend orchestrating calls via native HTTP client, and a **Next.js** frontend with custom syntax highlighting, bidirectional smart-swap, and code download capabilities.

---

## Features

- 🔄 **Multi-Language Translation:** Convert between Python, Java, JavaScript, and C++ with accurate idiomatic syntax.
- 💡 **AI Explanations:** Get clear explanations of algorithmic complexity, data structures, and language-specific changes.
- ⚡ **Interactive Code Editor:**
  - `Tab` key indentation support (inserts 2 spaces without losing focus).
  - Keyboard shortcut: Run translations instantly with `Ctrl + Enter` (or `Cmd + Enter`).
  - Live line and character counter.
- 🔁 **Smart Bidirectional Swap:** Swapping languages automatically transfers the generated code back into the input editor for instant round-trip testing.
- 📂 **Quick-Load Code Samples:** Test functions (Fibonacci, Binary Search, Debounce) with a single click.
- 💾 **Export & Download:** Save translated code directly with proper file extensions (`.py`, `.java`, `.js`, `.cpp`).
- 🌓 **Theme Persistence:** Seamless dark/light mode toggle with zero hydration flash (FOUC).

---

## Tech Stack

- **Backend:**  
  - Java 21, Spring Boot
  - Spring `RestClient` (native HTTP client)
  - Google Gemini API (`generateContent` with JSON schema enforcement)
  - Maven, Docker (multi-stage build)

- **Frontend:**  
  - Next.js (App Router, Turbopack)
  - React 19, Tailwind CSS
  - Prism.js / `react-syntax-highlighter`
  - Axios

---

## Project Structure

```text
.
├── backend
│   └── code_translator
│       ├── Dockerfile              # Multi-stage production container build
│       ├── pom.xml                 # Maven project configuration
│       └── src
│           └── main
│               ├── java/com/chaitu/code_translator
│               │   ├── CodeTranslatorApplication.java
│               │   ├── config/CorsConfig.java
│               │   ├── controllers/TranslationController.java
│               │   ├── model/
│               │   │   ├── TranslationRequest.java
│               │   │   └── TranslationResponse.java
│               │   └── services/TranslationService.java
│               └── resources
│                   └── application.properties
│
└── frontend
    └── code-translator-frontend
        ├── src
        │   └── app
        │       ├── components/
        │       │   ├── CodeInput.js
        │       │   ├── LanguageSelector.js
        │       │   ├── ResultDisplay.js
        │       │   └── TranslateButton.js
        │       ├── globals.css
        │       ├── layout.js
        │       └── page.js
        └── package.json
```

---

## Local Development & Setup

### 1. Prerequisites

- **JDK 21** installed
- **Node.js 18+** & `npm`
- A **Google Gemini API Key** (from [Google AI Studio](https://aistudio.google.com/))

### 2. Backend Setup (Spring Boot)

1. Navigate to the backend directory:

   ```bash
   cd backend/code_translator
   ```

2. Open `src/main/resources/application.properties` and add your API Key:

   ```properties
   gemini.api.key=YOUR_ACTUAL_GEMINI_API_KEY
   gemini.api.model=gemini-1.5-flash
   ```

3. Run the backend service:

   ```bash
   ./mvnw clean spring-boot:run
   ```

   *The backend will boot up at `http://localhost:8080`.*

### 3. Frontend Setup (Next.js)

1. Open a new terminal tab and navigate to the frontend directory:

   ```bash
   cd frontend/code-translator-frontend
   ```

2. Create a `.env.local` file pointing to the local backend:

   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local
   ```

3. Install dependencies and start the development server:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Deployment

### Backend to Render (Docker)

1. Create a new **Web Service** on [Render](https://render.com/).
2. Connect your GitHub repository.
3. Set the following fields:
   - **Root Directory:** `backend/code_translator`
   - **Environment:** `Docker`
   - **Plan:** `Free`
4. Add the required Environment Variable:
   - `GEMINI_API_KEY` = `<your-gemini-api-key>`
   - `GEMINI_MODEL` = `gemini-1.5-flash`
5. Click **Deploy Web Service**.

### Frontend to Vercel

1. Import `frontend/code-translator-frontend` into [Vercel](https://vercel.com/).
2. Set Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `<your-render-backend-url>` (e.g., `https://code-translator-backend.onrender.com`)
3. Deploy!

---

## License

This project is open source and available under the [MIT License](LICENSE).
