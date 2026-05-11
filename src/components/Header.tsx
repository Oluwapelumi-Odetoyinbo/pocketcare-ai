export default function Header() {
  return (
    <header className="bg-canvas border-b border-[#e0deda] sticky top-0 z-10 px-6 py-0 h-16 shadow-none flex items-center">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium text-ink flex items-center gap-2 tracking-tight">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L12 22M2 12L22 12M5 5L19 19M5 19L19 5" />
            </svg>
            Pocketcare
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted">
            <a href="#" className="hover:text-ink transition-colors">Product</a>
            <a href="#" className="hover:text-ink transition-colors">Offline Guide</a>
          </nav>
          <button className="text-sm font-medium text-primary hover:text-[#a9583e] transition-colors">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}
