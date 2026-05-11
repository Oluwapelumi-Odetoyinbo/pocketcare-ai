import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div className="flex-1 flex flex-col md:flex-row md:items-center bg-gradient-to-br from-[#F7FBFA] via-white to-[#EAF5F3] relative overflow-hidden animate-in fade-in duration-500">
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-20%] w-[150%] h-[50%] md:w-[80%] md:h-[120%] md:top-[-10%] md:left-[-10%] bg-primary-soft/30 rounded-[100%] blur-3xl opacity-60 pointer-events-none"></div>
      
      {/* Left Content Column (Desktop) / Top Content (Mobile) */}
      <div className="flex-1 flex flex-col z-10 w-full md:w-1/2 md:max-w-xl md:pl-16 lg:pl-24 justify-center">
        {/* Top Header Section */}
        <div className="pt-16 px-6 text-center md:pt-0 md:text-left">
          <h1 className="text-[42px] leading-[1.1] font-extrabold text-ink tracking-tight mb-4 md:text-[56px] lg:text-[64px]">
            Welcome To <br /> Pocketcare AI
          </h1>
          <p className="text-muted text-base font-medium px-4 md:px-0 md:text-lg lg:text-xl md:max-w-md">
            Your Medical Assistant Made Simple.
          </p>
        </div>

        {/* Bottom Buttons Section */}
        <div className="px-6 pb-12 pt-4 flex flex-col gap-4 items-center w-full md:items-start md:pb-0 md:pt-10">
          <button 
            onClick={onComplete}
            className="w-full max-w-[320px] bg-primary hover:opacity-90 text-white font-semibold py-4 px-6 rounded-full transition-opacity shadow-lg flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {/* Sparkles icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            Get Started
          </button>
          
          <button 
            onClick={onComplete}
            className="w-full max-w-[320px] bg-white text-ink font-semibold py-4 px-6 rounded-full transition-colors shadow-sm border border-border flex items-center justify-center gap-3 hover:bg-slate-50 active:scale-[0.98]"
          >
            {/* Folder icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            View Saved Guides
          </button>
          
          <p className="text-sm text-muted font-medium mt-4 cursor-pointer hover:text-ink transition-colors">
            Need help? View Tutorial
          </p>
        </div>
      </div>

      {/* Right Image Column (Desktop) / Center Image (Mobile) */}
      <div className="flex-1 relative flex items-center justify-center my-6 z-10 w-full overflow-hidden md:w-1/2 md:my-0 md:h-full">
        <div className="relative w-[120%] h-[120%] max-w-[500px] md:max-w-none md:w-[130%] md:h-[130%] aspect-square md:aspect-auto flex items-center justify-center">
          <img 
            src="/medical-pills-hand.png" 
            alt="Hand holding medicine" 
            className="w-full h-full object-cover object-center translate-y-4 scale-110 mix-blend-multiply"
          />
        </div>
      </div>

    </div>
  );
}
