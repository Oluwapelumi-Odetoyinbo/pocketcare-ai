interface AssistantCardProps {
  onSubmit: (e: React.FormEvent) => void;
}

export default function AssistantCard({ onSubmit }: AssistantCardProps) {
  return (
    <section className="bg-surface-dark rounded-[12px] p-8 md:p-10 mb-16 shadow-none">
      <div className="mb-8">
        <h3 className="text-xl md:text-2xl font-serif text-white mb-2">Start a consultation</h3>
        <p className="text-sm text-muted-soft">Ask about any medication, side effect, or dosage.</p>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="medicine" className="block text-sm font-medium text-white mb-2">
            Medicine Name
          </label>
          <input
            type="text"
            id="medicine"
            placeholder="e.g. Panadol, Ibuprofen, Amoxicillin"
            className="w-full px-4 py-3 rounded-md border-b border-muted bg-surface-dark-elevated text-white placeholder:text-muted-soft focus:outline-none focus:border-primary transition-colors text-base"
            required
          />
        </div>
        
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-white mb-2">
            What do you want to know? <span className="text-muted-soft">(Optional)</span>
          </label>
          <textarea
            id="question"
            rows={3}
            placeholder="e.g. Can I take this after food? What are the side effects?"
            className="w-full px-4 py-3 rounded-md border border-muted bg-surface-dark-elevated text-white placeholder:text-muted-soft focus:outline-none focus:border-primary transition-colors resize-none text-base"
          />
        </div>

        <div>
          <label htmlFor="style" className="block text-sm font-medium text-white mb-2">
            Explanation Style
          </label>
          <div className="relative">
            <select
              id="style"
              className="w-full px-4 py-3 rounded-md border border-muted bg-surface-dark-elevated text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer text-base font-sans"
            >
              <option>Simple English</option>
              <option>Explain like I'm 12</option>
              <option>Pidgin English</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-soft">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-[#a9583e] text-white font-medium py-3 px-6 rounded-md transition-colors flex justify-center items-center gap-2 text-base"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          Ask Pocketcare
        </button>
      </form>
    </section>
  );
}
