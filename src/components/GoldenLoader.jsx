import { useEffect, useState } from 'react'

export default function GoldenLoader({ onFinish }) {
  const [fade, setFade] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    // Force scroll to top right as loader appears
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    // Stay visible briefly for luxury presentation
    const timer = setTimeout(() => {
      setFade(true)
      setTimeout(() => {
        setRemoved(true)
        if (onFinish) onFinish()
      }, 700)
    }, 1200)

    return () => clearTimeout(timer)
  }, [onFinish])

  if (removed) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#021009] transition-opacity duration-700 ease-in-out ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background atmospheric radial glow */}
      <div className="absolute inset-0 bg-radial-[at_center] from-[#042416]/70 via-[#021009]/90 to-[#010804] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center select-none">
        {/* Regal Golden "P" Emblem */}
        <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 mb-6">
          {/* Outer rotating gold dashed ring */}
          <div
            className="absolute inset-0 rounded-full border border-[#d4af37]/30 border-t-[#d4af37] border-r-[#d4af37]/60 animate-spin"
            style={{ animationDuration: '2.5s' }}
          />

          {/* Inner gold glowing border */}
          <div className="absolute inset-2 sm:inset-2.5 rounded-full border border-[#d4af37]/50 shadow-[0_0_30px_rgba(212,175,55,0.35)] flex items-center justify-center bg-[#03160c]/60 backdrop-blur-sm" />

          {/* Golden script "P" */}
          <span className="relative font-['Alex_Brush'] text-6xl sm:text-7xl text-[#d4af37] drop-shadow-[0_4px_18px_rgba(212,175,55,0.85)] animate-pulse">
            P
          </span>
        </div>

        {/* Restaurant Name */}
        <div className="text-center flex flex-col items-center space-y-1">
          <span className="font-['Cormorant_Garamond'] text-xl sm:text-2xl font-bold tracking-[0.28em] text-[#faebd2] uppercase drop-shadow-md">
            Hotel Paramount
          </span>
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.45em] text-[#c59b27] uppercase font-bold">
            Calicut &bull; Kozhikode
          </span>
        </div>

        {/* Elegant Golden Progress Indicator */}
        <div className="w-36 sm:w-44 h-[2px] bg-emerald-950 rounded-full mt-7 overflow-hidden relative border border-emerald-900/50">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#d4af37] to-[#faebd2] w-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}
