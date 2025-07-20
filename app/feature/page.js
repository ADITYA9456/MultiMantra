"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Feature = () => {
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const features = [
    {
      title: "Donation",
      description: "Support causes with ease",
      icon: "/coin2.gif",
      link: "/dashboard",
      color: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-900/60 to-orange-900/60",
      borderColor: "border-yellow-400/20"
    },
    {
      title: "URL Shortener",
      description: "Shorten and share links",
      icon: "/link.gif",
      link: "/lite",
      color: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-900/60 to-cyan-900/60",
      borderColor: "border-blue-400/20"
    },
    {
      title: "Link Collector",
      description: "Organize your Links on one page",
      icon: "/layer.gif",
      link: "/link",
      color: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-900/60 to-pink-900/60",
      borderColor: "border-purple-400/20"
    },
    {
      title: "WriteMantra",
      description: "Write, express, and share your story with the world.",
      icon: "/blog.gif",
      link: "/blog",
      color: "from-green-400 to-emerald-500",
      bgGradient: "from-green-900/60 to-emerald-900/60",
      borderColor: "border-green-400/20"
    }
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Ultra Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Primary gradient background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30"
        />
        
        {/* Animated mesh gradient */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.3) 0%, transparent 70%)",
              "radial-gradient(circle at 80% 70%, rgba(147,51,234,0.3) 0%, transparent 70%)",
              "radial-gradient(circle at 40% 20%, rgba(219,39,119,0.3) 0%, transparent 70%)",
              "radial-gradient(circle at 60% 80%, rgba(59,130,246,0.3) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.3) 0%, transparent 70%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Floating tech symbols */}
        {isClient && Array.from({ length: 20 }).map((_, i) => {
          const symbols = ['💎', '🚀', '⚡', '🔗', '💫', '🎯', '🌟', '🔮', '💻', '🎨']
          const symbol = symbols[i % symbols.length]
          const initialX = Math.random() * windowDimensions.width
          const initialY = Math.random() * windowDimensions.height
          const size = Math.random() * 30 + 20
          
          return (
            <motion.div
              key={`symbol-${i}`}
              className="absolute text-2xl opacity-20"
              style={{
                left: `${initialX}px`,
                top: `${initialY}px`,
                fontSize: `${size}px`
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 100 - 50, 0],
                rotate: [0, 360, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 10 + 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            >
              {symbol}
            </motion.div>
          )
        })}
        
        {/* Particle system */}
        {isClient && Array.from({ length: 40 }).map((_, i) => {
          const initialX = Math.random() * windowDimensions.width
          const initialY = Math.random() * windowDimensions.height
          const colors = ['bg-white/10', 'bg-indigo-400/10', 'bg-purple-400/10', 'bg-pink-400/10', 'bg-cyan-400/10']
          const color = colors[i % colors.length]
          
          return (
            <motion.div
              key={`particle-${i}`}
              className={`absolute ${color} rounded-full`}
              style={{
                width: '4px',
                height: '4px',
                left: `${initialX}px`,
                top: `${initialY}px`,
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4
              }}
            />
          )
        })}
        
        {/* Large floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 150, 0],
            y: [0, -80, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.3, 1, 1.5],
            x: [0, -100, 0],
            y: [0, 100, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <section id="feature" className="relative text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="text-center mb-20"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                backgroundPosition: { duration: 5, repeat: Infinity }
              }}
            >
              Our Features
            </motion.h1>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-32 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full mb-8"
            />
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Discover powerful tools designed to simplify your digital experience
              <motion.span
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="block mt-2 text-purple-400 font-semibold"
              >
                ✨ Everything you need, all in one place ✨
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10
                }}
                className={`bg-gradient-to-br ${feature.bgGradient} backdrop-blur-lg border ${feature.borderColor} rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center relative overflow-hidden group cursor-pointer`}
              >
                {/* Card background animation */}
                <motion.div
                  animate={{
                    background: [
                      `linear-gradient(45deg, ${feature.color.split(' ')[0].replace('from-', 'rgba(').replace('-400', ', 0.1)')} 0%, transparent 50%)`,
                      `linear-gradient(45deg, ${feature.color.split(' ')[1].replace('to-', 'rgba(').replace('-500', ', 0.1)')} 0%, transparent 50%)`,
                      `linear-gradient(45deg, ${feature.color.split(' ')[0].replace('from-', 'rgba(').replace('-400', ', 0.1)')} 0%, transparent 50%)`
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl"
                />
                
                {/* Animated icon container */}
                <motion.div
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360
                  }}
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity },
                    rotate: { duration: 4, repeat: Infinity }
                  }}
                  className="relative z-10 mb-6 p-4 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20"
                >
                  <Image 
                    width={80} 
                    height={80} 
                    src={feature.icon} 
                    alt={feature.title}
                    className="drop-shadow-lg"
                  />
                </motion.div>
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.h3 
                    className={`text-3xl font-bold mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      backgroundPosition: { duration: 4, repeat: Infinity }
                    }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className="text-gray-300 text-lg mb-8 leading-relaxed"
                  >
                    {feature.description}
                  </motion.p>
                  
                  {/* Enhanced Button */}
                  <Link href={feature.link}>
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: [
                          "0 5px 15px rgba(0,0,0,0.2)",
                          "0 8px 25px rgba(0,0,0,0.3)",
                          "0 5px 15px rgba(0,0,0,0.2)"
                        ]
                      }}
                      transition={{
                        boxShadow: { duration: 3, repeat: Infinity }
                      }}
                      className={`relative inline-flex items-center justify-center p-1 overflow-hidden text-lg font-semibold text-white rounded-xl group bg-gradient-to-r ${feature.color} hover:scale-105 transition-all duration-300 cursor-pointer`}
                    >
                      {/* Button shine effect */}
                      <motion.div
                        animate={{
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                      
                      <span className="relative px-8 py-3 transition-all ease-in duration-200 bg-gray-900/80 backdrop-blur-md rounded-lg group-hover:bg-transparent">
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Get Started 🚀
                        </motion.span>
                      </span>
                    </motion.button>
                  </Link>
                </div>
                
                {/* Floating mini particles around card */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`mini-particle-${i}`}
                    className={`absolute w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full opacity-60`}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 20}%`
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced Call to Action */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1, type: "spring", stiffness: 80 }}
            className="text-center mt-20"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden cursor-pointer"
            >
              {/* Background animation */}
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(99,102,241,0.1), rgba(147,51,234,0.1))",
                    "linear-gradient(45deg, rgba(147,51,234,0.1), rgba(219,39,119,0.1))",
                    "linear-gradient(45deg, rgba(219,39,119,0.1), rgba(99,102,241,0.1))"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl"
              />
              
              <div className="relative z-10">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    backgroundPosition: { duration: 5, repeat: Infinity }
                  }}
                >
                  Ready to Get Started?
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 1 }}
                  className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                  Join thousands of users who are already simplifying their digital life with MultiMantra
                </motion.p>
                
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-2xl"
                >
                  🌟 One Platform, Endless Possibilities 🌟
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default Feature
