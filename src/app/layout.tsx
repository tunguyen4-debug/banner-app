import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Marketing Banner Studio",
  description:
    "Generate and edit marketing banners and posters from any company website URL using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e293b",
              color: "#f1f5f9",
              border: "1px solid #334155",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#f1f5f9",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#f1f5f9",
              },
            },
          }}
        />
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <a href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-sm font-bold">
                  AI
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-tight">
                    Banner Studio
                  </span>
                  <span className="text-xs text-slate-400">
                    URL → AI Marketing Creatives
                  </span>
                </div>
              </a>
              <nav className="flex items-center gap-4 text-xs text-slate-400">
                <span className="hidden md:inline">Docs</span>
                <span className="hidden md:inline">Changelog</span>
                <button className="rounded-full border border-slate-700 px-3 py-1 text-[11px] font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900">
                  Export project
                </button>
              </nav>
            </div>
          </header>
          <main className="flex-1 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
            {children}
          </main>
          <footer className="border-t border-slate-800 bg-slate-950/80">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-xs text-slate-500">
              <span>© {new Date().getFullYear()} AI Banner Studio</span>
              <span>Made for marketing & growth teams</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
