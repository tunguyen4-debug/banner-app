"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Concept {
  headline: string;
  subheadline: string;
  cta: string;
  styleGuide: {
    colors: string[];
    font: string;
    mood: string;
  };
}

interface DesignPreviewProps {
  design: {
    imageUrl?: string;
    htmlLayout?: string;
    css?: string;
    promptUsed?: string;
  } | null;
  isGenerating: boolean;
  selectedConcept: Concept | null;
}

export function DesignPreview({
  design,
  isGenerating,
  selectedConcept,
}: DesignPreviewProps) {
  const [viewMode, setViewMode] = useState<"image" | "code">("code"); // Default to code view
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (design?.imageUrl) {
      console.log("Design image URL:", design.imageUrl);
      setImageError(false);
    }
    // Auto-switch to code view if HTML/CSS is available
    if (design?.htmlLayout && !design?.imageUrl) {
      setViewMode("code");
    }
  }, [design]);

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/70">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <h2 className="text-sm font-semibold text-slate-100">Design Preview</h2>
        {design && (
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("image")}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                  viewMode === "image"
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Image
              </button>
              <button
                onClick={() => setViewMode("code")}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                  viewMode === "code"
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Code
              </button>
            </div>
            {design.imageUrl && (
              <button
                onClick={() => {
                  if (design.imageUrl) {
                    window.open(design.imageUrl, "_blank");
                    toast.success("Opened image in new tab");
                  }
                }}
                className="rounded-lg border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
                title="Open image in new tab"
              >
                Open
              </button>
            )}
            {design.htmlLayout && design.css && (
              <button
                onClick={() => {
                  const fullCode = `<!DOCTYPE html>
<html>
<head>
  <style>
${design.css}
  </style>
</head>
<body>
${design.htmlLayout}
</body>
</html>`;
                  navigator.clipboard.writeText(fullCode);
                  toast.success("HTML/CSS copied to clipboard!");
                }}
                className="rounded-lg border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
                title="Copy HTML/CSS"
              >
                Copy Code
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {isGenerating && !design && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
              <p className="text-sm text-slate-400">Generating your banner...</p>
            </div>
          </div>
        )}

        {!isGenerating && !design && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center space-y-3">
              <div className="mx-auto h-16 w-16 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center">
                <span className="text-2xl text-slate-600">🎨</span>
              </div>
              <p className="text-sm text-slate-400">
                {selectedConcept
                  ? "Click 'Generate Banner' to create your design"
                  : "Select a concept or enter a prompt to generate"}
              </p>
            </div>
          </div>
        )}

        {design && viewMode === "image" && design.imageUrl && (
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-4xl">
              <div className="mb-2 text-center">
                <p className="text-xs text-slate-500">
                  Image URL: {design.imageUrl.substring(0, 60)}...
                </p>
              </div>
              {imageError ? (
                <div className="flex aspect-[3/1] w-full items-center justify-center rounded-lg border border-slate-800 bg-slate-950">
                  <div className="text-center space-y-3 p-6">
                    <p className="text-sm font-medium text-slate-300">Failed to load image</p>
                    <p className="text-xs text-slate-500">The image URL may be expired or inaccessible</p>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          if (design.imageUrl) {
                            window.open(design.imageUrl, "_blank");
                            toast.success("Opening image in new tab...");
                          }
                        }}
                        className="rounded-lg bg-indigo-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-400"
                      >
                        Open Image URL
                      </button>
                      {design.htmlLayout && (
                        <button
                          onClick={() => setViewMode("code")}
                          className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-800"
                        >
                          View Code Instead
                        </button>
                      )}
                    </div>
                    <details className="mt-4 text-left">
                      <summary className="cursor-pointer text-[10px] text-slate-500">Show URL</summary>
                      <p className="mt-2 break-all text-[10px] text-slate-600 px-2">
                        {design.imageUrl}
                      </p>
                    </details>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[3/1] w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
                  <img
                    src={design.imageUrl}
                    alt="Generated banner"
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      console.error("Image load error:", e);
                      console.error("Failed image URL:", design.imageUrl);
                      setImageError(true);
                      toast.error("Failed to load image. Check console for details.");
                    }}
                    onLoad={() => {
                      console.log("Image loaded successfully:", design.imageUrl);
                      setImageError(false);
                    }}
                  />
                  <div className="absolute bottom-2 right-2 rounded bg-slate-900/80 px-2 py-1 text-[10px] text-slate-400">
                    {design.imageUrl.substring(0, 30)}...
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {design && viewMode === "image" && !design.imageUrl && (
          <div className="flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-sm text-slate-400">No image URL available</p>
              {design.htmlLayout && (
                <button
                  onClick={() => setViewMode("code")}
                  className="rounded-lg bg-indigo-500 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-400"
                >
                  View HTML/CSS Code Instead
                </button>
              )}
            </div>
          </div>
        )}

        {design && viewMode === "code" && (
          <div className="space-y-4">
            {design.htmlLayout && design.css && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Live Preview
                </p>
                <div className="rounded-lg border border-slate-800 bg-slate-50 p-6 overflow-auto flex justify-center">
                  <div className="banner-container" style={{ width: "1200px", maxWidth: "100%" }}>
                    <style dangerouslySetInnerHTML={{ __html: design.css }} />
                    <div
                      dangerouslySetInnerHTML={{ __html: design.htmlLayout }}
                      className="banner-preview"
                    />
                  </div>
                </div>
              </div>
            )}
            {design.htmlLayout && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  HTML
                </p>
                <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 text-[11px] text-slate-300 max-h-64 overflow-y-auto">
                  <code>{design.htmlLayout}</code>
                </pre>
              </div>
            )}
            {design.css && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  CSS
                </p>
                <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 text-[11px] text-slate-300 max-h-64 overflow-y-auto">
                  <code>{design.css}</code>
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
