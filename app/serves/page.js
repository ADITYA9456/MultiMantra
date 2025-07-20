"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const serves = () => {
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

  const services = [
    {
      title: "Donation",
      icon: "💸",
      color: "red",
      hoverColor: "hover:border-red-500",
      textColor: "text-red-500",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-900/20 to-pink-900/20",
      description: "Contribute to meaningful social causes with a seamless and secure donation process. Whether it's for charity, disaster relief, or supporting educational programs, your donations help make a tangible impact.",
      details: "With our easy-to-use interface, select your preferred cause, enter your donation amount, and contribute instantly. Feel good knowing your donation is going directly to the cause you care about.",
      link: "/dashboard"
    },
    {
      title: "URL Shortener",
      icon: "🔗",
      color: "blue",
      hoverColor: "hover:border-blue-500",
      textColor: "text-blue-500",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-900/20 to-cyan-900/20",
      description: "Say goodbye to long, cumbersome URLs. Our URL shortener lets you create short, memorable links that are perfect for sharing. Whether for social media, emails, or websites, make your links short and easy to distribute.",
      details: "Keep track of your shortened links and analyze their performance with our built-in link tracker. It's the easiest way to manage, share, and track your links across platforms.",
      link: "/lite"
    },
    {
      title: "Link Collector",
      icon: "🌐",
      color: "green",
      hoverColor: "hover:border-green-500",
      textColor: "text-green-500",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-900/20 to-emerald-900/20",
      description: "Create your personalized link hub and share all your important links in one beautiful, customizable page. Perfect for creators, professionals, and businesses who want to showcase multiple links elegantly.",
      details: "Design your unique profile with custom themes, organize your links by categories, and track visitor analytics. Share your personal link page across all your social media platforms and make it easy for your audience to find everything they need.",
      link: "/link"
    },
    {
      title: "WriteMantra",
      icon: "✍️",
      color: "purple",
      hoverColor: "hover:border-purple-500",
      textColor: "text-purple-500",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-900/20 to-pink-900/20",
      description: "Unleash your creativity with our powerful blog editor and publishing platform. Write, format, and share your stories, articles, and thoughts with the world using our intuitive content management system.",
      details: "Feature-rich text editor with markdown support, image uploads, SEO optimization, and social sharing capabilities. Schedule posts, manage drafts, and engage with your readers through comments and analytics. Perfect for bloggers, writers, and content creators.",
      link: "/blog"
    }
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 to-black">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Primary gradient background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"
        />
        
        {/* Animated mesh gradient */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 70% 80%, rgba(59,130,246,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 70%, rgba(236,72,153,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 80% 30%, rgba(34,197,94,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.15) 0%, transparent 70%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Floating service icons */}
        {isClient && Array.from({ length: 16 }).map((_, i) => {
          const icons = ['💸', '🔗', '✍️', '🚀', '⚡', '💎', '🌟', '🎯', '🔮', '💫', '🎨', '📝', '🌐', '💰', '📊', '🎪']
          const icon = icons[i % icons.length]
          const initialX = Math.random() * windowDimensions.width
          const initialY = Math.random() * windowDimensions.height
          const size = Math.random() * 25 + 15
          
          return (
            <motion.div
              key={`service-icon-${i}`}
              className="absolute opacity-20"
              style={{
                left: `${initialX}px`,
                top: `${initialY}px`,
                fontSize: `${size}px`
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 80 - 40, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: Math.random() * 12 + 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            >
              {icon}
            </motion.div>
          )
        })}
        
        {/* Enhanced particle system */}
        {isClient && Array.from({ length: 35 }).map((_, i) => {
          const initialX = Math.random() * windowDimensions.width
          const initialY = Math.random() * windowDimensions.height
          const colors = ['bg-white/15', 'bg-purple-400/15', 'bg-blue-400/15', 'bg-pink-400/15', 'bg-green-400/15', 'bg-yellow-400/15']
          const color = colors[i % colors.length]
          const size = Math.random() * 3 + 2
          
          return (
            <motion.div
              key={`particle-${i}`}
              className={`absolute ${color} rounded-full`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${initialX}px`,
                top: `${initialY}px`,
              }}
              animate={{
                y: [0, -120, 0],
                x: [0, Math.random() * 60 - 30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: Math.random() * 8 + 6,
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
            scale: [1, 1.3, 1],
            x: [0, 120, 0],
            y: [0, -60, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/15 to-blue-500/15 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.5],
            x: [0, -100, 0],
            y: [0, 100, 0],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-pink-500/15 to-green-500/15 rounded-full blur-3xl"
        />
        
        {/* Additional floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 80, 0],
            y: [0, -40, 0],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-gradient-to-r from-cyan-500/10 to-yellow-500/10 rounded-full blur-3xl"
        />
      </div>

      <section className="relative text-white py-24 px-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="max-w-5xl mx-auto text-center mb-24"
        >
          <motion.h2
            className="text-6xl md:text-7xl font-extrabold tracking-wide mb-8"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              backgroundPosition: { duration: 5, repeat: Infinity }
            }}
          >
            Discover the Magic of{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                backgroundPosition: { duration: 3, repeat: Infinity }
              }}
            >
              MultiMantra
            </motion.span>
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="w-40 h-1.5 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-8"
          />
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-gray-300 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto"
          >
            Your all-in-one digital ecosystem that transforms how you work, create, and connect online.{" "}
            <motion.span
              animate={{ 
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.03, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-purple-400 font-semibold block mt-2"
            >
              ✨ Four powerful tools, infinite possibilities ✨
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1.2,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ 
                scale: 1.08,
                y: -15,
                rotateY: 5
              }}
              className={`bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-700 ${service.hoverColor} hover:shadow-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer`}
            >
              {/* Enhanced card background animation */}
              <motion.div
                animate={{
                  background: [
                    `linear-gradient(135deg, ${service.bgGradient.split(' ')[0].replace('from-', 'rgba(').replace('-900/20', ', 0.1)')} 0%, transparent 60%)`,
                    `linear-gradient(135deg, ${service.bgGradient.split(' ')[1].replace('to-', 'rgba(').replace('-900/20', ', 0.15)')} 0%, transparent 60%)`,
                    `linear-gradient(135deg, ${service.bgGradient.split(' ')[0].replace('from-', 'rgba(').replace('-900/20', ', 0.1)')} 0%, transparent 60%)`
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute inset-0 rounded-3xl"
              />
              
              {/* Animated icon */}
              <motion.div
                className={`${service.textColor} text-5xl mb-6 relative z-10`}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: index * 0.7
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
              >
                {service.icon}
              </motion.div>
              
              {/* Content */}
              <div className="relative z-10">
                <motion.h3
                  className={`text-2xl font-bold mb-4 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    backgroundPosition: { duration: 4, repeat: Infinity }
                  }}
                >
                  {service.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  className="text-gray-300 text-sm mb-4 leading-relaxed"
                >
                  {service.description}
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                  className="text-gray-400 text-xs mb-6 leading-relaxed"
                >
                  {service.details}
                </motion.p>
                
                {/* Enhanced Button */}
                <Link href={service.link}>
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 15px 35px rgba(0,0,0,0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 5px 15px rgba(0,0,0,0.2)",
                        "0 10px 30px rgba(0,0,0,0.3)",
                        "0 5px 15px rgba(0,0,0,0.2)"
                      ]
                    }}
                    transition={{
                      boxShadow: { duration: 4, repeat: Infinity }
                    }}
                    className={`relative inline-flex items-center justify-center w-full p-1 overflow-hidden text-sm font-bold text-white rounded-xl group bg-gradient-to-r ${service.gradient} hover:scale-105 transition-all duration-300 cursor-pointer`}
                  >
                    {/* Button shine effect */}
                    <motion.div
                      animate={{
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 5
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                    
                    <span className="relative px-6 py-3 transition-all ease-in duration-300 bg-gray-900/90 backdrop-blur-md rounded-lg group-hover:bg-transparent w-full">
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="flex items-center justify-center gap-2"
                      >
                        Launch {service.title} 🚀
                      </motion.span>
                    </span>
                  </motion.button>
                </Link>
              </div>
              
              {/* Enhanced floating mini elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`mini-element-${i}`}
                  className={`absolute w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full opacity-50`}
                  style={{
                    left: `${10 + i * 30}%`,
                    top: `${5 + i * 20}%`
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: i * 0.7
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
        
        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2, type: "spring", stiffness: 80 }}
          className="text-center mt-24"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-xl border border-gray-600/50 rounded-3xl p-12 max-w-5xl mx-auto shadow-2xl relative overflow-hidden cursor-pointer"
          >
            {/* Enhanced background animation */}
            <motion.div
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(168,85,247,0.15), rgba(59,130,246,0.15))",
                  "linear-gradient(45deg, rgba(59,130,246,0.15), rgba(236,72,153,0.15))",
                  "linear-gradient(45deg, rgba(236,72,153,0.15), rgba(34,197,94,0.15))",
                  "linear-gradient(45deg, rgba(34,197,94,0.15), rgba(168,85,247,0.15))"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl"
            />
            
            <div className="relative z-10">
              <motion.h2
                className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  backgroundPosition: { duration: 6, repeat: Infinity }
                }}
              >
                Ready to Revolutionize Your Digital Experience?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                Join thousands of creators, professionals, and innovators who trust MultiMantra to power their digital journey
              </motion.p>
              
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-3xl md:text-4xl mb-6"
              >
                🌟 Your Digital Transformation Starts Here 🌟
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="flex flex-wrap justify-center gap-4 text-lg text-gray-400"
              >
                <span className="bg-purple-500/20 px-4 py-2 rounded-full">💸 Donate</span>
                <span className="bg-blue-500/20 px-4 py-2 rounded-full">🔗 Shorten</span>
                <span className="bg-green-500/20 px-4 py-2 rounded-full">🔗 Collect</span>
                <span className="bg-pink-500/20 px-4 py-2 rounded-full">✍️ Write</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}

export default serves
