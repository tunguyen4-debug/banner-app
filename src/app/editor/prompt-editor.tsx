"use client";

interface PromptEditorProps {
  basePrompt: string;
  userPrompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  onRegenerate: () => void;
  isGenerating: boolean;
  hasDesign: boolean;
}

export function PromptEditor({
  basePrompt,
  userPrompt,
  onPromptChange,
  onGenerate,
  onRegenerate,
  isGenerating,
  hasDesign,
}: PromptEditorProps) {
  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          Edit Prompt
        </label>
        <textarea
          value={userPrompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Add your custom instructions... e.g., 'Make background gradient blue', 'Use minimalist style', 'Add 50% discount badge'"
          className="min-h-[120px] w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
          disabled={isGenerating}
        />
        {basePrompt && (
          <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Base Prompt
            </p>
            <p className="mt-1 text-[11px] text-slate-400">{basePrompt}</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {!hasDesign ? (
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Generating...
              </span>
            ) : (
              "Generate Banner"
            )}
          </button>
        ) : (
          <button
            onClick={onRegenerate}
            disabled={isGenerating}
            className="flex-1 rounded-lg bg-indigo-500 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Regenerating...
              </span>
            ) : (
              "Regenerate"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
