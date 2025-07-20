"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Set active section based on current route
    if (pathname === '/') {
      // For home page, use scroll detection
      const handleScroll = () => {
        setScrolled(window.scrollY > 50)
        
        // Auto-detect active section based on scroll position
        const sections = ['home', 'about', 'feature']
        const scrollPosition = window.scrollY + 150
        
        // Check if we're at the top of the page
        if (window.scrollY < 100) {
          setActiveSection('home')
          return
        }
        
        sections.forEach(section => {
          const element = document.getElementById(section)
          if (element) {
            const offsetTop = element.offsetTop - 100
            const offsetBottom = offsetTop + element.offsetHeight
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              setActiveSection(section)
            }
          }
        })
      }
      
      handleScroll()
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    } else if (pathname === '/contact') {
      setActiveSection('contact')
    } else if (pathname === '/dashboard') {
      setActiveSection('dashboard')
    } else if (pathname === '/lite') {
      setActiveSection('lite')
    } else if (pathname === '/link') {
      setActiveSection('link')
    } else if (pathname === '/blog') {
      setActiveSection('blog')
    } else {
      // For other pages, don't highlight any section
      setActiveSection('')
    }
  }, [pathname])

  const navItems = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/about', label: 'About', id: 'about' },
    { href: '/feature', label: 'Features', id: 'feature' },
    { href: '/contact', label: 'Contact', id: 'contact' }
  ]

  const handleNavClick = (item) => {
    setActiveSection(item.id)
    
    // Handle different navigation types
    if (item.id === 'home') {
      // For home, check if we're already on home page
      if (pathname === '/') {
        // Scroll to top if already on home page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      // If not on home page, Next.js Link will handle navigation
    } else if (item.href.startsWith('#')) {
      // Only handle scroll for anchor links if we're on the home page
      if (pathname === '/') {
        const element = document.getElementById(item.id)
        if (element) {
          const offsetTop = element.offsetTop - 100
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      }
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95vw] max-w-6xl z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-lg shadow-2xl border border-gray-700/50' 
          : 'bg-black/90 backdrop-blur-md shadow-xl'
      } rounded-2xl`}
    >
      <div className="flex items-center justify-between px-8 py-4">
        {/* Enhanced Logo */}
        <Link href="/" className="cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <motion.span
              whileHover={{ 
                rotate: 360,
                scale: 1.2,
                boxShadow: "0 0 20px rgba(255, 0, 0, 0.5)"
              }}
              transition={{ duration: 0.6 }}
              className="relative border-2 border-red-600 rounded-full px-3 py-2 text-red-600 font-bold text-2xl bg-white shadow-lg cursor-pointer"
            >
              M
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full opacity-20 blur-sm"
              />
            </motion.span>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-red-600 font-bold text-xl tracking-wider bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent cursor-pointer"
            >
              MULTIMANTRA
            </motion.span>
          </motion.div>
        </Link>

        {/* Enhanced Navigation Menu */}
        <ul className="flex space-x-2 text-sm font-medium">
          {navItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
              className="relative"
            >
              {item.href.startsWith('/') ? (
                // External links (like /contact)
                <Link href={item.href} className="cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-6 py-3 rounded-full transition-all duration-300 group cursor-pointer ${
                      activeSection === item.id
                        ? 'text-yellow-400 bg-yellow-400/10'
                        : 'text-white hover:text-yellow-400'
                    }`}
                    onClick={() => handleNavClick(item)}
                  >
                    {item.label}
                    
                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                    
                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Ripple effect on click */}
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full scale-0 group-active:scale-100 transition-transform duration-200"
                    />
                  </motion.div>
                </Link>
              ) : (
                // Internal scroll links (for sections on home page)
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-6 py-3 rounded-full transition-all duration-300 group cursor-pointer ${
                    activeSection === item.id
                      ? 'text-yellow-400 bg-yellow-400/10'
                      : 'text-white hover:text-yellow-400'
                  }`}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Ripple effect on click */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full scale-0 group-active:scale-100 transition-transform duration-200"
                  />
                </motion.div>
              )}
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.nav>
  )
}

export default Navbar