import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import GoldenLoader from './components/GoldenLoader'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api'

// Fallback specials if backend is not actively running
const DEFAULT_SPECIALS = [
  {
    id: 1,
    name: 'Calicut Special Beef Biryani',
    food_type: 'Biryani',
    regular_price: 220,
    special_price: 189,
    savings: 31,
    description: "Chef's Special: Authentic Calicut Dum Beef Biryani with fragrant Jeerakasala kaima rice, served with complimentary mint raita & date pickle!",
    image_url: '/images/beef_biryani.jpg',
  },
  {
    id: 2,
    name: 'Paramount Special Beef Roast',
    food_type: 'Curry',
    regular_price: 230,
    special_price: 199,
    savings: 31,
    description: 'Special Combo: Signature slow-roasted beef with fresh coconut slices & spices, served with 2 hot flaky Malabar porottas!',
    image_url: '/images/beef_roast.jpg',
  },
  {
    id: 3,
    name: 'Chicken Al Faham (Full)',
    food_type: 'Grill',
    regular_price: 460,
    special_price: 399,
    savings: 61,
    description: 'Charcoal Grilled Special: Whole succulent Al Faham chicken served with 3 warm kuboos, authentic garlic toum & salad.',
    image_url: '/images/chicken_al_faham.jpg',
  },
]

// Fallback foods
const DEFAULT_FOODS = [
  {
    id: 1,
    name: 'Calicut Special Beef Biryani',
    food_type: 'Biryani',
    price: 220,
    description: 'Fragrant Jeerakasala kaima rice layered with tender beef pieces, caramelized onions, and secret Calicut spices.',
    image_url: '/images/beef_biryani.jpg',
    is_available: true,
  },
  {
    id: 2,
    name: 'Malabar Chicken Dum Biryani',
    food_type: 'Biryani',
    price: 210,
    description: 'Classic Calicut style chicken biryani cooked on slow dum, served with pickle, raita and chammanthi.',
    image_url: '/images/chicken_biryani.jpg',
    is_available: true,
  },
  {
    id: 3,
    name: 'Mutton Dum Biryani',
    food_type: 'Biryani',
    price: 330,
    description: 'Rich and flavorful biryani prepared with succulent mutton cuts and authentic Malabar whole spices.',
    image_url: '/images/beef_biryani.jpg',
    is_available: true,
  },
  {
    id: 6,
    name: 'Paramount Special Beef Roast',
    food_type: 'Curry',
    price: 230,
    description: 'Slow-roasted beef cubes tossed with black pepper, fried coconut slices, curry leaves, and rich gravy.',
    image_url: '/images/beef_roast.jpg',
    is_available: true,
  },
  {
    id: 9,
    name: 'Kerala Beef Fry (BFF)',
    food_type: 'Starter',
    price: 240,
    description: 'Crispy fried beef chunks with crunchy coconut pieces, garlic, green chillies, and curry leaves.',
    image_url: '/images/beef_roast.jpg',
    is_available: true,
  },
  {
    id: 11,
    name: 'Malabar Porotta',
    food_type: 'Breads',
    price: 20,
    description: 'Layered, flaky and crispy handmade Kerala porotta made fresh on the griddle.',
    image_url: '/images/beef_roast.jpg',
    is_available: true,
  },
  {
    id: 14,
    name: 'Chicken Al Faham (Full)',
    food_type: 'Grill',
    price: 460,
    description: 'Succulent whole chicken marinated in Arabian spices and charcoal grilled to perfection.',
    image_url: '/images/chicken_al_faham.jpg',
    is_available: true,
  },
  {
    id: 16,
    name: 'Kuzhimandhi Chicken (Quarter)',
    food_type: 'Mandhi',
    price: 220,
    description: 'Smoky aromatic basmati rice infused with whole spices and tender pit-cooked chicken.',
    image_url: '/images/chicken_biryani.jpg',
    is_available: true,
  },
  {
    id: 18,
    name: 'Karimeen Pollichathu',
    food_type: 'Seafood',
    price: 380,
    description: 'Pearl spot fish wrapped in fresh banana leaves with spicy shallot masala and pan-fried.',
    image_url: '/images/beef_roast.jpg',
    is_available: true,
  },
  {
    id: 20,
    name: 'Paramount Special Falooda',
    food_type: 'Dessert',
    price: 150,
    description: 'Layered falooda with vermicelli, basil seeds, fruits, dry fruits, and double scoops of ice cream.',
    image_url: '/images/falooda.jpg',
    is_available: true,
  },
  {
    id: 22,
    name: 'Sulaimani',
    food_type: 'Beverage',
    price: 25,
    description: 'Refreshing traditional Calicut black tea infused with cardamom, fresh mint, and lemon.',
    image_url: '/images/sulaimani.jpg',
    is_available: true,
  },
]

// Fallback guest selfies if backend is not actively running
const DEFAULT_SELFIES = [
  {
    id: 1,
    customer_name: 'Shabeer & Family',
    caption: 'Unforgettable lunch at Paramount Calicut! That Beef Biryani was next level.',
    image_url: '/images/restaurant-dining.jpg',
    likes_count: 24,
    created_at: 'Today, 1:30 PM',
  },
  {
    id: 2,
    customer_name: 'Arjun & Friends',
    caption: 'Sunday Al Faham & Malabar Porotta feast at Paramount! Best vibes in Kozhikode.',
    image_url: '/images/restaurant-interior.jpg',
    likes_count: 18,
    created_at: 'Today, 12:15 PM',
  },
  {
    id: 3,
    customer_name: 'Ananya & Diya',
    caption: 'Best Falooda & Sulaimani after our Kozhikode beach walk. Love the ambiance!',
    image_url: '/images/restaurant-dining.jpg',
    likes_count: 31,
    created_at: 'Today, 3:45 PM',
  },
]

