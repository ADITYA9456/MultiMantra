"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate consistent random values for particles
  const particleData = useState(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      initialX: Math.random() * 1200,
      initialY: Math.random() * 800,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 15 + 10
    }))
  )[0];

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  return (
    <main
      className="relative pt-24"
      style={{
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="w-full h-full"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
            filter: "blur(40px)",
            opacity: 0.8,
          }}
        />
        
        {/* Fixed Floating Particles */}
        {particleData.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            initial={{ 
              x: particle.initialX,
              y: particle.initialY,
              opacity: 0,
              scale: particle.scale
            }}
            animate={{
              x: [particle.initialX, particle.initialX + 100, particle.initialX],
              y: [particle.initialY, particle.initialY + 50, particle.initialY],
              opacity: [0, 1, 0],
              scale: [particle.scale, particle.scale * 1.5, particle.scale],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Fixed Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, 360],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-r from-green-500/15 to-teal-500/15 rounded-full blur-2xl"
        />
      </div>

      {/* Enhanced Landing Page */}
      <section className="mainpage relative">
        <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 text-center">
          <motion.div
            initial={{ scale: 0.3, opacity: 0, y: -100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.6 }}
            className="flex items-center space-x-4 mb-12"
          >
            <motion.div
              whileHover={{ 
                rotate: 360,
                scale: 1.3,
                boxShadow: "0 0 30px rgba(255, 255, 0, 0.8)"
              }}
              transition={{ duration: 0.8, type: "spring" }}
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-2xl"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                M
              </motion.span>
            </motion.div>
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl md:text-5xl font-bold tracking-wide bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
            >
              MULTIMANTRA
            </motion.h1>
          </motion.div>

          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
          >
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                backgroundSize: "200% 200%"
              }}
            >
              One Mantra, Many Solutions.
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed"
          >
            <motion.span
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Simplify your digital life with our comprehensive suite of tools designed for modern productivity
            </motion.span>
          </motion.p>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="relative"
          >
            {/* Main Get Started button */}
            <Link href="#feature">
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 40px rgba(225, 0, 255, 0.8)"
                }}
                whileTap={{ scale: 0.9 }}
                className="relative px-12 py-5 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden cursor-pointer"
              >
                <motion.span 
                  className="relative z-10"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Get Started
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center cursor-pointer hover:border-white/70 transition-colors"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-4 bg-white/60 rounded-full mt-3"
              />
            </motion.div>
            <motion.p
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/60 text-sm mt-2"
            >
              Scroll Down
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="About text-white py-32 px-6 md:px-20 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ x: -150, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              whileInView={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 1 }}
            >
              About Us
            </motion.h2>
            
            <motion.p 
              className="text-cyan-300 text-2xl font-medium mb-10 leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              At MultiMantra, we believe in simplifying your digital life.
            </motion.p>
            
            <motion.div 
              className="space-y-6"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <p className="text-gray-300 text-xl leading-relaxed">
                Whether it's managing your daily tasks, sharing links, supporting causes, or shopping online — we bring it all under one roof.
              </p>
              <div className="space-y-4">
                <motion.span 
                  className="block font-bold text-3xl text-purple-400"
                  whileInView={{ x: [0, 20, 0] }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  Our goal?
                </motion.span>
                <motion.span 
                  className="block text-xl text-purple-300"
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  To empower you with smart, seamless, and secure tools that just work.
                </motion.span>
                <motion.span 
                  className="block text-xl text-purple-300"
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  Join us on this journey where One Mantra = Many Solutions.
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ x: 150, opacity: 0, scale: 0.8 }}
            whileInView={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-lg opacity-30"
              />
              <Image 
                width={500} 
                height={500} 
                src="/pro.png" 
                alt="Team working" 
                className="relative rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-3xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="feature" className="feature py-32 px-6 relative">
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <motion.h2 
            className="text-6xl md:text-7xl font-bold text-white mb-20 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            Our Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl w-full">
            {[
              {
                img: "/coin2.gif",
                title: "Donation",
                desc: "Support causes with ease",
                link: "/dashboard",
                color: "from-green-500 to-emerald-600"
              },
              {
                img: "/link.gif",
                title: "MantraShort",
                desc: "Shorten and share links",
                link: "/lite",
                color: "from-blue-500 to-cyan-600"
              },
              {
                img: "/layer.gif",
                title: "MultiLinks",
                desc: "Organize your links on one page",
                link: "/link",
                color: "from-purple-500 to-pink-600"
              },
              {
                img: "/blog.gif",
                title: "WriteMantra",
                desc: "Write, express, and share your story with the world.",
                link: "/blog",
                color: "from-orange-500 to-red-600"
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ y: 100, opacity: 0, rotateX: -45 }}
                whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: idx * 0.3,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.08,
                  rotateY: 8,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
                }}
                className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-10 shadow-2xl overflow-hidden cursor-pointer"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-15 transition-opacity duration-700`}
                />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="mb-8 cursor-pointer"
                  >
                    <Image 
                      width={100} 
                      height={100} 
                      src={feature.img} 
                      alt={feature.title}
                      className="drop-shadow-2xl"
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <p className="text-gray-400 mb-10 text-xl leading-relaxed">
                    {feature.desc}
                  </p>
                  
                  <Link href={feature.link}>
                    <motion.button
                      whileHover={{
                        scale: 1.15,
                        boxShadow: "0 0 35px rgba(225, 0, 255, 0.7)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative px-10 py-4 text-white font-semibold rounded-full bg-gradient-to-r ${feature.color} shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer`}
                    >
                      <span className="relative z-10 text-lg">Get Started</span>
                      <motion.div
                        className="absolute inset-0 bg-white/25 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                      />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}