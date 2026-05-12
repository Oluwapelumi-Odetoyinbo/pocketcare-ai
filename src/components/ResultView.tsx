"use client";

import { useState, useEffect, useRef } from "react";
import { AssistantResponse } from "../ai/schemas";

interface ResultViewProps {
  response: AssistantResponse;
  onClose: () => void;
  language: string;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

/* ─── Animated Section Card ─── */
interface SectionCardProps {
  icon: React.ReactNode;
  accentColor: string;
  title: string;
  children: React.ReactNode;
  delay: number;
  defaultOpen?: boolean;
}

function SectionCard({ icon, accentColor, title, children, delay, defaultOpen = false }: SectionCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="bg-surface-card rounded-xl border border-border/60 overflow-hidden hover:shadow-md transition-shadow duration-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-3.5 py-4 px-4 md:px-5 text-left group"
        >
          <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg ${accentColor} flex items-center justify-center shrink-0`}>
            {icon}
          </div>
          <h4 className="flex-1 text-sm md:text-[15px] font-semibold text-ink tracking-[-0.01em]">{title}</h4>
          <svg
            className={`w-4 h-4 text-muted/50 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div className="px-4 md:px-5 pb-4 pt-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Animated List Item ─── */
function AnimatedListItem({ children, delay, dotColor }: { children: React.ReactNode; delay: number; dotColor: string }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <li className={`flex items-start gap-3 text-[13px] md:text-sm text-ink/80 leading-[1.7] transition-all duration-400 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} mt-[9px] shrink-0`} />
      <span>{children}</span>
    </li>
  );
}

/* ─── Confidence Badge ─── */
function ConfidenceBadge({ level }: { level: string }) {
  const config = {
    high: { label: "High confidence", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    medium: { label: "Medium confidence", color: "bg-amber-50 text-amber-700 border-amber-200" },
    low: { label: "Low confidence", color: "bg-red-50 text-red-600 border-red-200" },
  }[level] ?? { label: level, color: "bg-gray-50 text-gray-600 border-gray-200" };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${config.color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      {config.label}
    </span>
  );
}

/* ─── Reminder Modal ─── */
function ReminderModal({ reminder, onDismiss }: { reminder: { reason: string; suggestedLabel: string }; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSetReminder = async () => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      await Notification.requestPermission();
    }
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification("Pocketcare AI Reminder", {
        body: reminder.reason,
        tag: "med-reminder",
      });
    }
    onDismiss();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 transition-all duration-300 ease-out ${
        visible ? "bg-black/30 backdrop-blur-sm" : "bg-transparent pointer-events-none"
      }`}
      onClick={onDismiss}
    >
      <div
        className={`bg-surface-card w-full md:max-w-sm rounded-t-2xl md:rounded-2xl shadow-2xl border border-border transition-all duration-500 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-ink text-center mb-1">Reminder Suggestion</h3>
          <p className="text-sm text-muted text-center leading-relaxed">{reminder.reason}</p>
          <div className="mt-4 bg-primary-soft/50 rounded-xl px-4 py-3 text-center">
            <span className="text-sm font-bold text-primary">{reminder.suggestedLabel}</span>
          </div>
        </div>
        <div className="flex border-t border-border">
          <button onClick={onDismiss} className="flex-1 py-3.5 text-sm font-semibold text-muted hover:text-ink transition-colors active:bg-surface-card">
            Dismiss
          </button>
          <div className="w-px bg-border" />
          <button onClick={handleSetReminder} className="flex-1 py-3.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors active:bg-surface-card">
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResultView({ response, onClose, isSaved, onToggleSave }: ResultViewProps) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /* ─── Emergency View ─── */
  if (response.type === "emergency") {
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-red-50 border border-red-200/80 rounded-xl p-5 md:p-6">
          <div className="flex items-center gap-3 mb-3 text-red-600">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-lg font-bold tracking-tight">Urgent Safety Warning</h3>
          </div>
          <p className="text-red-800 font-medium text-[15px] leading-relaxed">{response.message}</p>
          {response.reason && <p className="mt-3 text-red-700/80 text-sm">{response.reason}</p>}
          <p className="mt-3 text-red-500 text-xs">{response.disclaimer}</p>
        </div>
        <button onClick={onClose} className="w-full py-3.5 bg-ink text-white font-semibold rounded-xl active:scale-[0.98] transition-transform text-sm">
          Back to Search
        </button>
      </div>
    );
  }

