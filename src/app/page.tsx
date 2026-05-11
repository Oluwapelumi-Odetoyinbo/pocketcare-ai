"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const WORDS = ["Literacy", "Safety", "Clarity", "Guidance", "Knowledge"];

export default function LandingPage() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const deferredPrompt = useRef<Event | null>(null);
  const router = useRouter();

  // Capture the beforeinstallprompt event
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e;
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Word rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % WORDS.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = async () => {
    if (deferredPrompt.current) {
      const prompt = deferredPrompt.current as any;
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      deferredPrompt.current = null;
      // Navigate regardless of install choice
      router.push("/consultation");
    } else {
      // Already installed or prompt not available
      router.push("/consultation");
    }
  };

  return (
    <div 
      className="h-[100dvh] relative overflow-hidden bg-[#f8fbfa] selection:bg-[#9ce3d7]/30 flex flex-col"
      style={{ fontFamily: "'Raleway', sans-serif" }}
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(5, 42, 40, 0.045) 0 1px, transparent 1px 100%),
              repeating-linear-gradient(90deg, rgba(14, 132, 125, 0.035) 0 56px, rgba(255,255,255,0.2) 56px 112px)
            `,
            backgroundSize: '70px 100%, 140px 100%'
          }}
        />
        <div 
          className="absolute top-0 left-0 right-0 h-[42%] bg-gradient-to-r from-transparent via-[rgba(4,50,48,0.035)] to-transparent opacity-80"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 58%, 94% 58%, 94% 73%, 88% 73%, 88% 43%, 82% 43%, 82% 65%, 74% 65%, 74% 48%, 68% 48%, 68% 80%, 60% 80%, 60% 46%, 54% 46%, 54% 68%, 47% 68%, 47% 38%, 40% 38%, 40% 76%, 31% 76%, 31% 50%, 25% 50%, 25% 65%, 18% 65%, 18% 36%, 12% 36%, 12% 70%, 5% 70%, 5% 48%, 0 48%)'
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 max-w-[1180px] w-full mx-auto pt-5 md:pt-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 text-[16px] sm:text-[18px] font-bold tracking-[-0.04em]">
          <div className="w-[40px] h-[26px] sm:w-[47px] sm:h-[31px] relative">
            <span className="absolute left-[2px] top-[3px] sm:left-[3px] sm:top-[4px] w-[18px] h-[21px] sm:w-[21px] sm:h-[25px] bg-[#9ce3d7] border-[1.6px] border-[#101314] -skew-x-[18deg] -rotate-[35deg]" />
            <span className="absolute left-[20px] top-[4px] sm:left-[24px] sm:top-[5px] w-[18px] h-[21px] sm:w-[21px] sm:h-[25px] bg-[#7fd9ca] border-[1.6px] border-[#101314] skew-x-[18deg] rotate-[35deg]" />
          </div>
          <span className="text-[#071514]">Pocketcare AI</span>
        </div>

        <nav className="hidden lg:flex items-center gap-[26px] text-[15px] tracking-[-0.03em] text-[#071514]">
          <a href="#" className="hover:opacity-70 transition-opacity">Product <span className="inline-block w-[7px] h-[7px] ml-1.5 border-r-[1.5px] border-b-[1.5px] border-current rotate-45 -translate-y-[2px]" /></a>
          <a href="#" className="hover:opacity-70 transition-opacity">Customers</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Solutions <span className="inline-block w-[7px] h-[7px] ml-1.5 border-r-[1.5px] border-b-[1.5px] border-current rotate-45 -translate-y-[2px]" /></a>
          <a href="#" className="hover:opacity-70 transition-opacity">FAQ</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Support <span className="inline-block w-[7px] h-[7px] ml-1.5 border-r-[1.5px] border-b-[1.5px] border-current rotate-45 -translate-y-[2px]" /></a>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/consultation" className="hidden sm:inline-flex h-9 px-3.5 items-center justify-center border-[1.5px] border-[#111] text-[14px] font-medium tracking-[-0.03em] hover:bg-[#111]/5 transition-colors text-[#071514]">
            Pricing
          </Link>
          <button 
            onClick={handleGetStarted}
            className="h-8 sm:h-9 pl-3 sm:pl-3.5 pr-0 bg-[#99e7dc] inline-flex items-center justify-center border-[1.5px] border-[#111] text-[13px] sm:text-[14px] tracking-[-0.03em] hover:brightness-95 transition-all text-[#071514] font-bold cursor-pointer"
          >
            Get Started
            <span className="w-[34px] sm:w-[38px] h-full ml-2.5 border-l-[1.5px] border-[#111] inline-flex items-center justify-center text-[20px] sm:text-[22px] leading-none">→</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 px-4 sm:px-10 max-w-[1180px] w-full mx-auto text-center flex-1 flex flex-col items-center overflow-hidden min-h-0">
        
        {/* Text + Buttons */}
        <div className="w-full flex flex-col items-center shrink-0 pt-20 sm:pt-10 md:pt-14">
          <h1 
            className="text-[clamp(34px,8vw,64px)] leading-[1.0] max-w-[900px] mx-auto tracking-[-0.04em] font-bold text-[#071514]"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            <div className="mb-2">
              AI Medicine{" "}
              <span 
                className={`inline-block min-w-[140px] transition-all duration-500 text-[#0F766E] ${fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
              >
                {WORDS[index]}
              </span>
            </div>
            <div>Assistant</div>
          </h1>
          <p 
            className="mt-3 text-[14px] sm:text-[16px] md:text-[17px] tracking-[-0.02em] text-[#071514]/60 max-w-sm sm:max-w-md"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Understand medicine information in simple language. Safe, accurate, and accessible for everyone.
          </p>
          <div className="mt-5 sm:mt-6 flex flex-row justify-center gap-2">
            <button 
              onClick={handleGetStarted}
              className="h-[38px] sm:h-[42px] px-4 sm:px-5 border-[1.5px] border-[#111] inline-flex items-center justify-center text-[13px] sm:text-[14px] font-semibold tracking-[-0.03em] hover:bg-[#111]/5 transition-colors text-[#071514] cursor-pointer"
            >
              Get Started - It&apos;s Free
            </button>
            <Link href="/consultation" className="h-[38px] sm:h-[42px] pl-4 sm:pl-5 pr-0 bg-[#99e7dc] inline-flex items-center justify-center border-[1.5px] border-[#111] text-[13px] sm:text-[14px] font-bold tracking-[-0.03em] hover:brightness-95 transition-all text-[#071514]">
              Launch App
              <span className="w-[38px] sm:w-[44px] h-full ml-3 border-l-[1.5px] border-[#111] inline-flex items-center justify-center text-[22px] sm:text-[26px] leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full flex-1 min-h-0 relative pointer-events-none flex items-end justify-center overflow-visible">
          <picture className="w-full h-full flex items-end justify-center">
            <source
              media="(min-width: 640px)"
              srcSet="https://res.cloudinary.com/dokbfxcxv/image/upload/v1778456767/11165c00-3068-45d1-9f23-ce0e5a97f9a2_ndvyt2.png"
            />
            <img
              src="https://res.cloudinary.com/dokbfxcxv/image/upload/v1778512419/a19c89b7-d7c2-4a05-a194-c76a99547e8f-removebg-preview_d0x1cr.png"
              alt="AI Illustration"
              className="
                w-[135vw]
                max-w-none
                h-auto
                object-contain
                translate-y-6
                sm:w-full
                sm:max-w-[650px]
                sm:translate-y-0
                drop-shadow-[0_0_40px_rgba(69,255,234,0.18)]
              "
            />
          </picture>
        </div>
      </main>
    </div>
  );
}
