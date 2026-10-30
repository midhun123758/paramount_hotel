export default function AboutSection({ currentLang = 'IT' }) {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#0c0b0b] text-white border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block">
              <span className="font-['Alex_Brush'] text-3xl sm:text-4xl text-amber-200/90 block">
                Tradizione Fiorentina
              </span>
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/60">
                {currentLang === 'IT' ? 'La Nostra Filosofia' : 'Our Philosophy'}
              </span>
            </div>

            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] leading-tight text-white">
              {currentLang === 'IT' ? (
                <>Un viaggio sensoriale nel cuore del Rinascimento</>
              ) : (
                <>A sensory journey in the heart of the Renaissance</>
              )}
            </h2>

            <p className="font-sans text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {currentLang === 'IT' ? (
                <>
                  La Tenda Rossa nasce dalla passione per la purezza dei sapori toscani.
                  Situata a Firenze, fondiamo la maestria dell'alta cucina con materie prime d'eccellenza,
                  selezionate da piccoli produttori biologici locali per regalarvi un'esperienza indimenticabile.
                </>
              ) : (
                <>
                  La Tenda Rossa is born from a devotion to the purity of Tuscan flavours.
                  Located in Florence, we blend high culinary artistry with premier local organic ingredients
                  to deliver an unforgettable sensory dining experience.
                </>
              )}
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10 text-center">
              <div>
                <span className="block font-['Cormorant_Garamond'] text-3xl sm:text-4xl text-amber-200">5★</span>
                <span className="text-[10px] sm:text-xs font-sans tracking-widest text-neutral-400 uppercase">
                  {currentLang === 'IT' ? 'Esperienza' : 'Experience'}
                </span>
              </div>
              <div>
                <span className="block font-['Cormorant_Garamond'] text-3xl sm:text-4xl text-amber-200">450+</span>
                <span className="text-[10px] sm:text-xs font-sans tracking-widest text-neutral-400 uppercase">
                  {currentLang === 'IT' ? 'Etichette Vini' : 'Wine Labels'}
                </span>
              </div>
              <div>
                <span className="block font-['Cormorant_Garamond'] text-3xl sm:text-4xl text-amber-200">1971</span>
                <span className="text-[10px] sm:text-xs font-sans tracking-widest text-neutral-400 uppercase">
                  {currentLang === 'IT' ? 'Fondazione' : 'Founded'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-amber-200/20 p-3 bg-neutral-950/80 shadow-2xl">
              <img
                src="/images/restaurant-dining.jpg"
                alt="Alta Cucina La Tenda Rossa"
                className="w-full h-80 sm:h-96 object-cover filter contrast-105 brightness-95"
              />
              <div className="absolute -bottom-6 -left-6 bg-black/90 border border-white/15 p-4 shadow-xl backdrop-blur-sm hidden sm:block">
                <span className="font-['Alex_Brush'] text-2xl text-amber-200 block">Chef di Cucina</span>
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-neutral-400">
                  Michelin Recommended
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