export default function App() {
  const heroImages = [
    '/images/restaurant-dining.jpg',
    '/images/restaurant-interior.jpg',
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [specials, setSpecials] = useState(DEFAULT_SPECIALS)
  const [foods, setFoods] = useState(DEFAULT_FOODS)
  const [selectedType, setSelectedType] = useState('ALL')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Refs for two-part side scrolling setup
  const part1Ref = useRef(null)
  const part2Ref = useRef(null)
  const singleRowRef = useRef(null)

  const scrollTrack = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -350 : 350
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Guest Selfies state
  const [selfies, setSelfies] = useState(DEFAULT_SELFIES)
  const [selfieModalOpen, setSelfieModalOpen] = useState(false)
  const [selfieForm, setSelfieForm] = useState({ customer_name: '', caption: '', image: null })
  const [selfiePreview, setSelfiePreview] = useState(null)
  const [selfieUploading, setSelfieUploading] = useState(false)
  const [selfieSuccess, setSelfieSuccess] = useState(false)
  const [selfieError, setSelfieError] = useState('')
  const [likedSelfieIds, setLikedSelfieIds] = useState(new Set())

  // Feedback form state
  const [feedbacks, setFeedbacks] = useState([
    {
      name: 'Dr. Faisal Rahman',
      rating: 5,
      comment: 'The Calicut Special Beef Biryani at Paramount is unmatched. The kaima rice aroma and tender beef melts in the mouth.',
      date: 'Yesterday',
    },
    {
      name: 'Ananya Nair',
      rating: 5,
      comment: 'Their beef roast paired with hot flaky porottas is a heavenly combination. Must visit when in Kozhikode!',
      date: '3 days ago',
    },
    {
      name: 'Rashid K.',
      rating: 5,
      comment: 'Best Al Faham in Calicut! Juicy, smoky, and authentic garlic dip. Great hospitality from Paramount team.',
      date: '1 week ago',
    },
  ])
  const [feedbackInput, setFeedbackInput] = useState({ name: '', comment: '', rating: 5 })
  const [feedbackSuccess, setFeedbackSuccess] = useState(false)

  // Booking form state
  const [booking, setBooking] = useState({ name: '', phone: '', guests: '2', date: '', time: '' })
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Background carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  // Prevent browser restoring scroll at #offers or stale anchor on fresh page load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  const [restaurant, setRestaurant] = useState({
    name: 'Paramount',
    location: 'Calicut',
    phone: '+91 495 272 0272',
    description: 'Legendary culinary destination in Calicut renowned for its world-famous Calicut Dum Biryani, mouth-watering Beef Roast, flaky Malabar Porottas, fresh Arabian grills, and seafood delicacies.',
  })

  // Fetch specials, foods, and restaurant details from Django backend
  useEffect(() => {
    // 1. Fetch Restaurant Details
    fetch(`${API_BASE}/restaurant/`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.restaurant) {
          setRestaurant(data.restaurant)
        }
      })
      .catch(() => {})

    // 2. Fetch Today's Specials
    fetch(`${API_BASE}/specials/`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.specials && data.specials.length > 0) {
          setSpecials(data.specials)
        }
      })
      .catch(() => {})

    // 3. Fetch Full Food Menu
    fetch(`${API_BASE}/foods/`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.foods && data.foods.length > 0) {
          setFoods(data.foods)
        }
      })
      .catch(() => {})

    // 4. Fetch Guest Selfies
    fetch(`${API_BASE}/selfies/`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.selfies && data.selfies.length > 0) {
          setSelfies(data.selfies)
        }
      })
      .catch(() => {})
  }, [])

  // Like a guest selfie
  const handleLikeSelfie = async (selfieId) => {
    if (likedSelfieIds.has(selfieId)) return
    setLikedSelfieIds((prev) => new Set(prev).add(selfieId))

    // Optimistic UI update
    setSelfies((prev) =>
      prev.map((s) => (s.id === selfieId ? { ...s, likes_count: (s.likes_count || 0) + 1 } : s))
    )

    try {
      await fetch(`${API_BASE}/selfies/${selfieId}/like/`, { method: 'POST' })
    } catch {
      // ignore
    }
  }

  // Handle selfie file selection and preview
  const handleSelfieFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelfieForm((prev) => ({ ...prev, image: file }))
      const url = URL.createObjectURL(file)
      setSelfiePreview(url)
      setSelfieError('')
    }
  }

  // Submit new guest selfie
  const handleSelfieSubmit = async (e) => {
    e.preventDefault()
    if (!selfieForm.image) {
      setSelfieError('Please select or capture a selfie photo!')
      return
    }
    if (!selfieForm.customer_name.trim()) {
      setSelfieError('Please enter your name!')
      return
    }

    setSelfieUploading(true)
    setSelfieError('')

    try {
      const formData = new FormData()
      formData.append('customer_name', selfieForm.customer_name.trim())
      formData.append('caption', selfieForm.caption.trim())
      formData.append('image', selfieForm.image)

      const res = await fetch(`${API_BASE}/selfies/`, {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        if (data && data.selfie) {
          setSelfies((prev) => [data.selfie, ...prev])
        }
        setSelfieSuccess(true)
        setSelfieForm({ customer_name: '', caption: '', image: null })
        setSelfiePreview(null)
        setTimeout(() => {
          setSelfieSuccess(false)
          setSelfieModalOpen(false)
        }, 2200)
      } else {
        const errData = await res.json().catch(() => ({}))
        setSelfieError(errData.error || 'Failed to upload selfie. Please try again.')
      }
    } catch {
      // Local fallback in case backend is offline
      const localSelfie = {
        id: Date.now(),
        customer_name: selfieForm.customer_name,
        caption: selfieForm.caption || 'Dining at Paramount Calicut!',
        image_url: selfiePreview || '/images/restaurant-dining.jpg',
        likes_count: 1,
        created_at: 'Just now',
      }
      setSelfies((prev) => [localSelfie, ...prev])
      setSelfieSuccess(true)
      setSelfieForm({ customer_name: '', caption: '', image: null })
      setSelfiePreview(null)
      setTimeout(() => {
        setSelfieSuccess(false)
        setSelfieModalOpen(false)
      }, 2200)
    } finally {
      setSelfieUploading(false)
    }
  }

  // Live product details fetcher from backend API when clicked
  const handleOpenProduct = (item) => {
    setSelectedProduct(item)
    const foodId = item.food_id || item.id
    fetch(`${API_BASE}/foods/${foodId}/`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.food) {
          setSelectedProduct((prev) => ({
            ...prev,
            ...data.food,
            savings: data.food.today_special ? data.food.today_special.discount_amount : (prev?.savings || 0),
            special_price: data.food.today_special ? data.food.today_special.special_price : prev?.special_price,
            related_items: data.food.related_items || [],
          }))
        }
      })
      .catch(() => {})
  }

  // Categories list
  const foodTypes = ['ALL', ...Array.from(new Set(foods.map((f) => f.food_type))).filter(Boolean)]

  // Filtered foods with name, category, description, and amount/price search
  const filteredFoods = foods.filter((f) => {
    const matchesType = selectedType === 'ALL' || f.food_type?.toLowerCase() === selectedType.toLowerCase()
    if (!matchesType) return false

    const rawQuery = searchQuery.trim().toLowerCase()
    if (!rawQuery) return true

    // 1. Budget/Price range queries: "under 200", "below 250", "< 300", "<= 200"
    const underMatch = rawQuery.match(/(?:under|below|max|upto|up to|<|<=)\s*(\d+)/i)
    if (underMatch) {
      const maxPrice = Number(underMatch[1])
      const textPart = rawQuery.replace(underMatch[0], '').trim()
      const priceCondition = Number(f.price) <= maxPrice
      if (textPart) {
        return (
          priceCondition &&
          (f.name?.toLowerCase().includes(textPart) ||
            f.food_type?.toLowerCase().includes(textPart) ||
            f.description?.toLowerCase().includes(textPart))
        )
      }
      return priceCondition
    }

    // 2. Minimum price queries: "above 200", "over 200", "> 200", ">= 200"
    const aboveMatch = rawQuery.match(/(?:above|over|min|from|>|>=)\s*(\d+)/i)
    if (aboveMatch) {
      const minPrice = Number(aboveMatch[1])
      const textPart = rawQuery.replace(aboveMatch[0], '').trim()
      const priceCondition = Number(f.price) >= minPrice
      if (textPart) {
        return (
          priceCondition &&
          (f.name?.toLowerCase().includes(textPart) ||
            f.food_type?.toLowerCase().includes(textPart) ||
            f.description?.toLowerCase().includes(textPart))
        )
      }
      return priceCondition
    }

    // 3. Multi-term or direct amount search (e.g. "220", "rs 220", "biryani 220")
    const normalizedQuery = rawQuery.replace(/(?:rs\.?|inr|₹)\s*(\d+)/gi, '$1')
    const tokens = normalizedQuery.split(/\s+/).filter(Boolean)

    return tokens.every((token) => {
      if (/^\d+$/.test(token)) {
        return String(f.price) === token || String(f.price).includes(token)
      }
      return (
        f.name?.toLowerCase().includes(token) ||
        f.food_type?.toLowerCase().includes(token) ||
        f.description?.toLowerCase().includes(token)
      )
    })
  })

  // Partition for "ALL" into a two-part side-scrolling setup
  const mainCategories = ['Biryani', 'Mandhi', 'Grill', 'Curry', 'Seafood', 'Starter', 'Main Course', 'Rice']
  let part1Foods = filteredFoods.filter((f) =>
    mainCategories.some((cat) => f.food_type?.toLowerCase() === cat.toLowerCase())
  )
  let part2Foods = filteredFoods.filter(
    (f) => !mainCategories.some((cat) => f.food_type?.toLowerCase() === cat.toLowerCase())
  )

  // Fallback: If either part is empty, evenly split
  if (part1Foods.length === 0 || part2Foods.length === 0) {
    const half = Math.ceil(filteredFoods.length / 2)
    part1Foods = filteredFoods.slice(0, half)
    part2Foods = filteredFoods.slice(half)
  }

  // Consistent Luxury Food Card renderer
  const renderFoodCard = (item) => (
    <div
      key={item.id || item.food_id}
      onClick={() => handleOpenProduct(item)}
      className="group bg-[#041c10] border border-emerald-900/60 hover:border-[#d4af37]/70 overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-xl w-[285px] sm:w-[325px] flex-none snap-start rounded-sm"
    >
      {/* Minimal Clean Food Image */}
      <div className="relative h-44 w-full overflow-hidden bg-[#021009]">
        <img
          src={item.image_url || '/images/beef_biryani.jpg'}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
        />
        <div className="absolute top-2.5 right-2.5 bg-[#021009]/85 backdrop-blur-md px-2.5 py-1 border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] shadow">
          Rs. {item.price}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[#c59b27] text-[11px] tracking-widest uppercase font-mono font-bold">
              {item.food_type}
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Available</span>
            </span>
          </div>
          <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#faebd2] mt-1.5 group-hover:text-[#d4af37] transition-colors leading-tight">
            {item.name}
          </h3>
          <p className="text-[#faebd2]/85 text-xs sm:text-[13px] mt-2 font-medium line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#ecdcb2]/60 font-semibold">Calicut</span>
          <span className="text-[#c59b27] group-hover:text-[#d4af37] transition-colors font-bold">
            Details &rarr;
          </span>
        </div>
      </div>
    </div>
  )

  // Submit Feedback
  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    if (!feedbackInput.name.trim() || !feedbackInput.comment.trim()) return
    setFeedbacks([
      {
        name: feedbackInput.name,
        rating: Number(feedbackInput.rating),
        comment: feedbackInput.comment,
        date: 'Just now',
      },
      ...feedbacks,
    ])
    setFeedbackInput({ name: '', comment: '', rating: 5 })
    setFeedbackSuccess(true)
    setTimeout(() => setFeedbackSuccess(false), 4000)
  }

  // Submit Table Booking
  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!booking.name.trim() || !booking.phone.trim()) return
    setBookingSuccess(true)
    setBooking({ name: '', phone: '', guests: '2', date: '', time: '' })
    setTimeout(() => setBookingSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-[#021009] text-[#faebd2] font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Luxury Golden "P" Preloader */}
      <GoldenLoader />

      {/* Top Navbar */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Carousel Background Images with increased brightness and vibrancy */}
        {heroImages.map((img, idx) => {
          const isActive = idx === currentSlide
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div
                className={`w-full h-full bg-cover bg-center transition-transform duration-[7000ms] ease-out brightness-125 contrast-105 saturate-110 ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{ backgroundImage: `url(${img})` }}
              />
              {/* Deep dark green gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#021009] via-[#021009]/30 to-[#010804]/55" />
              <div className="absolute inset-0 bg-radial-[at_center] from-[#021009]/20 via-transparent to-[#010804]/60 pointer-events-none" />
            </div>
          )
        })}

        {/* Hero Center Content */}
        <div className="relative z-20 w-full max-w-5xl px-6 sm:px-10 text-center flex flex-col items-center">
          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-[0.12em] leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.95)]">
            <span className="block mb-2 text-[#d4af37] font-bold tracking-[0.14em] drop-shadow-[0_2px_14px_rgba(212,175,55,0.4)]">Taste The Heritage</span>
            <span className="block font-['Alex_Brush'] text-5xl sm:text-7xl md:text-8xl text-[#ecdcb2] capitalize font-normal tracking-normal drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              Hotel Paramount
            </span>
          </h1>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#specials"
              className="gold-gradient-btn font-sans text-xs sm:text-sm font-bold tracking-[0.25em] uppercase px-8 sm:px-10 py-4 shadow-xl shadow-[#d4af37]/25 hover:scale-105 cursor-pointer rounded-sm"
            >
              Our Specials
            </a>
            <a
              href="#menu"
              className="bg-[#041c10]/70 hover:bg-[#d4af37] hover:text-stone-950 border border-[#d4af37]/60 text-[#ecdcb2] font-sans text-xs sm:text-sm font-bold tracking-[0.25em] uppercase px-8 sm:px-10 py-4 transition-all duration-300 backdrop-blur-md hover:scale-105 cursor-pointer rounded-sm shadow-xl"
            >
              Explore Menu
            </a>
          </div>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-[#d4af37]' : 'w-2 bg-[#d4af37]/40 hover:bg-[#d4af37]/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-b border-emerald-950">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: About Text & Heritage Story */}
          <div>
            <span className="text-[#c59b27] font-sans text-xs tracking-[0.35em] uppercase font-bold block mb-3">
              The Legend of Calicut Culinary Heritage
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-bold tracking-[0.14em] uppercase text-[#d4af37] leading-tight">
              About Hotel Paramount
            </h2>
            <div className="w-16 h-0.5 bg-[#d4af37] mt-4 mb-6" />

            <p className="text-[#faebd2] text-sm sm:text-base font-medium leading-relaxed mb-6">
              Founded in the historic port city of Kozhikode, Hotel Paramount represents decades of passion for genuine Malabar flavors. We preserve timeless cooking traditions passed down through generations of culinary masters.
            </p>

            <p className="text-[#faebd2]/90 text-xs sm:text-sm font-medium leading-relaxed mb-8">
              From our signature Calicut Dum Biryani cooked with fragrant Jeerakasala kaima rice and secret whole spices, to tender black-pepper beef roast paired with hot flaky porottas, every recipe celebrates authentic Malabar hospitality.
            </p>

            {/* 3 Pillars / Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-900/40">
              <div className="bg-[#041c10] border border-emerald-900/60 p-4 text-center">
                <span className="text-[#d4af37] font-['Cormorant_Garamond'] text-3xl font-bold block">100%</span>
                <span className="text-[#ecdcb2] text-[11px] uppercase tracking-wider font-semibold">Authentic Recipes</span>
              </div>
              <div className="bg-[#041c10] border border-emerald-900/60 p-4 text-center">
                <span className="text-[#d4af37] font-['Cormorant_Garamond'] text-3xl font-bold block">Fresh</span>
                <span className="text-[#ecdcb2] text-[11px] uppercase tracking-wider font-semibold">Local Ingredients</span>
              </div>
              <div className="bg-[#041c10] border border-emerald-900/60 p-4 text-center">
                <span className="text-[#d4af37] font-['Cormorant_Garamond'] text-3xl font-bold block">Master</span>
                <span className="text-[#ecdcb2] text-[11px] uppercase tracking-wider font-semibold">Malabar Chefs</span>
              </div>
            </div>
          </div>

          {/* Right: Clean Showcase Photo with Subtle Luxury Frame */}
          <div className="relative pb-6 sm:pb-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#021009] border border-emerald-900/70 shadow-2xl">
              <img
                src="/images/restaurant-interior.jpg"
                alt="Hotel Paramount Dining Experience"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Ambient Badge */}
            <div className="absolute -bottom-4 left-4 sm:left-6 bg-[#041c10] border border-[#d4af37]/50 p-4 shadow-xl max-w-xs">
              <span className="text-[#d4af37] text-xs font-mono font-bold tracking-widest uppercase block mb-0.5">
                Calicut &bull; Kozhikode
              </span>
              <p className="text-[#faebd2] text-xs font-medium">
                Serving iconic Kozhikode hospitality daily from 11:00 AM to 11:30 PM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SPECIALS SECTION */}
      <section id="specials" className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#c59b27] font-sans text-xs tracking-[0.35em] uppercase font-bold block mb-3">
            Handcrafted Daily by our Master Chefs
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-bold tracking-[0.14em] uppercase text-[#d4af37]">
            Today's Specials
          </h2>
          <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-4 mb-5" />
          <p className="text-[#faebd2] text-sm sm:text-base font-medium leading-relaxed">
            Exclusive dishes prepared fresh today with special promotional pricing. Click on any dish
            to view complete product details and special highlights.
          </p>
        </div>

        {/* Specials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specials.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenProduct(item)}
              className="group bg-[#041c10] border border-emerald-900/70 hover:border-[#d4af37]/70 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer shadow-2xl hover:shadow-[#d4af37]/15 hover:-translate-y-1"
            >
              {/* Minimal Clean Food Image - No cluttered badges over the photo */}
              <div className="relative h-52 w-full overflow-hidden bg-[#021009]">
                <img
                  src={item.image_url || '/images/beef_biryani.jpg'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[#c59b27] text-xs font-mono font-bold tracking-widest uppercase">
                      Special &bull; {item.food_type}
                    </span>
                    {item.savings > 0 && (
                      <span className="text-[11px] text-[#d4af37] font-bold tracking-wider">
                        Save Rs. {item.savings}
                      </span>
                    )}
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold tracking-wide text-[#faebd2] group-hover:text-[#d4af37] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[#faebd2]/90 text-xs sm:text-[13px] font-medium line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-900/40 flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold text-[#d4af37]">
                      Rs. {item.special_price || item.price}
                    </span>
                    {item.regular_price && item.regular_price > (item.special_price || item.price) && (
                      <span className="text-xs text-[#ecdcb2]/50 line-through font-medium">
                        Rs. {item.regular_price}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#c59b27] group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all flex items-center space-x-1 font-bold tracking-wider">
                    <span>Details &rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OFFERS SECTION */}
      <section id="offers" className="py-20 bg-[#03160c] border-y border-emerald-950">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#c59b27] font-sans text-xs tracking-[0.35em] uppercase font-bold block mb-3">
              Special Dining Deals
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-bold tracking-[0.14em] uppercase text-[#d4af37]">
              Exclusive Offers & Combos
            </h2>
            <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-4 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-gradient-to-br from-[#052415] to-[#03160c] border border-emerald-800/60 hover:border-[#d4af37]/60 relative shadow-xl">
              <span className="gold-gradient-btn text-stone-950 text-[10px] font-bold tracking-widest uppercase px-3 py-1 inline-block mb-4">
                Popular Deal
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-2xl text-[#faebd2] font-bold">
                Biryani &amp; Sulaimani Combo
              </h3>
              <p className="text-[#faebd2] text-xs sm:text-[13px] font-medium mt-2 leading-relaxed">
                Order any full Beef or Chicken Biryani and get an authentic hot Calicut Sulaimani tea on the house.
              </p>
              <div className="mt-6 flex items-baseline justify-between border-t border-emerald-900/40 pt-4">
                <span className="text-2xl font-bold text-[#d4af37]">Rs. 220</span>
                <a href="#menu" className="text-xs text-[#d4af37] font-bold hover:text-[#ecdcb2] tracking-wider">
                  Order Now &rarr;
                </a>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-[#052415] to-[#03160c] border border-emerald-800/60 hover:border-[#d4af37]/60 relative shadow-xl">
              <span className="gold-gradient-btn text-stone-950 text-[10px] font-bold tracking-widest uppercase px-3 py-1 inline-block mb-4">
                Malabar Classic
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-2xl text-[#faebd2] font-bold">
                Beef Roast &amp; 3 Porotta Duo
              </h3>
              <p className="text-[#faebd2] text-xs sm:text-[13px] font-medium mt-2 leading-relaxed">
                Paramount's signature black-pepper beef roast paired with 3 freshly tossed flaky Malabar porottas.
              </p>
              <div className="mt-6 flex items-baseline justify-between border-t border-emerald-900/40 pt-4">
                <span className="text-2xl font-bold text-[#d4af37]">Rs. 240</span>
                <a href="#menu" className="text-xs text-[#d4af37] font-bold hover:text-[#ecdcb2] tracking-wider">
                  Order Now &rarr;
                </a>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-[#052415] to-[#03160c] border border-emerald-800/60 hover:border-[#d4af37]/60 relative shadow-xl">
              <span className="gold-gradient-btn text-stone-950 text-[10px] font-bold tracking-widest uppercase px-3 py-1 inline-block mb-4">
                Family Feast
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-2xl text-[#faebd2] font-bold">
                Arabian Grill Platter
              </h3>
              <p className="text-[#faebd2] text-xs sm:text-[13px] font-medium mt-2 leading-relaxed">
                Full Charcoal Al Faham, 4 Kuboos, Garlic Mayo dip, fresh salad, plus 2 Tender Coconut Puddings.
              </p>
              <div className="mt-6 flex items-baseline justify-between border-t border-emerald-900/40 pt-4">
                <span className="text-2xl font-bold text-[#d4af37]">Rs. 580</span>
                <a href="#menu" className="text-xs text-[#d4af37] font-bold hover:text-[#ecdcb2] tracking-wider">
                  Order Now &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MENU SECTION */}
      <section id="menu" className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#c59b27] font-sans text-xs tracking-[0.35em] uppercase font-bold block mb-3">
            Hotel Paramount Signature Offerings
          </span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-bold tracking-[0.14em] uppercase text-[#d4af37]">
            Our Menu
          </h2>
          <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-4 mb-6" />

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search dishes by name or amount (e.g. Biryani, 220, under 200)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#041c10] border border-emerald-800/60 px-4 py-2.5 text-xs text-[#faebd2] placeholder-[#ecdcb2]/40 focus:outline-none focus:border-[#d4af37] tracking-wider font-semibold"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {foodTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 text-xs font-sans tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                selectedType === type
                  ? 'gold-gradient-btn text-stone-950 font-bold shadow'
                  : 'bg-[#041c10] text-[#ecdcb2] hover:text-[#d4af37] border border-emerald-900/60 hover:border-[#d4af37]/50 font-bold'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Foods Display: Two-Part Side-Scrolling Setup for ALL */}
        {selectedType === 'ALL' && !searchQuery.trim() ? (
          <div className="space-y-12">
            {/* PART 1: Mains & Grills */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/40">
                <div className="flex items-baseline space-x-2.5">
                  <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl text-[#d4af37] font-bold">
                    Mains &amp; Grills
                  </h3>
                  <span className="text-xs font-sans text-[#ecdcb2]/50 font-semibold">
                    ({part1Foods.length})
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scrollTrack(part1Ref, 'left')}
                    aria-label="Scroll left"
                    className="w-8 h-8 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] bg-[#041c10] hover:bg-[#d4af37] text-[#d4af37] hover:text-stone-950 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollTrack(part1Ref, 'right')}
                    aria-label="Scroll right"
                    className="w-8 h-8 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] bg-[#041c10] hover:bg-[#d4af37] text-[#d4af37] hover:text-stone-950 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Part 1 Track */}
              <div
                ref={part1Ref}
                className="flex space-x-5 overflow-x-auto scroll-smooth pb-5 pt-1 snap-x snap-mandatory luxury-scrollbar"
              >
                {part1Foods.map((item) => renderFoodCard(item))}
              </div>
            </div>

            {/* PART 2: Breads & Drinks */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/40">
                <div className="flex items-baseline space-x-2.5">
                  <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl text-[#d4af37] font-bold">
                    Breads &amp; Drinks
                  </h3>
                  <span className="text-xs font-sans text-[#ecdcb2]/50 font-semibold">
                    ({part2Foods.length})
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scrollTrack(part2Ref, 'left')}
                    aria-label="Scroll left"
                    className="w-8 h-8 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] bg-[#041c10] hover:bg-[#d4af37] text-[#d4af37] hover:text-stone-950 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollTrack(part2Ref, 'right')}
                    aria-label="Scroll right"
                    className="w-8 h-8 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] bg-[#041c10] hover:bg-[#d4af37] text-[#d4af37] hover:text-stone-950 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Part 2 Track */}
              <div
                ref={part2Ref}
                className="flex space-x-5 overflow-x-auto scroll-smooth pb-5 pt-1 snap-x snap-mandatory luxury-scrollbar"
              >
                {part2Foods.map((item) => renderFoodCard(item))}
              </div>
            </div>
          </div>
        ) : (
          /* Filtered Category / Search Results Track */
          <div className="relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-900/40">
              <div className="flex items-baseline space-x-2.5">
                <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl text-[#d4af37] font-bold">
                  {selectedType !== 'ALL' ? selectedType : 'Results'}
                </h3>
                <span className="text-xs font-sans text-[#ecdcb2]/50 font-semibold">
                  ({filteredFoods.length})
                </span>
              </div>

              {filteredFoods.length > 3 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scrollTrack(singleRowRef, 'left')}
                    aria-label="Scroll left"
                    className="w-8 h-8 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] bg-[#041c10] hover:bg-[#d4af37] text-[#d4af37] hover:text-stone-950 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollTrack(singleRowRef, 'right')}
                    aria-label="Scroll right"
                    className="w-8 h-8 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] bg-[#041c10] hover:bg-[#d4af37] text-[#d4af37] hover:text-stone-950 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div
              ref={singleRowRef}
              className="flex space-x-5 overflow-x-auto scroll-smooth pb-5 pt-1 snap-x snap-mandatory luxury-scrollbar"
            >
              {filteredFoods.map((item) => renderFoodCard(item))}
            </div>
          </div>
        )}

        {filteredFoods.length === 0 && (
          <div className="text-center py-16 text-[#ecdcb2]/80 text-sm font-medium">
            No dishes found matching your search. Try another category!
          </div>
        )}
      </section>

      {/* 5. TODAY'S GUEST SELFIES SECTION */}
      <section id="selfies" className="py-24 bg-[#03160c] border-t border-emerald-950 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-[#c59b27] font-sans text-xs tracking-[0.35em] uppercase font-bold block mb-3">
                Live Dining Moments &bull; Calicut Vibes
              </span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-bold tracking-[0.14em] uppercase text-[#d4af37]">
                Today's Guest Selfies
              </h2>
              <div className="w-16 h-0.5 bg-[#d4af37] mt-4 mb-4" />
              <p className="text-[#faebd2] text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
                Enjoying your meal at Paramount? Click a selfie, upload it directly from your phone or table, and
                get featured instantly on our live restaurant wall!
              </p>
            </div>

            <button
              onClick={() => {
                setSelfieError('')
                setSelfieSuccess(false)
                setSelfieModalOpen(true)
              }}
              className="inline-flex items-center gold-gradient-btn text-stone-950 font-sans text-xs font-bold tracking-[0.2em] uppercase px-7 py-4 shadow-xl shadow-[#d4af37]/20 cursor-pointer transition-all duration-300 self-start md:self-auto hover:scale-105 rounded-sm"
            >
              Upload Your Selfie
            </button>
          </div>

          {/* Selfies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {selfies.map((item) => {
              const isLiked = likedSelfieIds.has(item.id)
              return (
                <div
                  key={item.id}
                  className="group bg-[#041c10] border border-emerald-900/70 hover:border-[#d4af37]/60 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  {/* Photo with aspect-ratio */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#021009]">
                    <img
                      src={item.image_url || '/images/restaurant-dining.jpg'}
                      alt={item.customer_name}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = '/images/restaurant-dining.jpg'
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Live Badge */}
                    <div className="absolute top-3 left-3 bg-[#021009]/90 backdrop-blur-md border border-emerald-700/40 text-[#d4af37] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 flex items-center space-x-1.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{item.created_at || 'Today'}</span>
                    </div>

                    {/* Quick Like Overlay on photo */}
                    <button
                      type="button"
                      onClick={() => handleLikeSelfie(item.id)}
                      className={`absolute bottom-3 right-3 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 transition-all shadow-lg cursor-pointer ${
                        isLiked
                          ? 'bg-red-500 text-white'
                          : 'bg-[#021009]/90 hover:bg-[#021009] text-[#ecdcb2] hover:text-red-400 border border-emerald-700/50'
                      }`}
                      title={isLiked ? 'Liked' : 'Like'}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={isLiked ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="w-3.5 h-3.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                      <span>{item.likes_count || 0}</span>
                    </button>
                  </div>

                  {/* Caption & Info */}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-bold text-xs uppercase">
                          {item.customer_name ? item.customer_name[0] : 'P'}
                        </div>
                        <h4 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#faebd2] tracking-wide">
                          {item.customer_name}
                        </h4>
                      </div>

                      <p className="text-[#faebd2] text-xs sm:text-[13px] font-medium leading-relaxed italic">
                        "{item.caption || 'Dining at Paramount Calicut!'}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between text-[11px] text-[#ecdcb2]/70">
                      <span className="font-semibold">Hotel Paramount &bull; Calicut</span>
                      <button
                        type="button"
                        onClick={() => handleLikeSelfie(item.id)}
                        className={`text-xs font-bold cursor-pointer transition-colors ${
                          isLiked ? 'text-red-400' : 'text-[#d4af37] hover:text-[#ecdcb2]'
                        }`}
                      >
                        {isLiked ? 'Liked' : 'Like'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Clean simple prompt banner below selfies */}
          <div className="mt-12 p-6 sm:p-8 bg-[#041c10] border border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h4 className="text-[#faebd2] text-sm uppercase tracking-wider font-bold">
                Dining at Paramount today?
              </h4>
              <p className="text-[#faebd2] text-xs font-medium mt-1">
                Share your photo with your meal. Every guest photo gets featured on our live restaurant wall.
              </p>
            </div>
            <button
              onClick={() => {
                setSelfieError('')
                setSelfieSuccess(false)
                setSelfieModalOpen(true)
              }}
              className="bg-[#021009] hover:bg-[#052415] text-[#d4af37] border border-[#d4af37]/50 text-xs font-bold tracking-widest uppercase px-6 py-3 transition-colors cursor-pointer whitespace-nowrap shadow"
            >
              Upload Photo
            </button>
          </div>
        </div>
      </section>

      {/* 6. FEEDBACK SECTION */}
      <section id="feedback" className="py-24 bg-[#03160c] border-t border-emerald-950">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#c59b27] font-sans text-xs tracking-[0.35em] uppercase font-bold block mb-3">
              Guest Testimonials
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-bold tracking-[0.14em] uppercase text-[#d4af37]">
              Our Feedback
            </h2>
            <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-4 mb-4" />
            <p className="text-[#faebd2] text-sm sm:text-base font-medium leading-relaxed">
              What Calicut food lovers and travelers say about their experience at Hotel Paramount.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-4">
              {feedbacks.map((item, idx) => (
                <div key={idx} className="bg-[#041c10] border border-emerald-900/70 p-6 flex flex-col justify-between shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-[#faebd2] text-sm tracking-wide">{item.name}</h4>
                      <span className="text-xs text-[#ecdcb2]/60 font-medium">{item.date}</span>
                    </div>
                    {/* Stars */}
                    <div className="flex items-center space-x-1 my-2 text-[#d4af37] text-xs">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <span key={i}>&#9733;</span>
                      ))}
                    </div>
                    <p className="text-[#faebd2] text-xs sm:text-[13px] font-medium leading-relaxed italic">
                      "{item.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Feedback Form */}
            <div className="bg-[#041c10] border border-emerald-800/70 p-6 sm:p-8 flex flex-col justify-center shadow-xl">
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#d4af37] uppercase tracking-wider mb-2">
                Share Your Experience
              </h3>
              <p className="text-[#faebd2]/80 text-xs font-medium mb-6">
                Your feedback helps us maintain the standard of Paramount hospitality.
              </p>

              {feedbackSuccess && (
                <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-medium p-3 mb-4 text-center">
                  Thank you! Your feedback has been posted.
                </div>
              )}

              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-[#c59b27] font-bold block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={feedbackInput.name}
                    onChange={(e) => setFeedbackInput({ ...feedbackInput, name: e.target.value })}
                    className="w-full bg-[#021009] border border-emerald-900/70 px-3.5 py-2 text-xs text-[#faebd2] font-medium focus:outline-none focus:border-[#d4af37]"
                    placeholder="e.g. Rahul Menon"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-widest text-[#c59b27] font-bold block mb-1">
                    Rating
                  </label>
                  <select
                    value={feedbackInput.rating}
                    onChange={(e) => setFeedbackInput({ ...feedbackInput, rating: e.target.value })}
                    className="w-full bg-[#021009] border border-emerald-900/70 px-3 py-2 text-xs text-[#faebd2] font-medium focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-widest text-[#c59b27] font-bold block mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={feedbackInput.comment}
                    onChange={(e) => setFeedbackInput({ ...feedbackInput, comment: e.target.value })}
                    className="w-full bg-[#021009] border border-emerald-900/70 px-3.5 py-2 text-xs text-[#faebd2] font-medium focus:outline-none focus:border-[#d4af37]"
                    placeholder="Tell us what you loved about our food..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gold-gradient-btn text-stone-950 font-sans text-xs font-bold tracking-widest uppercase py-3 shadow-lg cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT & TABLE BOOKING SECTION */}
      <section id="contact" className="py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Contact Details */}
          <div>
            <span className="text-[#c59b27] font-sans text-xs tracking-[0.35em] uppercase font-bold block mb-3">
              Visit Us in Kozhikode
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl font-bold tracking-[0.14em] uppercase text-[#d4af37] leading-tight">
              Hotel Paramount Calicut
            </h2>
            <div className="w-16 h-0.5 bg-[#d4af37] mt-4 mb-6" />

            <p className="text-[#faebd2] text-sm font-medium leading-relaxed mb-8">
              Experience the authentic flavors of Malabar. Walk into our dining hall or reserve your table
              in advance for family dinners and private gatherings.
            </p>

            <div className="space-y-4 text-xs tracking-wider">
              <div className="flex items-start space-x-3">
                <span className="text-[#c59b27] font-bold uppercase w-20">Address:</span>
                <span className="text-[#faebd2] font-medium">Paramount Hotel, Calicut, Kozhikode, Kerala 673001</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#c59b27] font-bold uppercase w-20">Phone:</span>
                <a href="tel:+914952720272" className="text-[#d4af37] hover:text-[#ecdcb2] hover:underline font-bold">
                  +91 495 272 0272
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#c59b27] font-bold uppercase w-20">Hours:</span>
                <span className="text-[#faebd2] font-medium">11:00 AM – 11:30 PM (Daily)</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#c59b27] font-bold uppercase w-20">Cuisine:</span>
                <span className="text-[#faebd2] font-medium">Malabar Dum Biryani, Beef Roast, Arabian Grills &amp; Seafood</span>
              </div>
            </div>
          </div>

          {/* Right: Table Reservation Form */}
          <div className="bg-[#041c10] border border-emerald-800/70 p-8 sm:p-10 shadow-2xl">
            <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-[#d4af37] uppercase tracking-wider mb-2">
              Book a Table
            </h3>
            <p className="text-[#faebd2]/80 text-xs font-medium mb-6">
              Reserve your spot to avoid rush-hour waiting queues.
            </p>

            {bookingSuccess && (
              <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-medium p-3.5 mb-6 text-center">
                Table reservation received! Our staff will call you shortly to confirm.
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#c59b27] font-bold block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={booking.name}
                    onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                    className="w-full bg-[#021009] border border-emerald-900/70 px-3.5 py-2.5 text-xs text-[#faebd2] font-medium focus:outline-none focus:border-[#d4af37]"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#c59b27] font-bold block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={booking.phone}
                    onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                    className="w-full bg-[#021009] border border-emerald-900/70 px-3.5 py-2.5 text-xs text-[#faebd2] font-medium focus:outline-none focus:border-[#d4af37]"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#c59b27] font-bold block mb-1">
                    Guests
                  </label>
                  <select
                    value={booking.guests}
                    onChange={(e) => setBooking({ ...booking, guests: e.target.value })}
                    className="w-full bg-[#021009] border border-emerald-900/70 px-3 py-2.5 text-xs text-[#faebd2] font-medium focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="8+">8+ Family</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#c59b27] font-bold block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="w-full bg-[#021009] border border-emerald-900/70 px-3 py-2 text-xs text-[#faebd2] font-medium focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#c59b27] font-bold block mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={booking.time}
                    onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                    className="w-full bg-[#021009] border border-emerald-900/70 px-3 py-2 text-xs text-[#faebd2] font-medium focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full gold-gradient-btn text-stone-950 font-sans text-xs font-bold tracking-[0.2em] uppercase py-3.5 shadow-xl cursor-pointer mt-2"
              >
                Confirm Table Reservation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 7. PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#03160c] border border-[#d4af37]/40 max-w-2xl w-full overflow-hidden shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-[#021009]/90 hover:bg-[#021009] text-[#d4af37] hover:text-[#ecdcb2] w-8 h-8 flex items-center justify-center rounded-full border border-[#d4af37]/50 cursor-pointer font-bold"
            >
              &times;
            </button>

            {/* Minimal Clean Modal Image */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#021009]">
              <img
                src={selectedProduct.image_url || '/images/beef_biryani.jpg'}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              <span className="text-[#c59b27] text-xs font-mono font-bold tracking-widest uppercase block mb-1">
                {selectedProduct.food_type}
              </span>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-[#faebd2]">
                  {selectedProduct.name}
                </h3>
                <span className="text-2xl font-bold text-[#d4af37] font-sans">
                  Rs. {selectedProduct.special_price || selectedProduct.price}
                </span>
              </div>

              {selectedProduct.savings > 0 && (
                <div className="inline-block bg-red-950/90 border border-red-500/50 text-red-300 text-xs px-2.5 py-0.5 font-bold mb-3">
                  Today's Special Deal: Save Rs. {selectedProduct.savings}
                </div>
              )}

              <p className="text-[#faebd2] text-sm font-medium leading-relaxed mt-2 mb-4">
                {selectedProduct.description}
              </p>

              {selectedProduct.related_items && selectedProduct.related_items.length > 0 && (
                <div className="mb-6 p-3.5 bg-[#021009] border border-emerald-900/50">
                  <p className="text-[10px] text-[#c59b27] uppercase tracking-widest mb-2 font-mono font-bold">
                    Similar Dishes in {selectedProduct.food_type}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.related_items.map((rel) => (
                      <button
                        key={rel.id}
                        type="button"
                        onClick={() => handleOpenProduct(rel)}
                        className="text-xs bg-[#041c10] hover:bg-[#052415] border border-emerald-900/60 px-3 py-1.5 text-[#ecdcb2] hover:text-[#d4af37] font-bold transition-colors cursor-pointer"
                      >
                        {rel.name} &bull; <span className="text-[#d4af37] font-bold">Rs. {rel.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-emerald-900/40 pt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-[#faebd2]/80 space-y-1 font-medium">
                  <div>Restaurant: <strong className="text-[#faebd2] font-bold">Paramount Calicut</strong></div>
                  <div>Availability: <span className="text-emerald-400 font-semibold">In Stock Today</span></div>
                </div>

                <a
                  href="#contact"
                  onClick={() => setSelectedProduct(null)}
                  className="gold-gradient-btn text-stone-950 font-sans text-xs font-bold tracking-widest uppercase px-6 py-2.5 transition-colors shadow-md"
                >
                  Order / Reserve Table
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. GUEST SELFIE UPLOAD MODAL */}
      {selfieModalOpen && (
        <div
          onClick={() => setSelfieModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#03160c] border border-[#d4af37]/40 max-w-lg w-full overflow-hidden shadow-2xl relative p-6 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelfieModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-[#021009]/90 hover:bg-[#021009] text-[#d4af37] hover:text-[#ecdcb2] w-8 h-8 flex items-center justify-center rounded-full border border-[#d4af37]/50 cursor-pointer font-bold"
            >
              &times;
            </button>

            <div className="mb-6">
              <span className="text-[#c59b27] font-mono text-[10px] tracking-widest uppercase font-bold block mb-1">
                Hotel Paramount Calicut
              </span>
              <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-bold text-[#d4af37]">
                Share Your Dining Selfie
              </h3>
              <p className="text-[#faebd2]/80 text-xs mt-1 font-medium">
                Take a selfie from your table or select a photo from your gallery to feature on our live wall!
              </p>
            </div>

            {selfieSuccess && (
              <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-medium p-4 mb-4 text-center rounded">
                Your selfie has been posted to Paramount's Live Wall.
              </div>
            )}

            {selfieError && (
              <div className="bg-red-950/90 border border-red-500/50 text-red-200 text-xs font-medium p-3.5 mb-4 text-center rounded">
                {selfieError}
              </div>
            )}

            <form onSubmit={handleSelfieSubmit} className="space-y-4">
              {/* Photo Upload / Camera Area */}
              <div>
                <label className="text-[11px] uppercase tracking-widest text-[#c59b27] font-bold block mb-2">
                  Your Selfie / Photo *
                </label>

                {selfiePreview ? (
                  <div className="relative aspect-[4/3] w-full rounded border border-emerald-700/60 overflow-hidden bg-[#021009] group">
                    <img
                      src={selfiePreview}
                      alt="Selfie Preview"
                      className="w-full h-full object-cover"
                    />
                    <label
                      htmlFor="selfie-file-input"
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[#d4af37] text-xs font-bold cursor-pointer transition-opacity"
                    >
                      <span>Change Photo</span>
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="selfie-file-input"
                    className="border-2 border-dashed border-emerald-800/60 hover:border-[#d4af37]/60 rounded p-6 flex flex-col items-center justify-center cursor-pointer bg-[#021009] hover:bg-[#041c10] transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-[#d4af37] mb-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                      />
                    </svg>
                    <span className="text-[#ecdcb2] text-xs font-bold">Click to Select or Capture Photo</span>
                    <span className="text-[#c59b27] text-[10px] mt-1 font-medium">Supports Mobile Camera, JPG, PNG</span>
                  </label>
                )}

                <input
                  id="selfie-file-input"
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={handleSelfieFileChange}
                  className="hidden"
                />
              </div>

              {/* Customer Name */}
              <div>
                <label className="text-[11px] uppercase tracking-widest text-[#c59b27] font-bold block mb-1">
                  Your Name / Group Name *
                </label>
                <input
                  type="text"
                  required
                  value={selfieForm.customer_name}
                  onChange={(e) => setSelfieForm({ ...selfieForm, customer_name: e.target.value })}
                  placeholder="e.g. Rahul & Family / Sneha M."
                  className="w-full bg-[#021009] border border-emerald-900/70 px-3.5 py-2.5 text-xs text-[#faebd2] font-medium focus:outline-none focus:border-[#d4af37] rounded-sm"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="text-[11px] uppercase tracking-widest text-[#c59b27] font-bold block mb-1">
                  Caption / Food Review (Optional)
                </label>
                <textarea
                  rows={2}
                  value={selfieForm.caption}
                  onChange={(e) => setSelfieForm({ ...selfieForm, caption: e.target.value })}
                  placeholder="e.g. Having the best Biryani & Porotta in Kozhikode!"
                  className="w-full bg-[#021009] border border-emerald-900/70 px-3.5 py-2 text-xs text-[#faebd2] font-medium focus:outline-none focus:border-[#d4af37] rounded-sm"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSelfieModalOpen(false)}
                  className="px-4 py-2.5 text-xs text-[#c59b27] hover:text-[#ecdcb2] uppercase tracking-wider font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={selfieUploading}
                  className="gold-gradient-btn text-stone-950 font-bold text-xs uppercase tracking-widest px-6 py-2.5 transition-colors cursor-pointer shadow-md"
                >
                  {selfieUploading ? 'Uploading Selfie...' : 'Post to Live Wall'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-emerald-950 bg-[#010a06] py-10 px-6 sm:px-10 text-center text-xs text-[#faebd2]/70 tracking-wider font-medium">
        <p className="font-['Alex_Brush'] text-3xl text-[#d4af37] mb-2">Hotel Paramount</p>
        <p className="text-[#faebd2]">Calicut, Kozhikode, Kerala &bull; Phone: +91 495 272 0272</p>
        <p className="mt-4 text-[#faebd2]/50 text-[11px]">
          &copy; {new Date().getFullYear()} Hotel Paramount Calicut. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
