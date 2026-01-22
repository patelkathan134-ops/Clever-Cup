import ScrollSequence from "@/components/ScrollSequence";
import GlassCard from "@/components/ui/GlassCard";

export default function Home() {
  return (
    <main className="relative block">
      {/* Background Scroll Animation */}
      <ScrollSequence />

      {/* Content Overlay */}
      <div className="relative z-10 w-full overflow-x-hidden">

        {/* Section 1: The Origin (0-25%) - CENTER */}
        <section className="h-screen w-full flex items-center justify-center snap-start">
          <GlassCard className="max-w-2xl text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#2d2420] mb-4 tracking-tight">
              THE CLEVER CUP
            </h1>
            <p className="text-lg md:text-2xl font-sans font-light text-[#5c4d47] tracking-widest uppercase">
              Sourced from the finest origins
            </p>
          </GlassCard>
        </section>

        {/* Section 2: The Roast (25-50%) - LEFT ALIGNED */}
        <section className="h-screen w-full flex items-center justify-start px-4 md:px-20 snap-start">
          <GlassCard className="max-w-lg text-left">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#2d2420] mb-4">
              PRECISION ROASTING
            </h2>
            <p className="text-lg md:text-xl font-sans text-[#5c4d47]">
              Unlocking the perfect flavor profile
            </p>
          </GlassCard>
        </section>

        {/* Section 3: The Grind (50-75%) - RIGHT ALIGNED */}
        <section className="h-screen w-full flex items-center justify-end px-4 md:px-20 snap-start">
          <GlassCard className="max-w-lg text-right">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#2d2420] mb-4">
              THE PERFECT GRIND
            </h2>
            <p className="text-lg md:text-xl font-sans text-[#5c4d47]">
              Prepared for the ultimate extraction
            </p>
          </GlassCard>
        </section>

        {/* Section 4: The Pour (75-100%) - CENTER BOTTOM */}
        <section className="h-screen w-full flex items-center justify-center snap-start">
          <GlassCard className="text-center flex flex-col items-center gap-8 max-w-2xl">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#2d2420] mb-4">
                EXPERIENCE PERFECTION
              </h2>
              <p className="text-lg md:text-2xl font-sans font-light text-[#5c4d47] uppercase tracking-widest">
                Taste the difference
              </p>
            </div>

            <button className="px-8 py-4 bg-[#2d2420] text-[#e8e7e2] font-sans text-lg tracking-widest uppercase hover:bg-[#c09f80] hover:text-[#2d2420] transition-all duration-500 ease-out border border-[#2d2420]">
              Order Now
            </button>
          </GlassCard>
        </section>

        {/* CONTINUATION SECTION (Curtain effect) */}
        {/* This section has a solid background and higher z-index to scroll OVER the fixed canvas */}
        <div className="relative z-20 bg-[#e8e7e2] w-full py-20 min-h-[50vh]">
          <div className="container mx-auto px-4 text-center">
            <p className="font-serif text-2xl text-[#2d2420] mb-8">Continuing the journey...</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-8 border border-[#2d2420]/10 rounded-xl">
                <h3 className="font-bold text-xl mb-4 text-[#2d2420]">Our Story</h3>
                <p className="text-[#5c4d47]">Discover the heritage behind every bean.</p>
              </div>
              <div className="p-8 border border-[#2d2420]/10 rounded-xl">
                <h3 className="font-bold text-xl mb-4 text-[#2d2420]">Locations</h3>
                <p className="text-[#5c4d47]">Find a Clevers Cup near you.</p>
              </div>
              <div className="p-8 border border-[#2d2420]/10 rounded-xl">
                <h3 className="font-bold text-xl mb-4 text-[#2d2420]">Contact</h3>
                <p className="text-[#5c4d47]">Get in touch with our team.</p>
              </div>
            </div>

            <div className="mt-20 text-[#5c4d47]/60 text-sm">
              © 2024 The Clever Cup. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
