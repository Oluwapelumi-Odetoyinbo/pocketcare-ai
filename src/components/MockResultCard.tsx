interface MockResultCardProps {
  onClose: () => void;
}

export default function MockResultCard({ onClose }: MockResultCardProps) {
  return (
    <section className="bg-surface-card rounded-[12px] border border-border p-8 md:p-10 mb-16 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-2">Paracetamol (Panadol)</h3>
          <span className="inline-block bg-canvas border border-border text-ink font-medium px-3 py-1 rounded-[4px] text-xs tracking-wide uppercase">Simple English</span>
        </div>
        <button 
          onClick={onClose} 
          className="text-muted hover:text-ink p-2 -mr-2 rounded-full transition-colors"
          aria-label="Close result"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="space-y-10">
        <div>
          <h4 className="font-bold text-2xl text-ink mb-4">Simple Explanation</h4>
          <p className="text-ink leading-relaxed text-lg bg-canvas p-6 rounded-[8px] border border-border">
            Paracetamol is a common medicine used to treat mild to moderate pain and reduce fever. It is gentle on the stomach compared to some other painkillers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-canvas p-6 rounded-[8px] border border-border">
            <h4 className="font-bold text-xl text-ink mb-4">Common Uses</h4>
            <ul className="list-none text-muted space-y-3 text-base">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Headaches</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Muscle aches</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Fever</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span>Toothaches</li>
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-[8px] border border-danger/20">
            <h4 className="font-bold text-xl text-danger mb-4">Key Warnings</h4>
            <p className="text-danger/90 text-base leading-relaxed">
              <strong className="font-semibold">Do not take more than 4000mg in 24 hours.</strong> Too much can cause severe liver damage. Avoid alcohol while taking this medicine.
            </p>
          </div>
        </div>

        <div className="bg-canvas rounded-[8px] p-6 border border-border">
          <h4 className="font-bold text-xl text-ink mb-3">When to seek help</h4>
          <p className="text-muted text-base leading-relaxed">
            Stop use and contact a doctor if pain gets worse or lasts more than 10 days, or if fever gets worse or lasts more than 3 days.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-ink rounded-[8px] p-6 gap-6">
          <div className="flex items-center gap-4">
            <div className="text-primary-soft shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-xl text-white">Reminder Suggestion</h4>
              <p className="text-slate-400 text-sm mt-1">Take 1-2 tablets every 4 to 6 hours as needed.</p>
            </div>
          </div>
          <button className="text-sm font-medium text-white bg-primary hover:opacity-90 px-6 py-3 rounded-[6px] transition-opacity w-full sm:w-auto text-center whitespace-nowrap">
            Set Reminder
          </button>
        </div>

        <div className="text-sm text-slate-400 border-t border-border pt-6 text-center">
          Generated safely offline by Gemma 4. Always consult a healthcare professional for medical advice.
        </div>
      </div>
    </section>
  );
}
