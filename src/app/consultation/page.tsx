"use client";

import { useState, useEffect } from "react";
import SplashScreen from "../../components/SplashScreen";
import OnboardingScreen from "../../components/OnboardingScreen";
import ResultView from "../../components/ResultView";
import { AssistantResponse } from "../../ai/schemas";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import sparklesAnimation from "../../../public/sparkles-loader.json";

type AppState = "splash" | "onboarding" | "home" | "result";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("splash");
  const [medicineName, setMedicineName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState<AssistantResponse | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  // On desktop, skip splash/onboarding and go straight to home
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const update = (e: MediaQueryList | MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (e.matches && (appState === "splash" || appState === "onboarding")) {
        setAppState("home");
      }
    };
    update(mql);
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [appState]);

  const handleSearch = async (name: string) => {
    if (!name.trim()) return;
    const trimmed = name.trim();
    setMedicineName(trimmed);
    setIsLoading(true);
    setAppState("result");
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
      return [trimmed, ...filtered].slice(0, 5);
    });
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medicineName: trimmed, question: "", language: "Simple English" }),
      });
      const data = await res.json();
      setAssistantResponse(data);
    } catch (error) {
      console.error("Consultation error:", error);
      setAssistantResponse({ type: "error", message: "Gemma API is unavailable right now. Please check your API key or try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(medicineName);
  };

  const handleBackToSearch = () => {
    setAssistantResponse(null);
    setMedicineName("");
    setAppState("home");
  };

  const commonActions = [
    { label: "Search Medicine", subtitle: "Find medicine info", query: "", icon: <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>, color: "bg-primary-soft text-primary" },
    { label: "Side Effects", subtitle: "Learn about risks", query: "side effects", icon: <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>, color: "bg-blue-50 text-blue-600" },
    { label: "Warnings", subtitle: "Know the cautions", query: "warnings", icon: <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>, color: "bg-orange-50 text-orange-500" },
    { label: "Interactions", subtitle: "Check interactions", query: "interactions", icon: <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>, color: "bg-primary-soft text-primary" },
    { label: "Dosage Guide", subtitle: "How and how much", query: "dosage guide", icon: <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h.75" /></svg>, color: "bg-primary-soft text-primary" },
    { label: "When to Seek Help", subtitle: "Red flags to watch", query: "when to seek help", icon: <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>, color: "bg-red-50 text-danger" },
  ];

  return (
    <div className="min-h-[100dvh] bg-canvas text-ink font-sans flex justify-center selection:bg-primary/20">
      {/* Container: narrow on mobile, full-width on desktop */}
      <div className="w-full max-w-md md:max-w-none bg-canvas relative flex flex-col shadow-2xl md:shadow-none overflow-hidden min-h-[100dvh] mx-auto">
        
        {/* ─── Desktop Top Navigation ─── */}
        {(appState === "home" || appState === "result") && (
          <div className="hidden md:flex items-center justify-between px-8 lg:px-16 py-4 border-b border-border bg-canvas/80 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-2.5">
              <div className="w-[36px] h-[24px] relative"><span className="absolute left-[2px] top-[2px] w-[16px] h-[19px] bg-[#9ce3d7] border-[1.4px] border-[#101314] -skew-x-[18deg] -rotate-[35deg]" /><span className="absolute left-[18px] top-[3px] w-[16px] h-[19px] bg-[#7fd9ca] border-[1.4px] border-[#101314] skew-x-[18deg] rotate-[35deg]" /></div>
              <h1 className="font-bold text-ink tracking-tight text-lg">Pocketcare AI</h1>
            </div>
            <div className="flex gap-8">
              <button onClick={handleBackToSearch} className={`text-sm font-medium transition-colors relative ${appState === "home" ? "text-primary after:absolute after:bottom-[-18px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded" : "text-muted hover:text-ink"}`}>Home</button>
              <button className="text-sm font-medium text-muted hover:text-ink transition-colors">History</button>
              <button className="text-sm font-medium text-muted hover:text-ink transition-colors">Saved</button>
              <button className="text-sm font-medium text-muted hover:text-ink transition-colors">Settings</button>
            </div>
          </div>
        )}
        
        {/* ─── Splash & Onboarding (Mobile only) ─── */}
        {appState === "splash" && <SplashScreen onComplete={() => setAppState("onboarding")} />}
        {appState === "onboarding" && <OnboardingScreen onComplete={() => setAppState("home")} />}

        {/* ─── Home Screen ─── */}
        {appState === "home" && (
          <div className="flex-1 flex flex-col animate-in fade-in duration-300 h-full overflow-y-auto pb-24 md:pb-8 bg-canvas">
            
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2 md:hidden">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl text-muted hover:bg-surface-card transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
              </button>
              <div className="flex items-center gap-1.5">
                <div className="w-[30px] h-[20px] relative"><span className="absolute left-[1px] top-[2px] w-[14px] h-[16px] bg-[#9ce3d7] border-[1.2px] border-[#101314] -skew-x-[18deg] -rotate-[35deg]" /><span className="absolute left-[15px] top-[3px] w-[14px] h-[16px] bg-[#7fd9ca] border-[1.2px] border-[#101314] skew-x-[18deg] rotate-[35deg]" /></div>
                <span className="font-bold text-ink text-sm tracking-tight">Pocketcare AI</span>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl text-muted hover:bg-surface-card transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              </button>
            </div>

            {/* Desktop: centered content container */}
            <div className="w-full md:max-w-5xl md:mx-auto">
              {/* Desktop: Split Hero */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-8 px-8 pt-10 pb-6">
                <div className="col-span-3">
                  <h2 className="text-4xl font-extrabold text-ink tracking-tight leading-tight">Hello! 👋</h2>
                  <p className="text-base text-muted mt-1.5 mb-6">How can I help you today?</p>
                  <form onSubmit={handleConsultationSubmit} className="relative flex items-center">
                    <div className="absolute left-4 text-muted pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    </div>
                    <input type="text" id="medicine-search" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} placeholder="Search any medicine..." className="w-full pl-12 pr-14 py-4 rounded-2xl border border-border bg-surface-card text-ink placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-base shadow-sm" required />
                    <button type="submit" className="absolute right-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity active:scale-95 shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </button>
                  </form>
                  <div className="flex items-center gap-1.5 mt-2.5 ml-1">
                    <svg className="w-3.5 h-3.5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <span className="text-[11px] text-success font-semibold">Gemma 4 AI Online</span>
                  </div>
                </div>
                <div className="col-span-2 rounded-2xl bg-gradient-to-br from-primary/5 via-[#CCFBF1]/40 to-[#9ce3d7]/20 border border-primary/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg></div>
                    <h3 className="font-bold text-ink text-lg tracking-tight">Powered by Gemma 4</h3>
                    <p className="text-sm text-muted mt-1 leading-relaxed">Get instant, AI-driven medicine guidance with safety-first analysis.</p>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className="text-center"><span className="text-2xl font-bold text-primary">6</span><p className="text-[10px] text-muted mt-0.5">Categories</p></div>
                    <div className="text-center"><span className="text-2xl font-bold text-primary">24/7</span><p className="text-[10px] text-muted mt-0.5">Available</p></div>
                  </div>
                </div>
              </div>

              {/* Mobile: Greeting + Search */}
              <div className="md:hidden">
                <div className="px-5 pt-4 pb-2">
                  <h2 className="text-2xl font-extrabold text-ink tracking-tight">Hello! 👋</h2>
                  <p className="text-sm text-muted mt-1">How can I help you today?</p>
                </div>
                <div className="px-5 pt-3">
                  <form onSubmit={handleConsultationSubmit} className="relative flex items-center">
                    <div className="absolute left-4 text-muted pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    </div>
                    <input type="text" id="medicine-search-mobile" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} placeholder="Ask about a medicine..." className="w-full pl-11 pr-14 py-3.5 rounded-2xl border border-border bg-surface-card text-ink placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm shadow-sm" required />
                    <button type="submit" className="absolute right-2 w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity active:scale-95 shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </button>
                  </form>
                  <div className="flex items-center gap-1.5 mt-2.5 ml-1">
                    <svg className="w-3.5 h-3.5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <span className="text-[11px] text-success font-semibold">Online</span>
                  </div>
                </div>
              </div>

              {/* Common Actions */}
              <div className="px-5 pt-6 md:px-8">
                <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Common actions</h3>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-2.5 md:gap-3">
                  {commonActions.map((action) => (
                    <button key={action.label} onClick={() => { const el = (document.getElementById('medicine-search') || document.getElementById('medicine-search-mobile')) as HTMLInputElement; el?.focus(); }} className="flex flex-col items-center justify-center p-3 md:p-5 bg-surface-card rounded-2xl border border-border shadow-sm active:scale-95 transition-all text-center gap-2 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 md:flex-row md:justify-start md:items-center md:gap-4 md:text-left">
                      <div className={`w-9 h-9 md:w-12 md:h-12 rounded-xl ${action.color} flex items-center justify-center shrink-0`}>{action.icon}</div>
                      <div>
                        <span className="font-semibold text-ink text-[10px] md:text-sm leading-tight block">{action.label}</span>
                        <span className="text-muted text-[8px] md:text-xs leading-tight block mt-0.5">{action.subtitle}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div className="px-5 pt-6 md:px-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-muted uppercase tracking-widest">Recent searches</h3>
                  {recentSearches.length > 0 && <button className="text-[11px] text-primary font-semibold hover:underline">View all</button>}
                </div>
                {/* Mobile: list style */}
                <div className="md:hidden bg-surface-card rounded-2xl border border-border overflow-hidden shadow-sm">
                  {(recentSearches.length > 0 ? recentSearches : ["Paracetamol", "Ibuprofen"]).map((item, i) => (
                    <button key={i} onClick={() => handleSearch(item)} className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-canvas transition-colors border-b border-border last:border-b-0 active:bg-canvas">
                      <span className="text-sm font-medium text-ink">{item}</span>
                      <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </button>
                  ))}
                </div>
                {/* Desktop: pill chips */}
                <div className="hidden md:flex flex-wrap gap-2">
                  {(recentSearches.length > 0 ? recentSearches : ["Paracetamol", "Ibuprofen", "Amoxicillin"]).map((item, i) => (
                    <button key={i} onClick={() => handleSearch(item)} className="inline-flex items-center gap-2 pl-3 pr-4 py-2.5 bg-surface-card rounded-full border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all text-sm font-medium text-ink">
                      <svg className="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Result Screen ─── */}
        {appState === "result" && (
          <div className="flex-1 flex flex-col animate-in fade-in duration-300 h-full overflow-y-auto pb-24 md:pb-8 bg-canvas">
            {/* Mobile back bar */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2 md:hidden">
              <button onClick={handleBackToSearch} className="w-10 h-10 flex items-center justify-center rounded-xl text-muted hover:text-ink hover:bg-surface-card transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              </button>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl text-muted hover:text-ink hover:bg-surface-card transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl text-muted hover:text-ink hover:bg-surface-card transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8a2 2 0 110-4 2 2 0 010 4zM12 14a2 2 0 110-4 2 2 0 010 4zM12 20a2 2 0 110-4 2 2 0 010 4z" /></svg>
                </button>
              </div>
            </div>
            {/* Desktop back */}
            <div className="hidden md:block px-8 lg:px-16 pt-6">
              <button onClick={handleBackToSearch} className="flex items-center gap-2 text-muted hover:text-ink transition-colors w-max">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                <span className="font-medium text-sm">Back to search</span>
              </button>
            </div>
            {/* Result Content */}
            <div className="px-5 pt-4 md:px-8 lg:px-16 w-full md:max-w-3xl lg:max-w-4xl md:mx-auto">
              {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-48 h-48 mb-4"><Lottie animationData={sparklesAnimation} loop={true} /></div>
                  <h3 className="text-lg font-bold text-ink mb-1">Thinking with Gemma 4...</h3>
                  <p className="text-sm text-muted">Analyzing your request safely.</p>
                </div>
              ) : assistantResponse ? (
                <ResultView response={assistantResponse} language="Simple English" onClose={handleBackToSearch} />
              ) : null}
            </div>
          </div>
        )}

        {/* ─── Bottom Navigation (Mobile only) ─── */}
        {(appState === "home" || appState === "result") && (
          <div className="absolute bottom-0 left-0 w-full bg-canvas border-t border-border px-6 py-2.5 flex justify-around items-center z-20 pb-[env(safe-area-inset-bottom,12px)] shadow-[0_-4px_24px_rgba(0,0,0,0.04)] md:hidden">
            <button onClick={handleBackToSearch} className={`flex flex-col items-center gap-0.5 py-1 px-3 ${appState === "home" ? "text-primary" : "text-muted hover:text-ink"}`}>
              <svg className="w-5 h-5" fill={appState === "home" ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              <span className="text-[10px] font-semibold">Home</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 py-1 px-3 text-muted hover:text-ink">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-[10px] font-semibold">History</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 py-1 px-3 text-muted hover:text-ink">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
              <span className="text-[10px] font-semibold">Saved</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 py-1 px-3 text-muted hover:text-ink">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-[10px] font-semibold">Settings</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
