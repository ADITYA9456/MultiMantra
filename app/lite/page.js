"use client"
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { FaBolt, FaChartBar, FaLink, FaShieldAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const lite = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Welcome toast
        toast.info("Welcome to the best URL shortener! 🚀", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    }, []);

    return (
        <main className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0 -z-10">
                {/* Animated gradient mesh */}
                <motion.div
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.1) 0%, transparent 70%)",
                            "radial-gradient(circle at 80% 80%, rgba(236,72,153,0.1) 0%, transparent 70%)",
                            "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)",
                            "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.1) 0%, transparent 70%)"
                        ]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute inset-0"
                />
                
                {/* Floating elements */}
                {isClient && Array.from({ length: 10 }).map((_, i) => {
                    const icons = ['🔗', '✨', '🚀', '💫', '⚡', '🌟', '💎', '🎯', '💝', '🌈'];
                    const icon = icons[i % icons.length];
                    
                    return (
                        <motion.div
                            key={`lite-icon-${i}`}
                            className="absolute opacity-20 pointer-events-none"
                            style={{
                                left: `${(i * 10) % 100}%`,
                                top: `${(i * 15) % 100}%`,
                                fontSize: `${16 + (i % 3) * 6}px`
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 15, 0],
                                rotate: [0, 360],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{
                                duration: 12 + (i % 3) * 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.7
                            }}
                        >
                            {icon}
                        </motion.div>
                    );
                })}
                
                {/* Enhanced floating orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        x: [0, 70, 0],
                        y: [0, -50, 0],
                        opacity: [0.05, 0.12, 0.05]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl"
                />
                
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.5],
                        x: [0, -50, 0],
                        y: [0, 60, 0],
                        opacity: [0.06, 0.15, 0.06]
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-gradient-to-r from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl"
                />
            </div>

            {/* Enhanced Hero Section with Fixed Spacing */}
            <section className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-screen items-center pt-32 pb-16">
                {/* Enhanced Left Side */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col justify-center items-center gap-8 p-6 md:p-8"
                >
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center"
                    >
                        <motion.h1 
                            className="text-4xl md:text-6xl font-extrabold mb-4"
                            animate={{
                                textShadow: [
                                    "0 0 30px rgba(168,85,247,0.3)",
                                    "0 0 50px rgba(236,72,153,0.3)",
                                    "0 0 30px rgba(168,85,247,0.3)"
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <motion.span
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                }}
                                transition={{ 
                                    backgroundPosition: { duration: 4, repeat: Infinity }
                                }}
                                className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-5xl md:text-7xl"
                                style={{ backgroundSize: "200% 200%" }}
                            >
                                The best URL shortener
                            </motion.span>
                        </motion.h1>
                        
                        <motion.span
                            animate={{
                                textShadow: [
                                    "0 0 20px rgba(168,85,247,0.5)",
                                    "0 0 40px rgba(236,72,153,0.5)",
                                    "0 0 20px rgba(168,85,247,0.5)"
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="text-white text-3xl md:text-5xl font-bold"
                        >
                            in the world
                        </motion.span>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl max-w-2xl"
                    >
                        <motion.p 
                            className="text-center text-gray-300 text-lg leading-relaxed"
                            animate={{
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            This is a quick and easy tool that shortens long links, making them simple to share. Whether for social media, business, or daily use, it creates short and clean URLs that are easy to remember. It also helps track link performance, ensuring smooth redirection and better link management.
                        </motion.p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Link href="/shorten">
                            <motion.button 
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 15px 35px rgba(168,85,247,0.4)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    toast.success("Redirecting to URL shortener! 🎯", {
                                        position: "top-right",
                                        autoClose: 2000,
                                        theme: "dark",
                                    });
                                }}
                                className="relative overflow-hidden rounded-2xl font-bold cursor-pointer bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-xl px-12 py-4 shadow-2xl transition-all duration-300"
                            >
                                <motion.div
                                    animate={{
                                        x: ["-100%", "100%"]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                />
                                <span className="relative z-10 flex items-center gap-3">
                                    🚀 Try now
                                </span>
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Enhanced Right Side - Image */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="flex justify-center items-center p-6 md:p-8"
                >
                    <motion.div
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        transition={{ duration: 0.4 }}
                        className="relative"
                    >
                        {/* Enhanced Background Effects */}
                        <motion.div
                            animate={{
                                boxShadow: [
                                    "0 25px 50px rgba(168,85,247,0.3)",
                                    "0 35px 70px rgba(236,72,153,0.4)",
                                    "0 45px 90px rgba(59,130,246,0.3)",
                                    "0 25px 50px rgba(168,85,247,0.3)"
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute inset-0 rounded-full"
                        />
                        
                        {/* Animated Border */}
                        <motion.div
                            animate={{
                                background: [
                                    "linear-gradient(45deg, rgba(168,85,247,0.6) 0%, rgba(236,72,153,0.6) 50%, rgba(59,130,246,0.6) 100%)",
                                    "linear-gradient(45deg, rgba(236,72,153,0.6) 0%, rgba(59,130,246,0.6) 50%, rgba(168,85,247,0.6) 100%)",
                                    "linear-gradient(45deg, rgba(59,130,246,0.6) 0%, rgba(168,85,247,0.6) 50%, rgba(236,72,153,0.6) 100%)"
                                ]
                            }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute inset-0 rounded-full p-2"
                        >
                            <div className="w-full h-full bg-gray-900 rounded-full"></div>
                        </motion.div>
                        
                        {/* Main Image */}
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 2, 0]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative z-10"
                        >
                            <Image
                                className="w-72 h-72 md:w-96 md:h-96 rounded-full shadow-2xl"
                                src="/link.png"
                                alt="URL Shortener"
                                width={384}
                                height={384}
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Enhanced Features Section */}
            <section id="features" className="relative z-10 py-20 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold mb-16"
                        animate={{
                            textShadow: [
                                "0 0 20px rgba(168,85,247,0.3)",
                                "0 0 30px rgba(236,72,153,0.3)",
                                "0 0 20px rgba(168,85,247,0.3)"
                            ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        Why choose{" "}
                        <motion.span 
                            className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{ 
                                backgroundPosition: { duration: 3, repeat: Infinity }
                            }}
                            style={{ backgroundSize: "200% 200%" }}
                        >
                            US?
                        </motion.span>
                    </motion.h2>
                    
                    <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {[
                            { icon: FaLink, title: 'Custom Short Links', desc: 'Create branded, memorable URLs that represent your brand.', color: 'from-purple-500 to-pink-500' },
                            { icon: FaChartBar, title: 'Analytics & Tracking', desc: 'Monitor link performance with detailed analytics and insights.', color: 'from-blue-500 to-cyan-500' },
                            { icon: FaBolt, title: 'Fast Redirects', desc: 'Experience lightning-quick and reliable redirection every time.', color: 'from-yellow-500 to-orange-500' },
                            { icon: FaShieldAlt, title: 'Secure & Private', desc: 'Keep your data safe with privacy-focused URL shortening.', color: 'from-green-500 to-teal-500' }
                        ].map(({ icon: Icon, title, desc, color }, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ 
                                    scale: 1.05,
                                    rotateY: 5,
                                    z: 10
                                }}
                                className="relative group cursor-pointer"
                                onClick={() => {
                                    toast.info(`${title} - ${desc} 🎯`, {
                                        position: "top-right",
                                        autoClose: 3000,
                                        theme: "dark",
                                    });
                                }}
                            >
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            "0 8px 25px rgba(168,85,247,0.15)",
                                            "0 12px 35px rgba(236,72,153,0.2)",
                                            "0 8px 25px rgba(168,85,247,0.15)"
                                        ]
                                    }}
                                    transition={{ 
                                        duration: 4, 
                                        repeat: Infinity,
                                        delay: index * 0.5 
                                    }}
                                    className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300"
                                >
                                    {/* Animated Icon Background */}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className={`w-20 h-20 rounded-full bg-gradient-to-r ${color} p-4 mx-auto mb-6 shadow-lg`}
                                    >
                                        <Icon className="text-white text-3xl w-full h-full" />
                                    </motion.div>
                                    
                                    <motion.h3 
                                        className="font-bold text-xl mb-4 text-white"
                                        animate={{
                                            opacity: [0.8, 1, 0.8]
                                        }}
                                        transition={{ 
                                            duration: 3, 
                                            repeat: Infinity,
                                            delay: index * 0.3 
                                        }}
                                    >
                                        {title}
                                    </motion.h3>
                                    
                                    <motion.p 
                                        className="text-gray-300 leading-relaxed"
                                        animate={{
                                            opacity: [0.7, 0.9, 0.7]
                                        }}
                                        transition={{ 
                                            duration: 4, 
                                            repeat: Infinity,
                                            delay: index * 0.4 
                                        }}
                                    >
                                        {desc}
                                    </motion.p>
                                    
                                    {/* Hover Effect Overlay */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Enhanced Toast Container */}
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastClassName="backdrop-blur-md"
                bodyClassName="text-sm"
            />
        </main>
    );
};

export default lite;