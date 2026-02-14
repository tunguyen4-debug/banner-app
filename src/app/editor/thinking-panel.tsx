"use client";

interface ThinkingStep {
  step: string;
  timestamp: number;
  content?: string;
  code?: string;
}

interface ThinkingPanelProps {
  thinkingSteps: ThinkingStep[];
  promptUsed?: string;
  isGenerating: boolean;
}

export function ThinkingPanel({
  thinkingSteps,
  promptUsed,
  isGenerating,
}: ThinkingPanelProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/70">
      {/* Header */}
      <div className="border-b border-slate-800 p-4">
        <h2 className="text-sm font-semibold text-slate-100">AI Thinking</h2>
        <p className="mt-1 text-[10px] text-slate-400">
          Real-time generation steps and code
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {isGenerating && thinkingSteps.length === 0 && (
          <div className="text-center text-xs text-slate-400">
            <p>Waiting for generation to start...</p>
          </div>
        )}

        {!isGenerating && thinkingSteps.length === 0 && (
          <div className="text-center text-xs text-slate-400">
            <p>Thinking steps will appear here</p>
          </div>
        )}

        {thinkingSteps.length > 0 && (
          <div className="space-y-4">
            {/* Final Prompt */}
            {promptUsed && (
              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Final Prompt
                </p>
                <p className="text-xs text-slate-300">{promptUsed}</p>
              </div>
            )}

            {/* Steps Timeline */}
            <div className="space-y-3">
              {thinkingSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative rounded-lg border border-slate-800 bg-slate-950/60 p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-[10px] font-semibold text-indigo-300">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-200">
                          {step.step}
                        </p>
                        <span className="text-[10px] text-slate-500">
                          +{step.timestamp}ms
                        </span>
                      </div>
                      {step.content && (
                        <p className="text-[11px] text-slate-400">
                          {step.content}
                        </p>
                      )}
                      {step.code && (
                        <pre className="mt-2 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-2 text-[10px] text-slate-300">
                          <code>{step.code}</code>
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isGenerating && (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <p className="text-xs text-emerald-300">Generating...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
