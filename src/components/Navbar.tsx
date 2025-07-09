'use client'
import { Search, MapPin, ChevronDown, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCity, setSearch } from '@/redux/slices/filterSlice'
import Link from 'next/link'

const Navbar = () => {
  const dispatch = useDispatch()
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('Select City')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    
    // Set new timeout
    const newTimeout = setTimeout(() => {
      dispatch(setSearch(value))
    }, 500)
    
    setSearchTimeout(newTimeout)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [searchTimeout])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  console.log(searchQuery)
  const majorCities = [
    'Bangalore',
    'Chennai',
    'Delhi',
    'Hyderabad',
    'Kolkata',
    'Mumbai',
    'Pune'
  ]

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location)
    setIsLocationOpen(false)
    dispatch(setCity(location))
    // Close mobile menu after selection
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white shadow-sm border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">       
        <h1 className="text-xl sm:text-2xl font-bold uppercase">
          <span className="text-primary">Pixi</span>
          <span className="text-gray-800">sphere</span>
        </h1>
        </Link>
      </div>

      {/* Desktop Right side - Location Dropdown and Search */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Location Dropdown */}
        <div className="relative">
        <button
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          className="flex items-center space-x-3 px-5 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary min-w-[200px]"
        >
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium flex-1 text-left">{selectedLocation}</span>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isLocationOpen ? 'rotate-180' : ''
          }`} />
                </button>

        {/* Dropdown Menu */}
        {isLocationOpen && (
          <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-100 rounded-xl shadow-2xl z-50">
            
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">Major Cities</h3>
                            <div className="space-y-0.5">
                {majorCities.map((city: string) => (
                  <button
                    key={city}
                    onClick={() => handleLocationSelect(city)}
                    className={`w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-150 rounded-lg flex items-center space-x-3 ${
                      selectedLocation === city
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{city}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Backdrop to close dropdown */}
        {isLocationOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsLocationOpen(false)}
          />
        )}
      </div>

              {/* Search Bar */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name or tag"
              onClick={() => setIsSearchExpanded(true)}
              onBlur={() => setIsSearchExpanded(false)}
              onChange={handleSearch}
              className={`pl-12 pr-4 py-2.5 rounded-lg border-0 bg-gray-50 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white focus:shadow-sm transition-all duration-300 ease-in-out ${
                isSearchExpanded ? 'w-96' : 'w-80'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden hamburger-button p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-700" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/25" />
          
          {/* Menu Content */}
          <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </button>
              </div>

              {/* Search Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search by name or tag"
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* Location Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Location</h3>
                <div className="relative">
                  <button
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{selectedLocation}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      isLocationOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Mobile Location Dropdown */}
                  {isLocationOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="p-3">
                        <div className="space-y-1">
                          {majorCities.map((city: string) => (
                            <button
                              key={city}
                              onClick={() => handleLocationSelect(city)}
                              className={`w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-150 rounded-lg flex items-center space-x-3 ${
                                selectedLocation === city
                                  ? 'bg-blue-50 text-blue-600 font-medium'
                                  : 'text-gray-600 hover:text-gray-800'
                              }`}
                            >
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>{city}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar