import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroSlider from './components/HeroSlider'
import AboutSection from './components/AboutSection'
import MenuSection from './components/MenuSection'
import WineWindow from './components/WineWindow'
import GallerySection from './components/GallerySection'
import Footer from './components/Footer'
import ReservationModal from './components/ReservationModal'

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('IT')

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-amber-900/60 selection:text-white">
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
      />

      <main>
        {/* Fullscreen Hero Slider matching reference image & background transition */}
        <HeroSlider currentLang={currentLang} />

        {/* About / Heritage Story */}
        <AboutSection currentLang={currentLang} />

        {/* Gourmet Tasting & À La Carte Menu */}
        <MenuSection
          currentLang={currentLang}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* Historic Florentine Wine Window */}
        <WineWindow currentLang={currentLang} />

        {/* Atmosphere & Dish Gallery */}
        <GallerySection currentLang={currentLang} />
      </main>

      {/* Footer & Contacts */}
      <Footer currentLang={currentLang} />

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        currentLang={currentLang}
      />
    </div>
  )
}
