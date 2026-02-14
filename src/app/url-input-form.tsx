"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function UrlInputForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      // For now, redirect to editor with URL param
      // Later this will call /api/analyze-url first
      const encoded = encodeURIComponent(url.trim());
      router.push(`/editor?url=${encoded}`);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/product"
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Analyzing...
            </>
          ) : (
            <>
              <span>Analyze</span>
              <span className="text-[10px] opacity-80">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
