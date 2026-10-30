export default function WineWindow({ currentLang = 'IT' }) {
  return (
    <section id="wine-window" className="py-24 sm:py-32 bg-[#0d0c0c] text-white border-t border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image */}
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative border border-amber-200/20 p-2 sm:p-3 bg-neutral-950 shadow-2xl">
              <img
                src="/images/restaurant-interior.jpg"
                alt="Florentine Wine Window Atmosphere"
                className="w-full h-80 sm:h-[420px] object-cover filter contrast-105"
              />
              <div className="absolute top-6 left-6 bg-black/85 border border-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-amber-200 block">
                  Firenze Tradizione
                </span>
                <span className="font-['Cormorant_Garamond'] text-lg text-white">
                  Buchetta del Vino
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div>
              <span className="font-['Alex_Brush'] text-3xl sm:text-4xl text-amber-200 block mb-1">
                La Buchetta Storica
              </span>
              <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-neutral-400">
                Wine Window Experience
              </span>
            </div>

            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] leading-tight text-white">
              {currentLang === 'IT' ? (
                <>Un calice di Chianti affacciato sulla storia di Firenze</>
              ) : (
                <>A glass of Chianti overlooking the history of Florence</>
              )}
            </h2>

            <p className="font-sans text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {currentLang === 'IT' ? (
                <>
                  Le antiche buchette del vino a Firenze risalgono al XVI secolo, nate per permettere
                  ai nobili produttori di vendere fiaschi di vino direttamente ai passanti.
                  Alla Tenda Rossa abbiamo restaurato la nostra buchetta originale: bussa alla finestrella,
                  ordina il tuo calice di Chianti Classico o Bolgheri DOC e brinda all'autentica anima fiorentina.
                </>
              ) : (
                <>
                  Florence's historic wine windows date back to the 16th century, created for noble
                  vintners to sell wine directly to passersby. At La Tenda Rossa, we have preserved our original
                  stone window: knock on the wooden shutter, order your glass of Chianti Classico or Bolgheri DOC,
                  and toast to the authentic Florentine soul.
                </>
              )}
            </p>

            <div className="border-l-2 border-amber-200/60 pl-4 py-2 space-y-1">
              <div className="text-xs font-sans tracking-[0.2em] text-amber-200 uppercase font-medium">
                {currentLang === 'IT' ? 'Orari Buchetta del Vino:' : 'Wine Window Hours:'}
              </div>
              <div className="text-sm font-sans text-neutral-300">
                {currentLang === 'IT' ? 'Tutti i giorni dalle 12:00 alle 23:00' : 'Daily from 12:00 PM to 11:00 PM'}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
