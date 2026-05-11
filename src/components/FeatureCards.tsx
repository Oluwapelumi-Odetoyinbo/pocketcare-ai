export default function FeatureCards() {
  return (
    <section className="grid sm:grid-cols-3 gap-6 mb-24">
      <div className="bg-surface-card p-8 rounded-[12px] border border-[#e0deda] flex flex-col items-start transition-all hover:-translate-y-1 hover:shadow-sm">
        <div className="text-primary mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13l-3 3m0 0l-3-3m3 3V8" /></svg>
        </div>
        <h4 className="font-medium text-ink mb-3 text-lg">Works Anywhere</h4>
        <p className="text-base text-muted leading-relaxed">Functions completely offline. Your data stays securely on your device, always ready when you need it.</p>
      </div>
      <div className="bg-surface-card p-8 rounded-[12px] border border-[#e0deda] flex flex-col items-start transition-all hover:-translate-y-1 hover:shadow-sm">
        <div className="text-primary mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
        <h4 className="font-medium text-ink mb-3 text-lg">Expert Knowledge</h4>
        <p className="text-base text-muted leading-relaxed">Curated medical data ensuring safe, reliable, and verified responses mapped to established guidelines.</p>
      </div>
      <div className="bg-surface-card p-8 rounded-[12px] border border-[#e0deda] flex flex-col items-start transition-all hover:-translate-y-1 hover:shadow-sm">
        <div className="text-primary mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h4 className="font-medium text-ink mb-3 text-lg">Gemma 4 Powered</h4>
        <p className="text-base text-muted leading-relaxed">Smart, local AI designed to break down complex medical terminology into clear, accessible language.</p>
      </div>
    </section>
  );
}
