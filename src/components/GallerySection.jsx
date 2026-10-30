import { useState } from 'react'

export default function GallerySection({ currentLang = 'IT' }) {
  const [selectedImage, setSelectedImage] = useState(null)

  const galleryItems = [
    {
      src: '/images/hero-reference.png',
      caption: currentLang === 'IT' ? 'La Sala Principale e il Tavolo Imperiale' : 'Main Dining Room & Imperial Table',
      category: currentLang === 'IT' ? 'Atmosfera' : 'Ambiance',
    },
    {
      src: '/images/restaurant-dining.jpg',
      caption: currentLang === 'IT' ? 'Degustazione e Selezione Vini' : 'Tasting & Wine Pairings',
      category: currentLang === 'IT' ? 'Cucina' : 'Cuisine',
    },
    {
      src: '/images/restaurant-interior.jpg',
      caption: currentLang === 'IT' ? 'L\'Angolo Bar e l\'Arredo Artigianale' : 'Artisanal Bar Lounge & Warm Lights',
      category: currentLang === 'IT' ? 'Design' : 'Design',
    },
  ]

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#090808] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-['Alex_Brush'] text-3xl sm:text-4xl text-amber-200 block mb-1">
            Momenti Indelebili
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-light tracking-[0.12em] uppercase text-white mb-4">
            {currentLang === 'IT' ? 'Galleria' : 'Gallery'}
          </h2>
          <div className="w-16 h-[1px] bg-amber-200/50 mx-auto mb-4" />
          <p className="font-sans text-xs sm:text-sm text-neutral-400 font-light tracking-wide uppercase">
            {currentLang === 'IT' ? 'Uno sguardo all\'eleganza dei nostri spazi' : 'A glimpse into the elegance of our spaces'}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item.src)}
              className="group relative h-72 sm:h-80 overflow-hidden cursor-pointer border border-white/10 bg-neutral-900"
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] font-sans tracking-[0.25em] text-amber-200 uppercase block">
                  {item.category}
                </span>
                <span className="font-['Cormorant_Garamond'] text-lg text-white font-normal block">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-3xl hover:text-amber-200 p-2 cursor-pointer"
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain border border-white/20 shadow-2xl"
          />
        </div>
      )}
    </section>
  )
}
