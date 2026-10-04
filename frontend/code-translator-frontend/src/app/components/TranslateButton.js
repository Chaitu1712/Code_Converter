"use client";

export default function TranslateButton({ loading, onTranslate }) {
  return (
    <button
      className="w-full py-3.5 bg-primary-btn hover:bg-primary-hover text-primary-text font-bold rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      style={{ boxShadow: "var(--primary-btn-shadow)" }}
      onClick={onTranslate}
      disabled={loading}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.5 2 8 6.5 3.5 8l4.5 1.5L9.5 14l1.5-4.5L15.5 8l-4.5-1.5zM21 16l-1 3-3 1 3 1 1 3 1-3 3-1-3-1z" />
          </svg>
          Translate Code
        </>
      )}
    </button>
  );
}