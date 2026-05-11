export default function FutureSections() {
  return (
    <section className="bg-canvas rounded-[12px] p-8 md:p-10 border border-muted border-dashed">
      <div className="flex items-center gap-2 mb-8">
        <h3 className="text-sm font-medium text-muted uppercase tracking-widest font-sans">Coming next</h3>
      </div>
      <ul className="grid sm:grid-cols-3 gap-6">
        <li className="flex items-center gap-4 text-ink text-base font-sans bg-surface-card px-6 py-5 rounded-[8px] border border-[#e0deda] transition-transform hover:-translate-y-1 hover:shadow-sm cursor-default">
          <div className="text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          Medicine reminders
        </li>
        <li className="flex items-center gap-4 text-ink text-base font-sans bg-surface-card px-6 py-5 rounded-[8px] border border-[#e0deda] transition-transform hover:-translate-y-1 hover:shadow-sm cursor-default">
          <div className="text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          </div>
          Offline saved guidance
        </li>
        <li className="flex items-center gap-4 text-ink text-base font-sans bg-surface-card px-6 py-5 rounded-[8px] border border-[#e0deda] transition-transform hover:-translate-y-1 hover:shadow-sm cursor-default">
          <div className="text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          Medicine label scan
        </li>
      </ul>
    </section>
  );
}
