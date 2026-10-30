import { useState } from 'react'

export default function MenuSection({ currentLang = 'IT', onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('degustazione')

  const tastingMenus = [
    {
      title: currentLang === 'IT' ? 'Percorso "Rinascimento Fiorentino"' : '"Florentine Renaissance" Tasting',
      courses: currentLang === 'IT' ? '7 Portate d\'Alta Cucina' : '7 Haute Cuisine Courses',
      price: '€ 135',
      winePairing: currentLang === 'IT' ? 'Abbinamento 5 calici: € 65' : '5 Glasses Wine Pairing: € 65',
      description: currentLang === 'IT'
        ? 'Un viaggio attraverso i secoli della cucina toscana, reinterpretata con tecniche contemporanee e materie prime d\'eccezione.'
        : 'A journey through centuries of Tuscan cuisine, reinterpreted with contemporary techniques and exceptional ingredients.',
      items: [
        'Tartare di Chianina IGP, tuorlo d\'uovo marinato al tartufo nero',
        'Tortelli di fagiano con crema di pecorino di Pienza e riduzione di Vin Santo',
        'Filetto di manzo toscano, spugnole e salsa al Brunello di Montalcino',
        'Mousse di cioccolato fondente Amedei al sale di Volterra e gelato all\'olio EVO',
      ],
    },
    {
      title: currentLang === 'IT' ? 'Percorso "Terra & Vigna"' : '"Earth & Vineyard" Tasting',
      courses: currentLang === 'IT' ? '5 Portate di Stagione' : '5 Seasonal Courses',
      price: '€ 95',
      winePairing: currentLang === 'IT' ? 'Abbinamento 4 calici: € 45' : '4 Glasses Wine Pairing: € 45',
      description: currentLang === 'IT'
        ? 'Omaggio alle colline del Chianti e alla generosità della terra toscana e dei suoi orti biologici.'
        : 'Tribute to the Chianti hills and the abundance of Tuscan soil and certified organic gardens.',
      items: [
        'Carciofo violetto croccante con spuma di Parmigiano Reggiano 36 mesi',
        'Pici fatti a mano al ragù bianco di cinta senese e finocchietto selvatico',
        'Piccione al tegame in due cotture con polenta soffiata',
        'Zuccotto tradizionale fiorentino con canditi artigianali',
      ],
    },
  ]

  const aLaCarte = [
    {
      category: currentLang === 'IT' ? 'Antipasti' : 'Starters',
      dishes: [
        {
          name: 'Battuta di Chianina al Coltello',
          desc: 'Tartufo nero pregiato, gelato alla senape antica, cialda di pane toscano',
          price: '€ 28',
        },
        {
          name: 'Polpo Arrostito su Crema di Ceci del Valdarno',
          desc: 'Rosmarino bruciato, pomodorini confit e gocce di aceto balsamico tradizionale',
          price: '€ 26',
        },
      ],
    },
    {
      category: currentLang === 'IT' ? 'Primi Piatti' : 'First Courses',
      dishes: [
        {
          name: 'Risotto Carnaroli Riserva al Brunello',
          desc: 'Mantecato al Castelmagno DOP, timo limonato e polvere di alloro',
          price: '€ 32',
        },
        {
          name: 'Ravioli Aperti di Cervo e Ginepro',
          desc: 'Burro di malga affumicato, fondo bruno e mirtilli dell\'Appennino',
          price: '€ 30',
        },
      ],
    },
    {
      category: currentLang === 'IT' ? 'Secondi Piatti' : 'Main Courses',
      dishes: [
        {
          name: 'Bistecca alla Fiorentina da Razza Chianina',
          desc: 'Frollatura 45 giorni, servita su braciere con patate al rosmarino (min. 2 persone)',
          price: '€ 85 / kg',
        },
        {
          name: 'Trancio di Ombrina da Cattura',
          desc: 'Verdurine primaverili croccanti, emulsione al prezzemolo e aria di mare',
          price: '€ 36',
        },
      ],
    },
  ]

  return (
    <section id="menu" className="py-24 sm:py-32 bg-[#090808] text-white border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-['Alex_Brush'] text-3xl sm:text-4xl text-amber-200 block mb-1">
            Esperienza Gourmet
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-light tracking-[0.12em] uppercase text-white mb-4">
            {currentLang === 'IT' ? 'Il Nostro Menù' : 'Our Menu'}
          </h2>
          <div className="w-16 h-[1px] bg-amber-200/50 mx-auto mb-6" />
          <p className="font-sans text-sm sm:text-base text-neutral-400 font-light">
            {currentLang === 'IT'
              ? 'Ingredienti selezionati con rispetto del ciclo naturale delle stagioni e dei sapori autentici di Firenze.'
              : 'Ingredients selected with strict respect for natural seasonal cycles and authentic Florentine flavours.'}
          </p>

          {/* Navigation Tabs */}
          <div className="inline-flex p-1 mt-8 rounded-none border border-white/15 bg-neutral-900/60 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('degustazione')}
              className={`px-6 py-2.5 text-xs font-sans tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'degustazione'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {currentLang === 'IT' ? 'Percorsi Degustazione' : 'Tasting Menus'}
            </button>
            <button
              onClick={() => setActiveTab('alacarte')}
              className={`px-6 py-2.5 text-xs font-sans tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'alacarte'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              À La Carte
            </button>
          </div>
        </div>

        {/* Tab 1: Tasting Menus */}
        {activeTab === 'degustazione' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {tastingMenus.map((menu, idx) => (
              <div
                key={idx}
                className="bg-neutral-950/70 border border-white/10 p-8 sm:p-10 flex flex-col justify-between hover:border-amber-200/40 transition-colors duration-300"
              >
                <div>
                  <div className="flex justify-between items-baseline border-b border-white/10 pb-4 mb-4">
                    <span className="text-xs font-sans tracking-[0.25em] uppercase text-amber-200">
                      {menu.courses}
                    </span>
                    <span className="font-['Cormorant_Garamond'] text-3xl font-light text-white">
                      {menu.price}
                    </span>
                  </div>

                  <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-normal text-white mb-2">
                    {menu.title}
                  </h3>
                  <p className="text-xs font-sans tracking-wider text-neutral-400 mb-6 italic">
                    {menu.winePairing}
                  </p>
                  <p className="text-sm font-sans text-neutral-300 leading-relaxed mb-6 font-light">
                    {menu.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <span className="text-[11px] font-sans tracking-[0.2em] text-neutral-400 uppercase block mb-2">
                      {currentLang === 'IT' ? 'Esempi di Portate:' : 'Selected Courses:'}
                    </span>
                    {menu.items.map((item, i) => (
                      <div key={i} className="flex items-start text-xs sm:text-sm text-neutral-300 font-light">
                        <span className="text-amber-200/70 mr-2.5">♦</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={onOpenBooking}
                    className="w-full border border-white/70 hover:bg-white hover:text-black text-white text-xs font-sans tracking-[0.25em] uppercase py-3 transition-colors cursor-pointer"
                  >
                    {currentLang === 'IT' ? 'Prenota Questo Percorso' : 'Reserve This Menu'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: À La Carte */}
        {activeTab === 'alacarte' && (
          <div className="space-y-12 max-w-4xl mx-auto">
            {aLaCarte.map((section, idx) => (
              <div key={idx} className="bg-neutral-950/60 border border-white/10 p-6 sm:p-8">
                <h3 className="font-['Cormorant_Garamond'] text-2xl text-amber-200 uppercase tracking-widest border-b border-white/10 pb-3 mb-6">
                  {section.category}
                </h3>
                <div className="space-y-6">
                  {section.dishes.map((dish, dIdx) => (
                    <div key={dIdx} className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1">
                      <div>
                        <div className="font-['Cormorant_Garamond'] text-lg sm:text-xl text-white font-normal">
                          {dish.name}
                        </div>
                        <div className="text-xs sm:text-sm font-sans text-neutral-400 font-light mt-0.5">
                          {dish.desc}
                        </div>
                      </div>
                      <div className="font-['Cormorant_Garamond'] text-lg sm:text-xl text-amber-200 font-light whitespace-nowrap">
                        {dish.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
