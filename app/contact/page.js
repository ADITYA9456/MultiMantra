"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 })
  const [isClient, setIsClient] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const showToast = (message, type) => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' })
    }, 4000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form submission with random success/failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = Math.random() > 0.3; // 70% success rate for demo
          if (success) {
            resolve();
          } else {
            reject(new Error('Network error'));
          }
        }, 2000);
      });
      
      setSubmitted(true)
      showToast('🎉 Message sent successfully! We\'ll get back to you soon.', 'success')
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', message: '' })
      }, 3000)
      
    } catch (error) {
      showToast('😞 Failed to send message. Please try again later.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Ultra Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Primary gradient background with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-blue-900/30"
        />
        
        {/* Animated mesh gradient */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120,119,198,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255,119,198,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(119,255,198,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(120,119,198,0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Animated grid with pulse effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Snowfall Effect */}
        {isClient && Array.from({ length: 50 }).map((_, i) => {
          const initialX = Math.random() * windowDimensions.width
          const fallDuration = Math.random() * 8 + 6
          const size = Math.random() * 6 + 2
          const drift = Math.random() * 100 - 50
          
          return (
            <motion.div
              key={`snow-${i}`}
              className="absolute bg-white/40 rounded-full shadow-lg"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${initialX}px`,
                top: `-${size}px`,
                boxShadow: `0 0 ${size * 2}px rgba(255,255,255,0.5)`
              }}
              animate={{
                y: windowDimensions.height + 100,
                x: drift,
                rotate: [0, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: fallDuration,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          )
        })}
        
        {/* Ping Pong Ball Effect */}
        {isClient && Array.from({ length: 8 }).map((_, i) => {
          const colors = ['bg-yellow-400', 'bg-orange-400', 'bg-red-400', 'bg-pink-400', 'bg-purple-400', 'bg-blue-400', 'bg-green-400', 'bg-cyan-400']
          const color = colors[i % colors.length]
          const size = Math.random() * 20 + 15
          const bounceHeight = Math.random() * 200 + 100
          const xMovement = Math.random() * 300 + 150
          
          return (
            <motion.div
              key={`ball-${i}`}
              className={`absolute ${color} rounded-full shadow-2xl`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * (windowDimensions.width - size)}px`,
                bottom: '0px',
                boxShadow: `0 0 ${size}px ${color.includes('yellow') ? 'rgba(255,255,0,0.6)' : 
                  color.includes('orange') ? 'rgba(255,165,0,0.6)' : 
                  color.includes('red') ? 'rgba(255,0,0,0.6)' : 
                  color.includes('pink') ? 'rgba(255,192,203,0.6)' : 
                  color.includes('purple') ? 'rgba(128,0,128,0.6)' : 
                  color.includes('blue') ? 'rgba(0,0,255,0.6)' : 
                  color.includes('green') ? 'rgba(0,255,0,0.6)' : 'rgba(0,255,255,0.6)'}`
              }}
              animate={{
                y: [-bounceHeight, 0, -bounceHeight],
                x: [0, xMovement, 0, -xMovement/2, 0],
                rotate: [0, 360, 720],
                scale: [1, 1.2, 1, 0.8, 1]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3
              }}
            />
          )
        })}
        
        {/* Floating Energy Orbs */}
        {isClient && Array.from({ length: 12 }).map((_, i) => {
          const colors = ['from-purple-500/20 to-pink-500/20', 'from-blue-500/20 to-cyan-500/20', 'from-green-500/20 to-emerald-500/20', 'from-yellow-500/20 to-orange-500/20']
          const color = colors[i % colors.length]
          const size = Math.random() * 150 + 80
          const initialX = Math.random() * windowDimensions.width
          const initialY = Math.random() * windowDimensions.height
          
          return (
            <motion.div
              key={`orb-${i}`}
              className={`absolute bg-gradient-to-r ${color} rounded-full blur-2xl`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${initialX}px`,
                top: `${initialY}px`,
              }}
              animate={{
                scale: [1, 1.5, 1, 0.8, 1],
                x: [0, Math.random() * 200 - 100, 0, Math.random() * 150 - 75, 0],
                y: [0, Math.random() * 200 - 100, 0, Math.random() * 150 - 75, 0],
                opacity: [0.3, 0.8, 0.3, 0.6, 0.3]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )
        })}
        
        {/* Spiral Particles */}
        {isClient && Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2
          const radius = 200
          const centerX = windowDimensions.width / 2
          const centerY = windowDimensions.height / 2
          
          return (
            <motion.div
              key={`spiral-${i}`}
              className="absolute bg-white/30 rounded-full"
              style={{
                width: '4px',
                height: '4px',
                left: `${centerX}px`,
                top: `${centerY}px`,
              }}
              animate={{
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.1
              }}
            />
          )
        })}
        
        {/* Enhanced floating orbs with better animation */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 200, -100, 0],
            y: [0, -120, 80, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.6, 1.2],
            rotate: [360, 180, 0],
            x: [0, -150, 100, 0],
            y: [0, 150, -80, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-3xl"
        />
        
        {/* Rotating energy rings */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-conic from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Ultra Enhanced Header */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
            className="text-center mb-24"
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 30px rgba(255,255,255,0.5)"
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                duration: 0.3,
                backgroundPosition: { duration: 5, repeat: Infinity }
              }}
            >
              Get in Touch
            </motion.h1>
            
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Have questions or want to collaborate? We'd love to hear from you.
              <motion.span
                animate={{ 
                  opacity: [1, 0.4, 1],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="block mt-3 text-purple-400 font-semibold"
              >
                ✨ Let's create something amazing together! ✨
              </motion.span>
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Ultra Enhanced Contact Info */}
            <motion.div
              initial={{ x: -150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, type: "spring", stiffness: 60 }}
              className="space-y-8"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-10 shadow-2xl relative overflow-hidden"
              >
                {/* Card background animation */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(147,51,234,0.1), rgba(219,39,119,0.1))",
                      "linear-gradient(45deg, rgba(219,39,119,0.1), rgba(59,130,246,0.1))",
                      "linear-gradient(45deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1))"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl"
                />
                
                <div className="relative z-10">
                  <motion.h2 
                    className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      backgroundPosition: { duration: 4, repeat: Infinity }
                    }}
                  >
                    Let's Connect
                  </motion.h2>
                  
                  <motion.p
                    className="text-gray-300 mb-10 text-lg leading-relaxed"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1.2 }}
                  >
                    Whether you have a project in mind, need support, or just want to say hello - we're here to help make your digital dreams a reality.
                  </motion.p>
                  
                  <div className="space-y-8">
                    {[
                      { icon: "📧", label: "Email", value: "contact@multimantra.com", color: "from-blue-400 to-cyan-400" },
                      { icon: "📱", label: "Phone", value: "+91 9876543210", color: "from-green-400 to-emerald-400" },
                      { icon: "📍", label: "Location", value: "Mumbai, India", color: "from-purple-400 to-pink-400" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.4 + index * 0.2, duration: 1, type: "spring", stiffness: 100 }}
                        whileHover={{ 
                          scale: 1.05, 
                          x: 15,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                        }}
                        className="flex items-center space-x-5 p-5 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 cursor-pointer"
                      >
                        <motion.span
                          animate={{ 
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="text-4xl"
                        >
                          {item.icon}
                        </motion.span>
                        <div>
                          <p className={`font-semibold text-xl bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                            {item.label}
                          </p>
                          <p className="text-gray-300 text-lg">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}

                  </div>
                </div>
              </motion.div>

              {/* Enhanced Social Media Links */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 1.2, type: "spring", stiffness: 80 }}
                className="flex justify-center space-x-8"
              >
                {[
                  { name: "Twitter", color: "from-blue-400 to-blue-600", icon: "🐦" },
                  { name: "LinkedIn", color: "from-blue-600 to-blue-800", icon: "💼" },
                  { name: "Instagram", color: "from-pink-400 to-purple-600", icon: "📷" },
                  { name: "GitHub", color: "from-gray-400 to-gray-600", icon: "💻" }
                ].map((social, index) => (
                  <motion.div
                    key={social.name}
                    whileHover={{ 
                      scale: 1.3, 
                      rotate: 360,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      y: [0, -5, 0],
                      boxShadow: [
                        "0 5px 15px rgba(0,0,0,0.2)",
                        "0 10px 25px rgba(0,0,0,0.3)",
                        "0 5px 15px rgba(0,0,0,0.2)"
                      ]
                    }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, delay: index * 0.5 },
                      boxShadow: { duration: 3, repeat: Infinity, delay: index * 0.5 }
                    }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300`}
                  >
                    <span className="text-white text-2xl">{social.icon}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Ultra Enhanced Contact Form */}
            <motion.div
              initial={{ x: 150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1, type: "spring", stiffness: 60 }}
            >
              <motion.form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-10 shadow-2xl space-y-8 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Form background animation */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(147,51,234,0.05), rgba(219,39,119,0.05))",
                      "linear-gradient(135deg, rgba(219,39,119,0.05), rgba(59,130,246,0.05))",
                      "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(147,51,234,0.05))"
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl"
                />
                
                <div className="relative z-10">
                  <motion.h3
                    className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ 
                      delay: 1.2, 
                      duration: 0.8,
                      backgroundPosition: { duration: 3, repeat: Infinity }
                    }}
                  >
                    Send us a Message
                  </motion.h3>

                  {/* Enhanced Form Fields */}
                  <div className="space-y-8">
                    {[
                      { name: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                      { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" }
                    ].map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.4 + index * 0.2, duration: 1, type: "spring", stiffness: 100 }}
                      >
                        <label className="block mb-3 text-xl font-medium text-gray-300">
                          {field.label}
                        </label>
                        <motion.input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          whileFocus={{ 
                            scale: 1.02, 
                            boxShadow: "0 0 30px rgba(147, 51, 234, 0.4)",
                            borderColor: "rgba(147, 51, 234, 0.8)"
                          }}
                          className="w-full p-5 rounded-xl bg-gray-800/90 border border-gray-600/50 text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                          placeholder={field.placeholder}
                          required
                        />
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.8, duration: 1, type: "spring", stiffness: 100 }}
                    >
                      <label className="block mb-3 text-xl font-medium text-gray-300">
                        Message
                      </label>
                      <motion.textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="6"
                        whileFocus={{ 
                          scale: 1.02, 
                          boxShadow: "0 0 30px rgba(147, 51, 234, 0.4)",
                          borderColor: "rgba(147, 51, 234, 0.8)"
                        }}
                        className="w-full p-5 rounded-xl bg-gray-800/90 border border-gray-600/50 text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 resize-none"
                        placeholder="Tell us about your project, ask a question, or just say hello..."
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Enhanced Submit Button */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 1, type: "spring", stiffness: 100 }}
                    className="pt-6"
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || submitted}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: [
                          "0 5px 15px rgba(147,51,234,0.3)",
                          "0 10px 25px rgba(147,51,234,0.4)",
                          "0 5px 15px rgba(147,51,234,0.3)"
                        ]
                      }}
                      transition={{
                        boxShadow: { duration: 2, repeat: Infinity }
                      }}
                      className={`w-full py-5 px-8 rounded-xl font-bold text-xl shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden ${
                        submitted 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                      }`}
                    >
                      <motion.div
                        animate={{
                          background: [
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                          ],
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                        className="absolute inset-0 w-full h-full"
                      />
                      
                      <div className="relative z-10">
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-8 h-8 border-3 border-white border-t-transparent rounded-full"
                          />
                        ) : submitted ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center justify-center"
                          >
                            ✅ Message Sent!
                          </motion.span>
                        ) : (
                          <motion.span
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Send Message 🚀
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ultra Enhanced Toast Notification */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: -100, scale: 0.8, rotate: 10 }}
          className="fixed top-24 right-8 z-50 max-w-sm"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                "0 10px 30px rgba(0,0,0,0.3)",
                "0 20px 40px rgba(0,0,0,0.4)",
                "0 10px 30px rgba(0,0,0,0.3)"
              ],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className={`p-6 rounded-2xl backdrop-blur-lg border-2 flex items-center space-x-4 relative overflow-hidden ${
              toast.type === 'success' 
                ? 'bg-gradient-to-r from-green-900/95 to-emerald-900/95 border-green-500/60 text-green-100' 
                : 'bg-gradient-to-r from-red-900/95 to-rose-900/95 border-red-500/60 text-red-100'
            }`}
          >
            {/* Toast background animation */}
            <motion.div
              animate={{
                background: toast.type === 'success' 
                  ? [
                      "linear-gradient(45deg, rgba(34,197,94,0.1), rgba(16,185,129,0.1))",
                      "linear-gradient(45deg, rgba(16,185,129,0.1), rgba(34,197,94,0.1))"
                    ]
                  : [
                      "linear-gradient(45deg, rgba(239,68,68,0.1), rgba(244,63,94,0.1))",
                      "linear-gradient(45deg, rgba(244,63,94,0.1), rgba(239,68,68,0.1))"
                    ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl"
            />
            
            <div className="relative z-10 flex items-center space-x-4 w-full">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl"
              >
                {toast.type === 'success' ? '🎉' : '😞'}
              </motion.div>
              <div className="flex-1">
                <motion.p 
                  className="font-semibold text-lg"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {toast.message}
                </motion.p>
              </div>
              <motion.button
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setToast({ show: false, message: '', type: '' })}
                className="text-2xl hover:opacity-70 transition-opacity font-bold"
              >
                ×
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}

export default Contact