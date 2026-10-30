import { useState, useEffect } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navItems = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SPECIALS', href: '#specials', id: 'specials' },
    { label: 'OFFERS', href: '#offers', id: 'offers' },
    { label: 'MENU', href: '#menu', id: 'menu' },
    { label: 'SELFIES', href: '#selfies', id: 'selfies' },
    { label: 'REVIEWS', href: '#feedback', id: 'feedback' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ]

  useEffect(() => {
    // If browser restored with #offers or stale hash, clean it to avoid landing on #offers
    if (window.location.hash === '#offers' || window.location.hash === '#home') {
      window.history.replaceState(null, '', window.location.pathname)
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 30)

      // When near the top, ALWAYS keep Home active
      if (scrollY < 140) {
        setActiveSection('home')
        return
      }

      const sectionIds = ['contact', 'feedback', 'selfies', 'menu', 'offers', 'specials', 'about', 'home']
      const checkLine = 220

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= checkLine && rect.bottom >= 100) {
            setActiveSection(id)
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll handler preventing awkward jumps or url hash sticking on #offers
  const handleNavClick = (e, item) => {
    e.preventDefault()
    setActiveSection(item.id)
    setMobileMenuOpen(false)

    if (item.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.replaceState(null, '', window.location.pathname)
      return
    }

    const el = document.getElementById(item.id)
    if (el) {
      const navOffset = 76
      const elementPosition = el.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#021009]/95 backdrop-blur-md py-3.5 shadow-2xl border-b border-[#d4af37]/20'
          : 'bg-gradient-to-b from-[#010a06]/98 via-[#010a06]/75 to-transparent py-5 sm:py-6'
      } px-6 sm:px-10 lg:px-14 flex items-center justify-between`}
    >
      {/* Left: Original Restaurant Name (Hotel Paramount Calicut) */}
      <a
        href="#home"
        onClick={(e) => handleNavClick(e, { id: 'home' })}
        className="flex flex-col items-center select-none group text-decoration-none cursor-pointer"
      >
        <span className="font-['Alex_Brush'] text-3xl sm:text-4xl lg:text-[42px] text-[#d4af37] group-hover:text-[#ecdcb2] transition-colors tracking-wide leading-none drop-shadow-md">
          Paramount
        </span>
        <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.45em] text-[#c59b27] uppercase font-bold mt-1 pl-1">
          Hotel &bull; Calicut
        </span>
      </a>

      {/* Center: Desktop Navigation Links */}
      <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`relative font-sans text-[11px] xl:text-xs tracking-[0.22em] uppercase font-bold transition-all duration-200 py-1 cursor-pointer ${
                isActive
                  ? 'text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.45)]'
                  : 'text-[#ecdcb2]/85 hover:text-[#d4af37]'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full" />
              )}
            </a>
          )
        })}
      </nav>

      {/* Right: Phone Hotline */}
      <div className="hidden lg:flex items-center">
        <a
          href="tel:+914952720272"
          className="group flex items-center space-x-2.5 px-4 py-2 rounded-full border border-[#d4af37]/40 bg-[#041c10]/70 hover:bg-[#d4af37]/15 hover:border-[#d4af37] transition-all duration-300 text-[#ecdcb2] hover:text-[#d4af37] shadow-md shadow-black/40"
          title="Call Hotel Paramount Calicut"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <svg className="w-3.5 h-3.5 text-[#d4af37] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="font-sans text-xs font-semibold tracking-wider">+91 495 272 0272</span>
        </a>
      </div>

      {/* Mobile Actions: Call Button + Hamburger Toggle */}
      <div className="flex items-center space-x-2 lg:hidden">
        <a
          href="tel:+914952720272"
          aria-label="Call Paramount"
          className="p-2 text-[#d4af37] hover:text-[#faebd2] border border-[#d4af37]/40 rounded-full bg-[#041c10]/80 shadow-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#d4af37] p-2 focus:outline-none cursor-pointer border border-[#d4af37]/30 rounded-md bg-[#041c10]/80"
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#021009]/98 backdrop-blur-xl border-b border-[#d4af37]/30 px-6 py-6 shadow-2xl flex flex-col space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`font-sans text-xs tracking-[0.22em] uppercase font-bold py-2.5 px-3 rounded transition-colors flex items-center justify-between border-b border-emerald-950/40 cursor-pointer ${
                  isActive
                    ? 'text-[#d4af37] bg-[#041c10] border-l-2 border-l-[#d4af37]'
                    : 'text-[#ecdcb2]/85 hover:text-[#d4af37]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
              </a>
            )
          })}
          <div className="pt-3 flex items-center justify-between text-xs font-sans tracking-wider text-[#faebd2]">
            <span className="font-semibold text-emerald-300/80">Calicut &bull; Kozhikode</span>
            <a href="tel:+914952720272" className="text-[#d4af37] font-bold">
              +91 495 272 0272
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
