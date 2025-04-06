export default function CodeInput({ code, setCode }) {
    return (
      <textarea
        className="w-full h-40 p-3 border rounded-md"
        placeholder="Enter your Java or Python code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    );
  }