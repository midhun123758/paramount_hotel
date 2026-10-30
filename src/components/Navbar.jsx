import { useState, useEffect } from 'react'

export default function Navbar({ onOpenBooking, currentLang, setCurrentLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'MENU', href: '#menu' },
    { name: 'PRENOTA', href: '#prenota', isBooking: true },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'CONTATTI', href: '#contatti' },
    { name: 'WINE WINDOW', href: '#wine-window' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md py-3 shadow-xl shadow-black/40 border-b border-white/10'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex flex-col items-start group">
          <span className="font-['Alex_Brush'] text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-none group-hover:text-amber-100 transition-colors">
            La Tenda Rossa
          </span>
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.35em] text-white/80 font-light mt-1 uppercase pl-1">
            Firenze
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.isBooking) {
                  e.preventDefault()
                  onOpenBooking()
                }
              }}
              className="text-white/90 hover:text-white text-xs xl:text-sm font-sans tracking-[0.2em] font-medium transition-all duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Header Actions (Language Toggle & PRENOTA Button) */}
        <div className="hidden lg:flex items-center space-x-5">
          {/* Language Switcher */}
          <div className="flex items-center space-x-1.5 text-xs tracking-widest font-sans text-white/70">
            <button
              onClick={() => setCurrentLang('IT')}
              className={`transition-colors cursor-pointer px-1 py-0.5 ${
                currentLang === 'IT' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              IT
            </button>
            <span className="text-white/40">/</span>
            <button
              onClick={() => setCurrentLang('EN')}
              className={`transition-colors cursor-pointer px-1 py-0.5 ${
                currentLang === 'EN' ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Solid White PRENOTA Button */}
          <button
            onClick={onOpenBooking}
            className="bg-white text-black hover:bg-neutral-200 text-xs font-sans font-semibold tracking-[0.2em] px-6 py-2.5 uppercase transition-all duration-200 shadow-sm hover:shadow-white/20 active:scale-95 cursor-pointer"
          >
            Prenota
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button
            onClick={onOpenBooking}
            className="bg-white text-black text-[11px] font-sans font-semibold tracking-[0.15em] px-3.5 py-1.5 uppercase rounded-none"
          >
            Prenota
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false)
                  if (link.isBooking) {
                    e.preventDefault()
                    onOpenBooking()
                  }
                }}
                className="text-white/90 hover:text-white text-sm font-sans tracking-[0.2em] py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs tracking-widest text-white/70">
              <span>LINGUA:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentLang('IT')}
                  className={`px-2 py-1 ${currentLang === 'IT' ? 'bg-white text-black font-bold' : 'text-white'}`}
                >
                  IT
                </button>
                <button
                  onClick={() => setCurrentLang('EN')}
                  className={`px-2 py-1 ${currentLang === 'EN' ? 'bg-white text-black font-bold' : 'text-white'}`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
