"use client";
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-400 py-16 shadow-inner overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient overlay */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(239,68,68,0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 80% 80%, rgba(236,72,153,0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 40% 60%, rgba(147,51,234,0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 20% 20%, rgba(239,68,68,0.1) 0%, transparent 60%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Floating particles */}
        {isClient && Array.from({ length: 15 }).map((_, i) => {
          const size = Math.random() * 4 + 2
          const initialX = Math.random() * 100
          const initialY = Math.random() * 100
          
          return (
            <motion.div
              key={`footer-particle-${i}`}
              className="absolute bg-white/10 rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${initialX}%`,
                top: `${initialY}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          )
        })}
        
        {/* Animated grid pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Enhanced Logo Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="mb-8 md:mb-0 text-center md:text-left"
          >
            <motion.h2
              className="text-white text-3xl font-extrabold tracking-wide mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Multi
              <motion.span
                className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md ml-1"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  backgroundPosition: { duration: 3, repeat: Infinity }
                }}
              >
                Mantra
              </motion.span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-sm text-gray-500 mb-3"
            >
              © 2025 All rights reserved.
            </motion.p>
            
            {/* Enhanced tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xs text-gray-400 max-w-xs"
            >
              <motion.span
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✨ Simplifying your digital life, one solution at a time ✨
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Enhanced Navigation */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
            className="flex flex-col items-center md:items-end"
          >
            <motion.ul 
              className="flex space-x-8 text-sm font-medium mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {[
                { name: "Home", href: "/", icon: "🏠" },
                { name: "About", href: "/about", icon: "👥" },
                { name: "Services", href: "/serves", icon: "🚀" },
                { name: "Contact", href: "/contact", icon: "📞" }
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                >
                  <a
                    href={item.href}
                    className="hover:text-white transition duration-300 cursor-pointer flex items-center space-x-2 group"
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-xs opacity-70 group-hover:opacity-100 transition-opacity"
                    >
                      {item.icon}
                    </motion.span>
                    <span className="relative">
                      {item.name}
                      <motion.div
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 group-hover:w-full transition-all duration-300"
                        whileHover={{ width: "100%" }}
                      />
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            {/* Enhanced Social Media Icons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex space-x-4"
            >
              {[
                { name: "Twitter", icon: "🐦", color: "from-blue-400 to-blue-600" },
                { name: "LinkedIn", icon: "💼", color: "from-blue-600 to-blue-800" },
                { name: "Instagram", icon: "📷", color: "from-pink-400 to-purple-600" },
                { name: "GitHub", icon: "💻", color: "from-gray-400 to-gray-600" }
              ].map((social, index) => (
                <motion.div
                  key={social.name}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    y: [0, -2, 0],
                    boxShadow: [
                      "0 2px 8px rgba(0,0,0,0.1)",
                      "0 4px 12px rgba(0,0,0,0.2)",
                      "0 2px 8px rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{
                    y: { duration: 2, repeat: Infinity, delay: index * 0.3 },
                    boxShadow: { duration: 2, repeat: Infinity, delay: index * 0.3 }
                  }}
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300`}
                >
                  <span className="text-white text-lg">{social.icon}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"
        />

        {/* Enhanced Bottom Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500"
        >
          <motion.div
            className="flex items-center space-x-4 mb-4 md:mb-0"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>Made with</span>
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-red-500 text-sm"
            >
              ❤️
            </motion.span>
            <span>in India</span>
          </motion.div>
          
          <motion.div
            className="flex items-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            <motion.a
              href="#"
              className="hover:text-white transition duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-white transition duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-white transition duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Support
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer