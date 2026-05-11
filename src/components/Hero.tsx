export default function Hero() {
  return (
    <section className="mb-24 mt-8 md:mt-16 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
      <div className="flex-1">
        <h2 className="text-5xl md:text-7xl font-serif text-ink tracking-tight leading-tight mb-6">
          Your thinking partner for healthcare.
        </h2>
        <p className="text-lg md:text-xl text-muted font-sans leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
          An offline-first medicine assistant designed to decode labels, explain side effects, and provide clarity in simple, humanist language.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <button className="bg-primary text-white font-medium px-8 py-3 rounded-md hover:bg-[#a9583e] transition-colors w-full sm:w-auto">
            Get Started
          </button>
          <button className="bg-transparent border border-ink text-ink font-medium px-8 py-3 rounded-md hover:bg-surface-card transition-colors w-full sm:w-auto">
            Learn More
          </button>
        </div>
      </div>
      <div className="flex-1 w-full lg:w-auto">
        {/* Placeholder for an illustration or more content if needed */}
      </div>
    </section>
  );
}
