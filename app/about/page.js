"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const About = () => {
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Ultra Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Primary gradient background with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30"
        />
        
        {/* Animated mesh gradient */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.3) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 80%, rgba(147,51,234,0.3) 0%, transparent 60%)",
              "radial-gradient(circle at 20% 70%, rgba(219,39,119,0.3) 0%, transparent 60%)",
              "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.3) 0%, transparent 60%)"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Floating geometric shapes */}
        {isClient && Array.from({ length: 15 }).map((_, i) => {
          const shapes = ['rounded-full', 'rounded-lg', 'rounded-none', 'rounded-xl']
          const colors = [
            'bg-blue-500/10', 'bg-purple-500/10', 'bg-pink-500/10', 
            'bg-cyan-500/10', 'bg-indigo-500/10', 'bg-violet-500/10'
          ]
          const shape = shapes[i % shapes.length]
          const color = colors[i % colors.length]
          const size = Math.random() * 100 + 50
          const initialX = Math.random() * windowDimensions.width
          const initialY = Math.random() * windowDimensions.height
          
          return (
            <motion.div
              key={`shape-${i}`}
              className={`absolute ${color} ${shape} backdrop-blur-sm`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${initialX}px`,
                top: `${initialY}px`,
              }}
              animate={{
                x: [0, Math.random() * 300 - 150, 0],
                y: [0, Math.random() * 200 - 100, 0],
                rotate: [0, 360, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )
        })}
        
        {/* Particle system */}
        {isClient && Array.from({ length: 30 }).map((_, i) => {
          const initialX = Math.random() * windowDimensions.width
          const initialY = Math.random() * windowDimensions.height
          const colors = ['bg-white/20', 'bg-blue-400/20', 'bg-purple-400/20', 'bg-pink-400/20']
          const color = colors[i % colors.length]
          
          return (
            <motion.div
              key={`particle-${i}`}
              className={`absolute ${color} rounded-full`}
              style={{
                width: '3px',
                height: '3px',
                left: `${initialX}px`,
                top: `${initialY}px`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3
              }}
            />
          )
        })}
        
        {/* Large floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.4],
            x: [0, -80, 0],
            y: [0, 80, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <section id="about" className="relative text-white py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="text-center mb-16"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                backgroundPosition: { duration: 5, repeat: Infinity }
              }}
            >
              About Us
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Enhanced Text Content */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 80 }}
              className="space-y-8"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Card background animation */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1))",
                      "linear-gradient(45deg, rgba(147,51,234,0.1), rgba(219,39,119,0.1))",
                      "linear-gradient(45deg, rgba(219,39,119,0.1), rgba(59,130,246,0.1))"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl"
                />
                
                <div className="relative z-10">
                  <motion.h2 
                    className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      backgroundPosition: { duration: 4, repeat: Infinity }
                    }}
                  >
                    Our Mission
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-cyan-400 text-2xl font-medium mb-8 leading-relaxed"
                  >
                    At MultiMantra, we believe in simplifying your digital life.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-gray-300 text-lg leading-relaxed space-y-6"
                  >
                    <p>
                      Whether it's managing your daily tasks, sharing links, supporting causes, or shopping online — we bring it all under one roof.
                    </p>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                      className="bg-gradient-to-r from-fuchsia-900/30 to-purple-900/30 rounded-2xl p-6 border border-fuchsia-500/20"
                    >
                      <motion.span 
                        className="font-bold text-2xl text-fuchsia-400 block mb-3"
                        animate={{ 
                          textShadow: [
                            "0 0 10px rgba(217,70,239,0.5)",
                            "0 0 20px rgba(217,70,239,0.8)",
                            "0 0 10px rgba(217,70,239,0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Our Goal?
                      </motion.span>
                      <motion.p 
                        className="text-lg text-fuchsia-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                      >
                        To empower you with smart, seamless, and secure tools that just work.
                      </motion.p>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6, duration: 0.8 }}
                      className="text-xl text-fuchsia-400 font-semibold text-center p-4 rounded-xl bg-gradient-to-r from-fuchsia-900/20 to-purple-900/20 border border-fuchsia-500/30"
                    >
                      <motion.span
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        Join us on this journey where One Mantra = Many Solutions.
                      </motion.span>
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Stats Section */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 1, type: "spring", stiffness: 100 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { number: "100+", label: "Projects", color: "from-blue-400 to-cyan-400" },
                  { number: "50+", label: "Happy Clients", color: "from-purple-400 to-pink-400" },
                  { number: "24/7", label: "Support", color: "from-green-400 to-emerald-400" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    animate={{ 
                      y: [0, -5, 0],
                      boxShadow: [
                        "0 5px 15px rgba(0,0,0,0.2)",
                        "0 10px 25px rgba(0,0,0,0.3)",
                        "0 5px 15px rgba(0,0,0,0.2)"
                      ]
                    }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, delay: index * 0.3 },
                      boxShadow: { duration: 3, repeat: Infinity, delay: index * 0.3 }
                    }}
                    className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg border border-gray-700/50 rounded-xl p-6 text-center"
                  >
                    <motion.h3
                      className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                      }}
                      transition={{
                        backgroundPosition: { duration: 3, repeat: Infinity }
                      }}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="text-gray-300 text-sm font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Image Section */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 80 }}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                {/* Image glow effect */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(59,130,246,0.3)",
                      "0 0 60px rgba(147,51,234,0.4)",
                      "0 0 30px rgba(219,39,119,0.3)",
                      "0 0 60px rgba(59,130,246,0.4)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl"
                />
                
                {/* Animated border */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(59,130,246,0.5), rgba(147,51,234,0.5))",
                      "linear-gradient(45deg, rgba(147,51,234,0.5), rgba(219,39,119,0.5))",
                      "linear-gradient(45deg, rgba(219,39,119,0.5), rgba(59,130,246,0.5))"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl p-1"
                >
                  <div className="w-full h-full bg-gray-900 rounded-3xl" />
                </motion.div>
                
                {/* Main image */}
                <motion.div
                  animate={{
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 rounded-3xl overflow-hidden"
                >
                  <Image 
                    width={500} 
                    height={500} 
                    src="/pro.png" 
                    alt="Team working" 
                    className="rounded-3xl shadow-2xl"
                  />
                </motion.div>
                
                {/* Floating elements around image */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-sm opacity-60"
                />
                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm opacity-60"
                />
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute top-1/2 -left-8 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-sm"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