  /* ─── Error View ─── */
  if (response.type === "error") {
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-orange-50 border border-orange-200/80 rounded-xl p-6 text-center">
          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-500">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-ink mb-1">Something went wrong</h3>
          <p className="text-muted text-sm">{response.message}</p>
        </div>
        <button onClick={onClose} className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl active:scale-[0.98] transition-transform text-sm">
          Try Again
        </button>
      </div>
    );
  }

  if (response.type !== "gemma_direct_guidance") return null;

  const { guidance } = response;

  const sections = [
    { key: "answer", title: "What is it used for?", accentColor: "bg-primary/10 text-primary", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>, content: guidance.answer, type: "text" as const, dotColor: "bg-primary" },
    { key: "uses", title: "How to take", accentColor: "bg-blue-50 text-blue-600", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3" /></svg>, items: guidance.commonUses, type: "list" as const, dotColor: "bg-blue-500" },
    { key: "sideEffects", title: "Side effects", accentColor: "bg-amber-50 text-amber-600", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>, items: guidance.possibleSideEffects, type: "list" as const, dotColor: "bg-amber-500" },
    { key: "warnings", title: "Warnings & cautions", accentColor: "bg-red-50 text-red-500", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>, items: guidance.keyWarnings, type: "list" as const, dotColor: "bg-red-500" },
    { key: "avoid", title: "Interactions", accentColor: "bg-purple-50 text-purple-600", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>, items: guidance.whatToAvoid, type: "list" as const, dotColor: "bg-purple-500" },
    { key: "seekHelp", title: "When to seek help", accentColor: "bg-rose-50 text-rose-600", icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>, items: guidance.whenToSeekHelp, type: "list" as const, dotColor: "bg-rose-500" },
  ];

  // Filter out empty list sections
  const activeSections = sections.filter(s => s.type === "text" || (s.items && s.items.length > 0));
  const lastSectionDelay = 250 + (activeSections.length - 1) * 120;

  useEffect(() => {
    if (!guidance.reminderSuggestion.canCreateReminder) return;
    const timer = setTimeout(() => setShowReminder(true), lastSectionDelay + 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="pb-8 md:pb-12">

      {/* ─── Medicine Header ─── */}
      <div className={`mb-6 md:mb-8 transition-all duration-600 ease-out ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1">
              <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-tight leading-tight">
                {response.medicineName}
              </h2>
            </div>
            <p className="text-xs md:text-sm text-muted capitalize">{guidance.likelyMedicineType}</p>
            {guidance.alsoKnownAs && guidance.alsoKnownAs.length > 0 && (
              <p className="text-xs text-muted/70 mt-1.5">
                Also known as: <span className="text-primary font-medium">{guidance.alsoKnownAs.join(", ")}</span>
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onToggleSave && (
              <button onClick={onToggleSave} className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-colors ${isSaved ? "text-primary" : "text-muted hover:text-ink hover:bg-surface-card"}`} title={isSaved ? "Unsave" : "Save"}>
                <svg className="w-5 h-5 md:w-5 md:h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
              </button>
            )}
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
              <span className="text-xl md:text-2xl">💊</span>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <ConfidenceBadge level={guidance.confidence} />
          <span className="text-[11px] text-muted/60">
            {response.source === "gemma4_hosted_gemini_api" ? "Gemma 4 AI" : "Offline guidance"}
          </span>
        </div>
      </div>

      {/* ─── Section Cards (staggered) ─── */}
      <div className="space-y-3 md:space-y-3.5">
        {activeSections.map((section, index) => (
          <SectionCard
            key={section.key}
            icon={section.icon}
            accentColor={section.accentColor}
            title={section.title}
            delay={250 + index * 120}
            defaultOpen={index === 0}
          >
            {section.type === "text" ? (
              <p className="text-[13px] md:text-sm text-ink/75 leading-[1.8]">{section.content}</p>
            ) : (
              <ul className="space-y-2">
                {section.items!.map((item, i) => (
                  <AnimatedListItem key={i} delay={350 + index * 120 + i * 60} dotColor={section.dotColor}>
                    {item}
                  </AnimatedListItem>
                ))}
              </ul>
            )}
          </SectionCard>
        ))}
      </div>

      {/* ─── Disclaimer ─── */}
      <div className={`mt-5 md:mt-6 transition-all duration-500 ease-out`} style={{ transitionDelay: `${250 + activeSections.length * 120 + 100}ms` }}>
        <div className="bg-red-50/50 rounded-xl p-3.5 md:p-4 flex items-start gap-3 border border-red-100/60">
          <div className="w-7 h-7 rounded-lg bg-red-100/80 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-red-600/90 mb-0.5">Important Disclaimer</h4>
            <p className="text-[11px] md:text-xs text-red-600/60 leading-[1.6]">
              {guidance.safetyDisclaimer || "This information is for educational purposes only and not a substitute for professional medical advice."}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Bottom Action ─── */}
      <button
        onClick={onClose}
        className="mt-5 md:mt-6 w-full py-3.5 bg-primary text-white font-semibold rounded-xl active:scale-[0.98] transition-transform text-sm hover:opacity-90 shadow-sm flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
        New Search
      </button>

      {guidance.reminderSuggestion.canCreateReminder && showReminder && (
        <ReminderModal
          reminder={{ reason: guidance.reminderSuggestion.reason, suggestedLabel: guidance.reminderSuggestion.suggestedLabel }}
          onDismiss={() => setShowReminder(false)}
        />
      )}
    </div>
  );
}
