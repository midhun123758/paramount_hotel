export default function Footer({ currentLang = 'IT' }) {
  return (
    <footer id="contatti" className="bg-black text-white border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand & columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <span className="font-['Alex_Brush'] text-4xl sm:text-5xl text-white block">
              La Tenda Rossa
            </span>
            <span className="font-sans text-[10px] tracking-[0.35em] text-neutral-400 uppercase block -mt-2">
              Firenze • Ristorante 5 Stelle
            </span>
            <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
              {currentLang === 'IT'
                ? 'Un punto di riferimento per l\'alta ristorazione toscana nel centro storico fiorentino.'
                : 'A benchmark for high Tuscan gastronomy in the historic heart of Florence.'}
            </p>
          </div>

          {/* Col 2: Orari & Apertura */}
          <div className="space-y-3">
            <h4 className="font-['Cormorant_Garamond'] text-xl uppercase tracking-wider text-amber-200">
              {currentLang === 'IT' ? 'Orari di Apertura' : 'Opening Hours'}
            </h4>
            <div className="text-xs font-sans text-neutral-300 space-y-2 font-light">
              <div>
                <span className="text-white block font-medium">
                  {currentLang === 'IT' ? 'Martedì – Domenica:' : 'Tuesday – Sunday:'}
                </span>
                <span>{currentLang === 'IT' ? 'Pranzo: 12:30 – 15:00' : 'Lunch: 12:30 PM – 3:00 PM'}</span>
                <br />
                <span>{currentLang === 'IT' ? 'Cena: 19:30 – 23:30' : 'Dinner: 7:30 PM – 11:30 PM'}</span>
              </div>
              <div>
                <span className="text-amber-200/80 block font-medium">
                  {currentLang === 'IT' ? 'Lunedì: Chiuso' : 'Monday: Closed'}
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Posizione e Contatti */}
          <div className="space-y-3">
            <h4 className="font-['Cormorant_Garamond'] text-xl uppercase tracking-wider text-amber-200">
              {currentLang === 'IT' ? 'Posizione & Contatti' : 'Location & Contacts'}
            </h4>
            <div className="text-xs font-sans text-neutral-300 space-y-2 font-light">
              <p>Piazza Santa Croce 14/R<br />50122 Firenze (FI), Italia</p>
              <p>Tel: +39 055 2480111</p>
              <p>Email: info@latendarossa-firenze.it</p>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-['Cormorant_Garamond'] text-xl uppercase tracking-wider text-amber-200">
              Newsletter
            </h4>
            <p className="text-xs font-sans text-neutral-400 font-light">
              {currentLang === 'IT'
                ? 'Ricevi inviti esclusivi per serate a tema con cantine prestigiose.'
                : 'Receive exclusive invitations to fine wine dinners and seasonal releases.'}
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert(currentLang === 'IT' ? 'Grazie per esserti iscritto!' : 'Thank you for subscribing!') }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="email@example.com"
                className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-200"
              />
              <button
                type="submit"
                className="w-full border border-white/60 hover:bg-white hover:text-black text-white text-[11px] font-sans tracking-[0.2em] uppercase py-2 transition-colors cursor-pointer"
              >
                {currentLang === 'IT' ? 'Iscriviti' : 'Subscribe'}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-neutral-500">
          <p>© 2026 La Tenda Rossa Firenze. {currentLang === 'IT' ? 'Tutti i diritti riservati.' : 'All rights reserved.'}</p>
          <div className="flex space-x-6 mt-4 sm:mt-0 tracking-wider">
            <a href="#privacy" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#cookie" className="hover:text-white transition-colors">COOKIE POLICY</a>
            <a href="#credits" className="hover:text-white transition-colors">CREDITS</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
