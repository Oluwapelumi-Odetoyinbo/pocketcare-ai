import { useState } from "react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [onboardingStep, setOnboardingStep] = useState(0);

  const handleNextOnboarding = () => {
    if (onboardingStep < 2) setOnboardingStep(s => s + 1);
    else onComplete();
  };

  const onboardingSlides = [
    {
      title: "Understand your medicine",
      subtitle: "Ask simple questions about medicine labels, warnings, and side effects."
    },
    {
      title: "Built for clarity",
      subtitle: "Save useful guidance offline and access it when internet is poor."
    },
    {
      title: "Safety-first support",
      subtitle: "Educational guidance only. Always contact a doctor or pharmacist for medical decisions."
    }
  ];

  return (
    <div className="flex-1 flex flex-col p-6 animate-in fade-in slide-in-from-right-4 duration-300 items-center justify-center">
      <div className="w-full max-w-[480px] flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 bg-surface-card rounded-full flex items-center justify-center text-primary mb-8 md:w-20 md:h-20 md:mb-10">
          {onboardingStep === 0 && <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          {onboardingStep === 1 && <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
          {onboardingStep === 2 && <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
        </div>
        <h2 className="text-3xl font-bold text-ink mb-4 leading-tight md:text-4xl">
          {onboardingSlides[onboardingStep].title}
        </h2>
        <p className="text-lg text-muted leading-relaxed md:text-xl">
          {onboardingSlides[onboardingStep].subtitle}
        </p>
      </div>
      
      <div className="pb-8 pt-4 w-full max-w-[480px]">
        <div className="flex gap-2 mb-8">
          {[0, 1, 2].map((step) => (
            <div key={step} className={`h-1.5 rounded-full transition-all duration-300 ${step === onboardingStep ? "w-8 bg-primary" : "w-2 bg-muted/30"}`} />
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onComplete}
            className="flex-1 py-4 text-ink font-medium border border-border rounded-[8px] hover:bg-surface-card transition-colors active:scale-95"
          >
            Skip
          </button>
          <button 
            onClick={handleNextOnboarding}
            className="flex-[2] py-4 bg-primary text-white font-medium rounded-[8px] hover:opacity-90 transition-opacity shadow-sm active:scale-95"
          >
            {onboardingStep === 2 ? "Get Started" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
