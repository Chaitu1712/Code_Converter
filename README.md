# AI Code Translator

An AI-powered tool to translate code between **Java** and **Python** using the power of Gemini API for code conversion and explanation. The project is built with a modern full-stack architecture that includes:

- **Backend:** Spring Boot (Java) for API orchestration
- **AI Processing:** Flask microservice using google Gemini API for translation
- **Frontend:** Next.js (React) with Tailwind CSS for a sleek, responsive UI

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
  - [Flask Microservice](#flask-microservice)
  - [Backend (Spring Boot)](#backend-spring-boot)
  - [Frontend (Next.js)](#frontend-nextjs)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Bidirectional Code Translation:** Convert Java to Python and Python to Java.
- **Syntax Correction & Explanation:** Provides a corrected version of the code along with an explanation of the changes.
- **GitHub Integration:** Fetch code from GitHub and display the translated version with an option to download.
- **Modern UI:** Built with Next.js, featuring syntax highlighting, smooth scrolling, and a refined UI experience.
- **Stateless Architecture:** Simplified deployment without the need for a dedicated database.

---

## Architecture

The system is composed of three main components:

1. **Spring Boot Backend:**  
   - Exposes REST APIs for code translation and GitHub integration.
   - Acts as the central hub that orchestrates calls between the UI and the AI processing layer.

2. **Flask Microservice:**  
   - Powered by google's Gemini API.
   - Translates code between Java and Python.
   - Returns the translated code along with detailed explanations.

3. **Next.js Frontend:**  
   - Provides a user-friendly interface for inputting code, selecting languages, and displaying results.
   - Built with modern features such as Tailwind CSS, dynamic syntax highlighting, and smooth UI interactions.

---

## Tech Stack

- **Backend:**  
  - Java, Spring Boot, Maven  
  - RESTful APIs

- **AI Processing:**  
  - Python, Flask  
  - Google Gemini API

- **Frontend:**  
  - Next.js (React)  
  - Tailwind CSS, Axios, Prism.js (for syntax highlighting)

---

## Installation & Setup
**Clone the repository:**
    ```bash
       https://github.com/Chaitu1712/Code_Converter.git
    ```
### Flask Microservice
Navigate to the Flask microservice directory:
1. **Navigate to the Flask microservice directory:**
    ```bash
    cd ../translate_microservice
    ```
2. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
### Backend (Spring Boot)
1. **Navigate to backend directory:**
   ```bash
   cd backend/code_translator
2. **Build and Run:**
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
Note: The Spring Boot backend will automatically call the Flask microservice.
### Frontend
1. **Navigate to the frontend directory:**
    ```bash
    cd ../frontend/code-translator-frontend
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Run development server:**
    ```bash
    npm run dev
    ```
4. **Access the UI: Open your browser and navigate to http://localhost:3000.**
---
## Usage
1. **Enter Code:**
- Paste your Java or Python code into the input field.
- Select the source and target languages using the language selector.
2. **Translate:**
- Click the "Convert Code" button.
- The system sends your code to the backend, which in turn calls the Flask microservice for translation.
- The translated code and explanation are displayed on the UI with syntax highlighting and smooth scrolling.
---
## Contributing
Contributions are welcome!
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Open a pull request describing your changes.
- Follow the existing code style and write tests for new features.
---
## License
This project is open source and available under the MIT License.