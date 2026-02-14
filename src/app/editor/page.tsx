"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { PromptEditor } from "./prompt-editor";
import { DesignPreview } from "./design-preview";
import { ThinkingPanel } from "./thinking-panel";

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

interface Analysis {
  companyName?: string;
  companyDescription?: string;
  mainServices?: string[];
  summary: string;
  tone: string;
  audience: string;
  conceptSuggestions: Concept[];
  recommendedPrompt: string;
}

export default function EditorPage() {
  const searchParams = useSearchParams();
  const urlParam = searchParams.get("url");

  const [url, setUrl] = useState(urlParam || "");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [currentDesign, setCurrentDesign] = useState<{
    imageUrl?: string;
    htmlLayout?: string;
    css?: string;
    promptUsed?: string;
    thinkingSteps?: Array<{
      step: string;
      timestamp: number;
      content?: string;
      code?: string;
    }>;
  } | null>(null);

  const [userPrompt, setUserPrompt] = useState("");

  // Analyze URL on mount if URL param exists
  useEffect(() => {
    if (urlParam && urlParam !== url) {
      setUrl(urlParam);
      handleAnalyze(urlParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParam]);

  const handleAnalyze = async (urlToAnalyze: string) => {
    if (!urlToAnalyze.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    // Reset state for new analysis
    setAnalysis(null);
    setSelectedConcept(null);
    setCurrentDesign(null);
    setUserPrompt("");
    setIsAnalyzing(true);

    console.log("Analyzing URL:", urlToAnalyze);

    try {
      const response = await fetch("/api/analyze-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToAnalyze.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        console.error("Analysis API error:", errorData);
        toast.error(errorData.error || `Failed to analyze URL (${response.status})`);
        return;
      }

      const data = await response.json();
      console.log("Analysis result:", data);

      if (!data.analysis) {
        toast.error("Invalid response from server");
        return;
      }

      setAnalysis(data.analysis);
      setUrl(data.url || urlToAnalyze);
      
      if (data.analysis.conceptSuggestions && data.analysis.conceptSuggestions.length > 0) {
        setSelectedConcept(data.analysis.conceptSuggestions[0]);
      } else {
        toast.warning("Analysis completed but no concepts generated");
      }
      
      toast.success("Website analyzed successfully!");
    } catch (error) {
      console.error("Analysis error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to analyze URL: ${errorMessage}. Please check the URL and try again.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedConcept && !userPrompt.trim()) {
      toast.error("Please select a concept or enter a prompt");
      return;
    }

    setIsGenerating(true);
    setCurrentDesign(null);
    toast.loading("Generating your banner...", { id: "generate" });

    try {
      const response = await fetch("/api/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          urlInfo: { url },
          concept: selectedConcept,
          promptOverrides: userPrompt.trim() || undefined,
          mode: "both", // Generate both image and HTML/CSS
          companyInfo: analysis ? {
            companyName: (analysis as any).companyName,
            companyDescription: (analysis as any).companyDescription,
            mainServices: (analysis as any).mainServices,
          } : undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to generate design", {
          id: "generate",
        });
        return;
      }

      const data = await response.json();
      console.log("=== GENERATED DESIGN DATA ===");
      console.log("Full response:", JSON.stringify(data, null, 2));
      console.log("Image URL:", data.imageUrl);
      console.log("Has HTML:", !!data.htmlLayout);
      console.log("Has CSS:", !!data.css);
      console.log("Thinking steps:", data.thinkingSteps?.length || 0);
      
      setCurrentDesign(data);
      
      if (data.imageUrl) {
        toast.success("Banner generated successfully! Check preview.", { id: "generate" });
      } else if (data.htmlLayout) {
        toast.success("HTML/CSS code generated! Switch to Code view.", { id: "generate" });
      } else {
        toast.error("Generation completed but no output. Check Thinking Panel for details.", { id: "generate", duration: 5000 });
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate design. Please try again.", {
        id: "generate",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    if (!currentDesign?.promptUsed) {
      toast.error("No existing design to regenerate");
      return;
    }

    setIsGenerating(true);
    toast.loading("Regenerating banner...", { id: "regenerate" });

    try {
      const response = await fetch("/api/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          basePrompt: currentDesign.promptUsed,
          userPrompt: userPrompt.trim() || "Make it more modern and eye-catching",
          mode: "both",
          companyInfo: analysis ? {
            companyName: (analysis as any).companyName,
            companyDescription: (analysis as any).companyDescription,
            mainServices: (analysis as any).mainServices,
          } : undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || "Failed to regenerate", { id: "regenerate" });
        return;
      }

      const data = await response.json();
      setCurrentDesign(data);
      toast.success("Banner regenerated!", { id: "regenerate" });
    } catch (error) {
      console.error("Regeneration error:", error);
      toast.error("Failed to regenerate. Please try again.", {
        id: "regenerate",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1920px] flex-col gap-4 px-4 py-4 lg:flex-row lg:gap-6">
      {/* Left Column: URL Info + Concepts + Prompt Editor */}
      <div className="flex w-full flex-col gap-4 lg:w-80 lg:flex-shrink-0">
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Website URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  // Reset analysis when URL changes
                  if (analysis && e.target.value !== url) {
                    setAnalysis(null);
                    setSelectedConcept(null);
                    setCurrentDesign(null);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && url.trim() && !isAnalyzing) {
                    handleAnalyze(url);
                  }
                }}
                placeholder="https://example.com"
                className="flex-1 rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                disabled={isAnalyzing}
              />
              <button
                onClick={() => url && handleAnalyze(url)}
                disabled={isAnalyzing || !url.trim()}
                className="rounded-lg bg-indigo-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Analyzing...
                  </span>
                ) : (
                  "Analyze"
                )}
              </button>
            </div>
          </div>

          {analysis && (
            <div className="space-y-3 border-t border-slate-800 pt-3">
              {(analysis as any).companyName && (
                <div className="space-y-1 text-xs">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Company Name</p>
                  <p className="font-semibold text-slate-100 text-sm">{(analysis as any).companyName}</p>
                </div>
              )}
              {(analysis as any).companyDescription && (
                <div className="space-y-1 text-xs">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">What They Do</p>
                  <p className="text-slate-300">{(analysis as any).companyDescription}</p>
                </div>
              )}
              {(analysis as any).mainServices && (analysis as any).mainServices.length > 0 && (
                <div className="space-y-1 text-xs">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Main Services</p>
                  <div className="flex flex-wrap gap-1">
                    {(analysis as any).mainServices.slice(0, 3).map((service: string, idx: number) => (
                      <span key={idx} className="rounded-full border border-slate-700 bg-slate-900/60 px-2 py-0.5 text-[10px] text-slate-300">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-slate-300">Summary</p>
                <p className="text-slate-400">{analysis.summary}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <p className="text-slate-500">Tone</p>
                  <p className="text-slate-300">{analysis.tone}</p>
                </div>
                <div>
                  <p className="text-slate-500">Audience</p>
                  <p className="text-slate-300 truncate">{analysis.audience}</p>
                </div>
              </div>
            </div>
          )}

          {analysis?.conceptSuggestions && (
            <div className="space-y-2 border-t border-slate-800 pt-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Concepts
              </p>
              {analysis.conceptSuggestions.map((concept, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedConcept(concept)}
                  className={`w-full rounded-lg border p-3 text-left text-xs transition ${
                    selectedConcept === concept
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                  }`}
                >
                  <p className="font-medium text-slate-100">
                    {concept.headline}
                  </p>
                  <p className="mt-1 text-slate-400">{concept.subheadline}</p>
                  <p className="mt-2 text-[10px] text-slate-500">
                    {concept.styleGuide.mood}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <PromptEditor
          basePrompt={analysis?.recommendedPrompt || ""}
          userPrompt={userPrompt}
          onPromptChange={setUserPrompt}
          onGenerate={handleGenerate}
          onRegenerate={handleRegenerate}
          isGenerating={isGenerating}
          hasDesign={!!currentDesign}
        />
      </div>

      {/* Center Column: Design Preview */}
      <div className="flex-1">
        <DesignPreview
          design={currentDesign}
          isGenerating={isGenerating}
          selectedConcept={selectedConcept}
        />
      </div>

      {/* Right Column: Thinking Panel */}
      <div className="w-full lg:w-80 lg:flex-shrink-0">
        <ThinkingPanel
          thinkingSteps={currentDesign?.thinkingSteps || []}
          promptUsed={currentDesign?.promptUsed}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
}
