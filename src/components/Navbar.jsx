import { useState, useEffect } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'OUR SPECIALS', href: '#specials' },
    { label: 'OFFERS', href: '#offers' },
    { label: 'MENU', href: '#menu' },
    { label: "TODAY'S SELFIES", href: '#selfies' },
    { label: 'OUR FEEDBACK', href: '#feedback' },
    { label: 'CONTACT', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md py-4 shadow-xl border-b border-white/10'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6 sm:py-7'
      } px-6 sm:px-10 lg:px-14 flex items-center justify-between`}
    >
      {/* Left: Original Restaurant Name (Hotel Paramount Calicut) */}
      <a href="#home" className="flex flex-col items-center select-none group text-decoration-none">
        <span className="font-['Alex_Brush'] text-3xl sm:text-4xl lg:text-[42px] text-amber-100 group-hover:text-amber-200 transition-colors tracking-wide leading-none drop-shadow-md">
          Paramount
        </span>
        <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.45em] text-white/90 uppercase font-light mt-1.5 pl-1">
          Hotel &bull; Calicut
        </span>
      </a>

      {/* Center: Desktop Navigation Links (In English) */}
      <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="font-sans text-xs tracking-[0.22em] text-white/90 hover:text-amber-300 uppercase font-medium transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Right: Book a Table CTA button */}
      <div className="hidden lg:flex items-center space-x-5">
        <a
          href="tel:+914952720272"
          className="text-white/80 hover:text-white font-sans text-xs tracking-[0.18em] transition-colors flex items-center space-x-2"
        >
          <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="hidden xl:inline">+91 495 272 0272</span>
        </a>

        <a
          href="#contact"
          className="bg-amber-400 text-black hover:bg-amber-300 font-sans text-xs font-semibold tracking-[0.22em] uppercase px-6 py-2.5 transition-colors duration-200 rounded-none shadow-md cursor-pointer"
        >
          Book a Table
        </a>
      </div>

      {/* Mobile Actions */}
      <div className="flex items-center space-x-3 lg:hidden">
        <a
          href="#contact"
          className="bg-amber-400 text-black font-sans text-[11px] font-semibold tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-none"
        >
          Book
        </a>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-2 focus:outline-none cursor-pointer"
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-neutral-950/95 backdrop-blur-lg border-b border-white/10 px-6 py-6 shadow-2xl flex flex-col space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans text-xs tracking-[0.25em] text-white/90 hover:text-amber-300 uppercase py-2 border-b border-white/5"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between text-xs font-sans tracking-wider text-white/70">
            <span>Calicut &bull; Kozhikode</span>
            <a href="tel:+914952720272" className="text-amber-400 font-medium">
              +91 495 272 0272
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
