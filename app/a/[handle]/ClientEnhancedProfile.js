"use client"
import { motion } from 'framer-motion';
import Link from "next/link";
import { useEffect, useState } from 'react';

const ClientEnhancedProfile = ({ item }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0 -z-10">
                {/* Animated gradient mesh */}
                <motion.div
                    animate={{
                        background: [
                            "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.12) 0%, transparent 70%)",
                            "radial-gradient(circle at 70% 70%, rgba(236,72,153,0.12) 0%, transparent 70%)",
                            "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)",
                            "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.12) 0%, transparent 70%)"
                        ]
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute inset-0"
                />
                
                {/* Floating elements - only render on client */}
                {isClient && Array.from({ length: 12 }).map((_, i) => {
                    const icons = ['🌟', '✨', '💫', '⭐', '🎯', '🚀', '💎', '🔗', '🌈', '💝', '🎨', '🌙'];
                    const icon = icons[i % icons.length];
                    
                    return (
                        <motion.div
                            key={`profile-icon-${i}`}
                            className="absolute opacity-20 pointer-events-none"
                            style={{
                                left: `${(i * 8) % 100}%`,
                                top: `${(i * 12) % 100}%`,
                                fontSize: `${16 + (i % 4) * 4}px`
                            }}
                            animate={{
                                y: [0, -25, 0],
                                x: [0, 15, 0],
                                rotate: [0, 360],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{
                                duration: 15 + (i % 4) * 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.8
                            }}
                        >
                            {icon}
                        </motion.div>
                    );
                })}
                
                {/* Enhanced floating orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 60, 0],
                        y: [0, -30, 0],
                        opacity: [0.06, 0.12, 0.06]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl"
                />
                
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.3],
                        x: [0, -40, 0],
                        y: [0, 50, 0],
                        opacity: [0.08, 0.15, 0.08]
                    }}
                    transition={{
                        duration: 24,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-gradient-to-r from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl"
                />
            </div>

            {/* Main Content */}
            <div className="flex min-h-screen pt-32 text-white justify-center items-start py-10 relative z-10">
                {item && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="photo flex justify-center flex-col items-center gap-6 max-w-lg w-full px-6"
                    >
                        {/* Enhanced Profile Container */}
                        <motion.div
                            className="relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Profile Picture with Enhanced Effects */}
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Animated Ring Around Profile */}
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-1 opacity-70"
                                >
                                    <div className="w-full h-full bg-gray-900 rounded-full"></div>
                                </motion.div>
                                
                                {/* Profile Image */}
                                <motion.img 
                                    width={140} 
                                    height={140}  
                                    className="rounded-full relative z-10 border-4 border-white/20 shadow-2xl"
                                    src={item.pic} 
                                    alt="Profile"
                                    animate={{
                                        boxShadow: [
                                            "0 0 30px rgba(168,85,247,0.3)",
                                            "0 0 50px rgba(236,72,153,0.4)",
                                            "0 0 30px rgba(168,85,247,0.3)"
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Enhanced Handle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-center"
                        >
                            <motion.span 
                                className="font-bold text-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                }}
                                transition={{
                                    backgroundPosition: { duration: 4, repeat: Infinity }
                                }}
                            >
                                @{item.handle}
                            </motion.span>
                            
                            {/* Animated underline */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"
                            />
                        </motion.div>

                        {/* Enhanced Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl"
                        >
                            <motion.span 
                                className="des text-gray-300 text-center block leading-relaxed"
                                animate={{
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                {item.des}
                            </motion.span>
                        </motion.div>

                        {/* Enhanced Links Container */}
                        <motion.div 
                            className="links w-full max-w-md"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            {item.links.map((linkItem, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        duration: 0.6, 
                                        delay: 0.8 + (index * 0.1) 
                                    }}
                                    whileHover={{ 
                                        scale: 1.03,
                                        rotateX: 2,
                                        rotateY: 2
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="my-4"
                                >
                                    <Link href={linkItem.link}>
                                        <motion.div 
                                            className="relative group cursor-pointer overflow-hidden"
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
                                        >
                                            {/* Animated Background Gradient */}
                                            <motion.div
                                                animate={{
                                                    background: [
                                                        "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
                                                        "linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(241,245,249,0.95) 100%)",
                                                        "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)"
                                                    ]
                                                }}
                                                transition={{ 
                                                    duration: 6, 
                                                    repeat: Infinity,
                                                    delay: index * 0.3 
                                                }}
                                                className="py-5 px-6 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl"
                                            >
                                                {/* Hover Effect Overlay */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                />
                                                
                                                {/* Link Text */}
                                                <motion.span
                                                    className="relative z-10 text-gray-800 font-semibold text-lg flex items-center justify-center gap-2"
                                                    animate={{
                                                        color: [
                                                            "rgb(31, 41, 55)",
                                                            "rgb(55, 65, 81)",
                                                            "rgb(31, 41, 55)"
                                                        ]
                                                    }}
                                                    transition={{ 
                                                        duration: 5, 
                                                        repeat: Infinity,
                                                        delay: index * 0.2 
                                                    }}
                                                >
                                                    <motion.span
                                                        animate={{
                                                            scale: [1, 1.1, 1],
                                                            rotate: [0, 5, 0]
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            delay: index * 0.5
                                                        }}
                                                        className="text-purple-600"
                                                    >
                                                        🔗
                                                    </motion.span>
                                                    {linkItem.linktext}
                                                </motion.span>
                                            </motion.div>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Enhanced Footer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="mt-8 text-center"
                        >
                            <motion.p
                                className="text-gray-400 text-sm"
                                animate={{
                                    opacity: [0.6, 0.8, 0.6]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                ✨ Powered by{" "}
                                <motion.span
                                    className="text-purple-400 font-semibold"
                                    animate={{
                                        textShadow: [
                                            "0 0 10px rgba(168,85,247,0.5)",
                                            "0 0 20px rgba(236,72,153,0.5)",
                                            "0 0 10px rgba(168,85,247,0.5)"
                                        ]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    MultiMantra
                                </motion.span>
                                {" "}✨
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ClientEnhancedProfile;