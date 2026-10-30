import { useState } from 'react'

export default function ReservationModal({ isOpen, onClose, currentLang = 'IT' }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '20:00',
    guests: '2',
    notes: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-neutral-950 border border-white/15 p-6 sm:p-10 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white text-xl p-2 cursor-pointer transition-colors"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <span className="font-['Alex_Brush'] text-5xl text-amber-200 block">Grazie</span>
            <h3 className="font-['Cormorant_Garamond'] text-3xl font-light tracking-wide text-white">
              {currentLang === 'IT' ? 'Richiesta di Prenotazione Inviata' : 'Reservation Request Sent'}
            </h3>
            <p className="font-sans text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              {currentLang === 'IT'
                ? `Gentile ${formData.name}, la tua prenotazione per ${formData.guests} persone per il ${formData.date || 'giorno selezionato'} alle ${formData.time} è stata registrata. Ti contatteremo al ${formData.email} per la conferma definitiva.`
                : `Dear ${formData.name}, your reservation for ${formData.guests} guests on ${formData.date || 'the selected date'} at ${formData.time} has been received. We will contact you at ${formData.email} for final confirmation.`}
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="bg-white text-black px-8 py-3 text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                {currentLang === 'IT' ? 'Chiudi' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <span className="font-['Alex_Brush'] text-3xl sm:text-4xl text-amber-200 block">
                La Tenda Rossa
              </span>
              <h2 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl tracking-[0.15em] uppercase text-white">
                {currentLang === 'IT' ? 'Prenota il Tuo Tavolo' : 'Reserve Your Table'}
              </h2>
              <div className="w-12 h-[1px] bg-amber-200/50 mx-auto mt-2 mb-3" />
              <p className="text-xs font-sans tracking-wider text-neutral-400 uppercase">
                {currentLang === 'IT' ? 'Alta Ristorazione a Firenze' : 'Haute Cuisine in Florence'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-sans tracking-[0.15em] uppercase text-neutral-400 mb-1">
                    {currentLang === 'IT' ? 'Nome Completo *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-200/70"
                    placeholder="Midhun Chandran"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-sans tracking-[0.15em] uppercase text-neutral-400 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-200/70"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-sans tracking-[0.15em] uppercase text-neutral-400 mb-1">
                    {currentLang === 'IT' ? 'Telefono *' : 'Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-200/70"
                    placeholder="+39 055 123456"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-sans tracking-[0.15em] uppercase text-neutral-400 mb-1">
                    {currentLang === 'IT' ? 'Data *' : 'Date *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-200/70"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-sans tracking-[0.15em] uppercase text-neutral-400 mb-1">
                    {currentLang === 'IT' ? 'Ospiti' : 'Guests'}
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-200/70"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((n) => (
                      <option key={n} value={n}>
                        {n} {currentLang === 'IT' ? (n === 1 ? 'persona' : 'persone') : (n === 1 ? 'guest' : 'guests')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans tracking-[0.15em] uppercase text-neutral-400 mb-1">
                  {currentLang === 'IT' ? 'Orario Preferito' : 'Preferred Time'}
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {['12:30', '13:00', '19:30', '20:00', '20:30', '21:00'].map((timeSlot) => (
                    <button
                      type="button"
                      key={timeSlot}
                      onClick={() => setFormData({ ...formData, time: timeSlot })}
                      className={`py-1.5 text-xs font-sans tracking-wider transition-colors cursor-pointer border ${
                        formData.time === timeSlot
                          ? 'border-amber-200 bg-amber-200/10 text-white font-semibold'
                          : 'border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {timeSlot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans tracking-[0.15em] uppercase text-neutral-400 mb-1">
                  {currentLang === 'IT' ? 'Note o Intolleranze' : 'Notes or Dietary Requests'}
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-200/70"
                  placeholder={currentLang === 'IT' ? 'Es. tavolo vicino alla finestra, celiachia...' : 'e.g. window table, allergies...'}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-white text-black py-3 text-xs font-sans font-semibold tracking-[0.25em] uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  {currentLang === 'IT' ? 'Conferma Prenotazione' : 'Confirm Reservation'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}
