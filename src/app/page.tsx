import Link from "next/link";
import { UrlInputForm } from "./url-input-form";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-12 px-6 py-10 lg:py-14">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-300 shadow-sm shadow-slate-900/60">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 text-[10px] text-slate-950">
              ✶
            </span>
            <span className="font-semibold tracking-tight">
              Paste any URL → Get on-brand banners in seconds
            </span>
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              AI-generated{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
                marketing banners
              </span>{" "}
              from any company website.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Drop in a product or company URL and let AI analyze the brand,
              copy and visuals. Instantly generate and iteratively refine
              banners & posters for your campaigns, all in one professional
              editor.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-[0_18px_60px_-40px_rgba(15,23,42,1)]">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  1 · Paste a URL
                </p>
                <p className="text-sm text-slate-200">
                  We will fetch the website, extract brand messaging and suggest
                  ready-to-use banner concepts.
                </p>
              </div>
              <div className="hidden h-10 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 text-xs font-medium text-emerald-300 md:inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(34,197,94,0.35)]" />
                Live AI analysis
              </div>
            </div>
            <UrlInputForm />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            <span className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1">
              No assets needed – just a URL
            </span>
            <span className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1">
              Editable prompts & styles
            </span>
            <span className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1">
              Thinking & code view for developers
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.28),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(45,212,191,0.13),_transparent_55%)] opacity-70" />
          <div className="relative space-y-4 rounded-3xl border border-slate-800/80 bg-slate-900/80 p-4 shadow-[0_20px_90px_-45px_rgba(15,23,42,1)] backdrop-blur">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 text-[10px] font-semibold">
                  URL
                </div>
                <span className="truncate">
                  https://your-b2b-saas.com/pricing
                </span>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-medium text-emerald-300">
                Brand analyzed
              </span>
            </div>
            <div className="grid gap-3 text-[11px] text-slate-300">
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Suggested concept
                </p>
                <p className="text-xs font-medium text-slate-50">
                  “Upgrade your workflow with an AI-native stack”
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Hero banner · Gradient blue/purple · Minimal UI mockups ·
                  Primary CTA: “Start free trial”
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Target audience
                  </p>
                  <p className="text-xs text-slate-200">
                    Growth & marketing teams at B2B SaaS companies.
                  </p>
                </div>
                <div className="space-y-1 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Tone & style
                  </p>
                  <p className="text-xs text-slate-200">
                    Confident, product-led, modern gradients with clean UI
                    cards.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Next step
                  </p>
                  <p className="text-xs text-slate-200">
                    Send this concept into the editor to generate your first AI
                    banner and refine it with prompts.
                  </p>
                </div>
                <Link
                  href="/editor"
                  className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-3 py-1.5 text-[11px] font-medium text-slate-50 shadow-sm shadow-indigo-500/40 transition hover:bg-indigo-400"
                >
                  Open editor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 border-t border-slate-800 pt-8 text-xs text-slate-300 md:grid-cols-3">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            1 · Analyze any website
          </p>
          <p className="text-sm text-slate-200">
            We crawl the page, detect key value props, tone and visual style,
            then convert them into campaign-ready banner concepts.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            2 · Generate creatives with AI
          </p>
          <p className="text-sm text-slate-200">
            Use curated prompts and styling to produce on-brand banners and
            posters for ads, social and landing pages.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            3 · Edit with prompts & code
          </p>
          <p className="text-sm text-slate-200">
            Adjust copy, colors and layout via prompts, while developers can
            inspect the underlying HTML/CSS thinking.
          </p>
        </div>
      </section>
    </div>
  );
}
