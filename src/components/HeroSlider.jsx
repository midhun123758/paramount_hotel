import { useState, useEffect, useRef } from 'react'

export default function HeroSlider({ currentLang = 'IT' }) {
  const slides = [
    {
      id: 1,
      image: '/images/hero-reference.png',
      alt: 'La Tenda Rossa Firenze - Sala e Ristorante',
      subtitle: currentLang === 'IT' ? 'ESPERIENZA GASTRONOMICA' : 'FINE GASTRONOMIC EXPERIENCE',
    },
    {
      id: 2,
      image: '/images/restaurant-dining.jpg',
      alt: 'Alta Cucina e Vini Pregiati',
      subtitle: currentLang === 'IT' ? 'TRADIZIONE E INNOVAZIONE' : 'TRADITION & INNOVATION',
    },
    {
      id: 3,
      image: '/images/restaurant-interior.jpg',
      alt: 'Atmosfera e Design Fiorentino',
      subtitle: currentLang === 'IT' ? 'ATMOSFERA ESCLUSIVA' : 'EXCLUSIVE AMBIANCE',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)

  // Auto-slide transition: "the background image should come after the other"
  useEffect(() => {
    if (isPaused) return

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, slides.length])

  const goToSlide = (idx) => {
    setCurrentIndex(idx)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-black select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Cross-fade & Ken Burns Zoom */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div
              className={`w-full h-full bg-cover bg-center transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label={slide.alt}
            />
            {/* Dark Vignette & Mood Overlay matching the reference image */}
            <div className="absolute inset-0 bg-black/45 bg-gradient-to-t from-black/85 via-black/35 to-black/65" />
          </div>
        )
      })}

      {/* Hero Center Text Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Main Italian Luxury Heading */}
        <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white uppercase tracking-[0.14em] sm:tracking-[0.18em] leading-tight sm:leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] max-w-4xl">
          {currentLang === 'IT' ? (
            <>
              <span className="block mb-2 md:mb-3">Oltre il cibo, il piacere</span>
              <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.12em] text-white/95">
                di un attimo perfetto
              </span>
            </>
          ) : (
            <>
              <span className="block mb-2 md:mb-3">Beyond food, the pleasure</span>
              <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.12em] text-white/95">
                of a perfect moment
              </span>
            </>
          )}
        </h1>

        {/* Center Outlined CTA Button matching reference image: SCOPRI IL MENÙ */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <a
            href="#menu"
            className="inline-block border border-white/90 text-white hover:bg-white hover:text-black font-sans text-xs sm:text-sm font-medium tracking-[0.28em] uppercase px-7 sm:px-9 py-3 sm:py-3.5 transition-all duration-300 shadow-lg hover:shadow-white/20 active:scale-95 cursor-pointer backdrop-blur-[2px]"
          >
            {currentLang === 'IT' ? 'Scopri il menù' : 'Discover the menu'}
          </a>
        </div>
      </div>

      {/* Left / Right Subtle Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-6 z-20 text-white/40 hover:text-white p-3 transition-colors cursor-pointer group"
      >
        <svg
          className="w-8 h-8 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden md:flex absolute right-6 z-20 text-white/40 hover:text-white p-3 transition-colors cursor-pointer group"
      >
        <svg
          className="w-8 h-8 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bottom Center Indicator Dots matching reference screenshot */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-3">
        {slides.map((_, index) => {
          const isActive = index === currentIndex
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? 'w-2.5 h-2.5 bg-white scale-125'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          )
        })}
      </div>
    </section>
  )
}
