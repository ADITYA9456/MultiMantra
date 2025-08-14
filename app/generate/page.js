"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Generate = () => {
    const searchParams = useSearchParams()
    const router = useRouter();

    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get('handle'))
    const [pic, setpic] = useState("")
    const [des, setdes] = useState("")

    const [linkCreated, setLinkCreated] = useState(false);
    const [isAvailable, setIsAvailable] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const setlink = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }
                else {
                    return item
                }
            })
        })
    }

    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
        toast.success("New link field added! 🔗", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    const removeLink = (index) => {
        if (links.length > 1) {
            setLinks(links.filter((_, i) => i !== index))
            toast.info("Link removed! 🗑️", {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
            })
        }
    }

    const handleClick = () => {
        if (handle.trim()) {
            router.push(`/a/${handle}`);
        }
    };

    const submitLink = async () => {
        if (!handle.trim()) {
            toast.error("Please enter a handle! 🎯", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            })
            return
        }
        
        if (links.length === 0 || !links[0].link.trim()) {
            toast.error("Please add at least one link! 🔗", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            })
            return
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        setIsLoading(true);
        
        toast.info("Creating your link tree... ⏳", {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
        })

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "des": des
        });

        console.log(raw)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const r = await fetch("/api/link", requestOptions)
            const result = await r.json()

            if (result.success) {
                setLinkCreated(true);
                toast.success(result.message + " 🎉", {
                    position: "top-right",
                    autoClose: 4000,
                    theme: "dark",
                })
                setLinks([{ link: "", linktext: "" }])
                setpic("")
                setdes("")
            }
            else {
                toast.error(result.message + " 😞", {
                    position: "top-right",
                    autoClose: 4000,
                    theme: "dark",
                })
            }
        } catch (error) {
            toast.error("Network error! Please try again. 🚨", {
                position: "top-right",
                autoClose: 4000,
                theme: "dark",
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0 -z-10">
                {/* Animated gradient mesh */}
                <motion.div
                    animate={{
                        background: [
                            "radial-gradient(circle at 25% 25%, rgba(168,85,247,0.15) 0%, transparent 70%)",
                            "radial-gradient(circle at 75% 75%, rgba(236,72,153,0.15) 0%, transparent 70%)",
                            "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 70%)",
                            "radial-gradient(circle at 25% 25%, rgba(168,85,247,0.15) 0%, transparent 70%)"
                        ]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute inset-0"
                />
                
                {/* Fixed floating elements - only render on client */}
                {isClient && Array.from({ length: 15 }).map((_, i) => {
                    const icons = ['🔗', '✨', '🌟', '💫', '⚡', '🎯', '💎', '🚀', '🎨', '📱', '💻', '🌈', '🔮', '💡', '🎭'];
                    const icon = icons[i % icons.length];
                    
                    return (
                        <motion.div
                            key={`generate-icon-${i}`}
                            className="absolute opacity-20 pointer-events-none"
                            style={{
                                left: `${(i * 7) % 100}%`,
                                top: `${(i * 11) % 100}%`,
                                fontSize: `${18 + (i % 3) * 5}px`
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 20, 0],
                                rotate: [0, 360],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{
                                duration: 12 + (i % 3) * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                            }}
                        >
                            {icon}
                        </motion.div>
                    );
                })}
                
                {/* Enhanced floating orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 80, 0],
                        y: [0, -40, 0],
                        opacity: [0.08, 0.15, 0.08]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
                />
                
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.4],
                        x: [0, -60, 0],
                        y: [0, 70, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
                />

                {/* Additional decorative elements */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.05, 0.1, 0.05]
                    }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-3/4 left-1/2 w-[200px] h-[200px] bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-2xl"
                />
            </div>

            {/* Enhanced Header */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 pt-32 pb-12"
            >
                <motion.h1 
                    className="text-4xl md:text-6xl font-extrabold text-white text-center mb-4"
                    animate={{
                        textShadow: [
                            "0 0 20px rgba(168,85,247,0.5)",
                            "0 0 40px rgba(236,72,153,0.5)",
                            "0 0 20px rgba(168,85,247,0.5)"
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    Create your LinkTree with{" "}
                    <motion.span 
                        className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        }}
                        transition={{
                            backgroundPosition: { duration: 3, repeat: Infinity }
                        }}
                    >
                        MULTIMANTRA
                    </motion.span>
                </motion.h1>
                
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
                />
                
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-gray-300 mt-4 max-w-2xl mx-auto px-4"
                >
                    ✨ Build your personalized link page in minutes with our powerful platform ✨
                </motion.p>
            </motion.div>

            <div className="min-h-screen text-white flex flex-col lg:flex-row items-start justify-between px-6 md:px-12 lg:px-20 py-8 gap-12 relative z-10">
                {/* Left Section - Enhanced Form */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex-1 max-w-2xl"
                >
                    {/* Step 1 - Enhanced Handle Input */}
                    <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl relative overflow-hidden"
                    >
                        <motion.div
                            animate={{
                                background: [
                                    "linear-gradient(135deg, rgba(168,85,247,0.05) 0%, transparent 50%)",
                                    "linear-gradient(135deg, rgba(236,72,153,0.05) 0%, transparent 50%)",
                                    "linear-gradient(135deg, rgba(168,85,247,0.05) 0%, transparent 50%)"
                                ]
                            }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute inset-0 rounded-3xl"
                        />
                        
                        <div className="relative z-10">
                            <motion.h2 
                                className="text-3xl font-bold text-white mb-6 flex items-center gap-3"
                                animate={{
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <span className="text-purple-400 text-4xl">🎯</span>
                                Step 1: Claim your Handle
                            </motion.h2>
                            
                            <div className="relative">
                                <motion.input
                                    type="text"
                                    value={handle || ""}
                                    onChange={async (e) => {
                                        const value = e.target.value;
                                        sethandle(value);

                                        if (value.trim()) {
                                            try {
                                                const res = await fetch(`/api/checkHandle?handle=${value}`);
                                                const data = await res.json();

                                                if (data.exists) {
                                                    setIsAvailable(false);
                                                    toast.warning("Handle already exists! 🔍", {
                                                        position: "top-right",
                                                        autoClose: 2000,
                                                        theme: "dark",
                                                    })
                                                } else {
                                                    setIsAvailable(true);
                                                    toast.success("Handle available! ✅", {
                                                        position: "top-right",
                                                        autoClose: 2000,
                                                        theme: "dark",
                                                    })
                                                }
                                            } catch (err) {
                                                console.error('Error checking handle:', err);
                                                toast.error("Error checking handle! 😞", {
                                                    position: "top-right",
                                                    autoClose: 2000,
                                                    theme: "dark",
                                                })
                                            }
                                        }
                                    }}
                                    placeholder="Enter your unique handle..."
                                    whileFocus={{ scale: 1.02 }}
                                    className="w-full p-5 text-lg rounded-2xl border-2 border-gray-600 bg-gray-800/60 backdrop-blur-md text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300 pr-12"
                                />
                                
                                {/* Handle validation indicator */}
                                {handle && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                    >
                                        {isAvailable === true && (
                                            <span className="text-green-400 text-xl">✅</span>
                                        )}
                                        {isAvailable === false && (
                                            <span className="text-red-400 text-xl">❌</span>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                            
                            <motion.p
                                className="text-gray-400 text-sm mt-3"
                                animate={{
                                    opacity: [0.6, 1, 0.6]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Your handle will be: <span className="text-purple-400 font-semibold">multimantra.com/{handle || "yourhandle"}</span>
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Step 2 - Enhanced Links Section */}
                    <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mb-8 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl relative overflow-hidden"
                    >
                        <motion.div
                            animate={{
                                background: [
                                    "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, transparent 50%)",
                                    "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, transparent 50%)",
                                    "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, transparent 50%)"
                                ]
                            }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute inset-0 rounded-3xl"
                        />
                        
                        <div className="relative z-10">
                            <motion.h2 
                                className="text-3xl font-bold text-white mb-6 flex items-center gap-3"
                                animate={{
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <span className="text-blue-400 text-4xl">🔗</span>
                                Step 2: Add Your Links
                            </motion.h2>
                            
                            <div className="space-y-4">
                                {links && links.map((item, index) => (
                                    <motion.div 
                                        key={index} 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-4 border border-gray-700/30"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-300 font-medium">Link #{index + 1}</span>
                                            {links.length > 1 && (
                                                <motion.button
                                                    onClick={() => removeLink(index)}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    🗑️
                                                </motion.button>
                                            )}
                                        </div>
                                        
                                        <div className="flex gap-3 flex-col sm:flex-row">
                                            <motion.input 
                                                value={item.link || ""} 
                                                onChange={e => setlink(index, e.target.value, item.linktext)} 
                                                type="url" 
                                                placeholder="https://example.com" 
                                                whileFocus={{ scale: 1.02 }}
                                                className="flex-1 p-4 rounded-xl border-2 border-gray-600 bg-gray-800/60 backdrop-blur-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
                                            />
                                            <motion.input 
                                                value={item.linktext || ""} 
                                                onChange={e => setlink(index, item.link, e.target.value)} 
                                                type="text" 
                                                placeholder="Link Title" 
                                                whileFocus={{ scale: 1.02 }}
                                                className="flex-1 p-4 rounded-xl border-2 border-gray-600 bg-gray-800/60 backdrop-blur-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <motion.button 
                                onClick={addLink} 
                                type="button" 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-2"
                            >
                                <span className="text-xl">➕</span>
                                Add Another Link
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Step 3 - Enhanced Profile Section */}
                    <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mb-8 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/50 shadow-2xl relative overflow-hidden"
                    >
                        <motion.div
                            animate={{
                                background: [
                                    "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, transparent 50%)",
                                    "linear-gradient(135deg, rgba(245,101,101,0.05) 0%, transparent 50%)",
                                    "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, transparent 50%)"
                                ]
                            }}
                            transition={{ duration: 12, repeat: Infinity }}
                            className="absolute inset-0 rounded-3xl"
                        />
                        
                        <div className="relative z-10">
                            <motion.h2 
                                className="text-3xl font-bold text-white mb-6 flex items-center gap-3"
                                animate={{
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <span className="text-green-400 text-4xl">🎨</span>
                                Step 3: Customize Your Profile
                            </motion.h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Profile Picture URL</label>
                                    <motion.input 
                                        value={pic || ""} 
                                        onChange={e => setpic(e.target.value)} 
                                        type="url" 
                                        placeholder="https://example.com/your-photo.jpg" 
                                        whileFocus={{ scale: 1.02 }}
                                        className="w-full p-4 rounded-xl border-2 border-gray-600 bg-gray-800/60 backdrop-blur-md text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-all duration-300"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">Bio/Description</label>
                                    <motion.textarea 
                                        value={des || ""} 
                                        onChange={e => setdes(e.target.value)} 
                                        placeholder="Tell people about yourself..." 
                                        rows={4}
                                        whileFocus={{ scale: 1.02 }}
                                        className="w-full p-4 rounded-xl border-2 border-gray-600 bg-gray-800/60 backdrop-blur-md text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-all duration-300 resize-none"
                                    />
                                </div>
                                
                                {/* Live Preview */}
                                {(pic || des) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4 border border-gray-700/30"
                                    >
                                        <h3 className="text-white font-semibold mb-3">Live Preview:</h3>
                                        <div className="flex items-center gap-4">
                                            {pic && (
                                                <Image 
                                                    src={pic} 
                                                    alt="Profile preview" 
                                                    width={48}
                                                    height={48}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            )}
                                            {des && (
                                                <p className="text-gray-300 text-sm">{des}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Enhanced Action Buttons */}
                    <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex gap-4 flex-col sm:flex-row"
                    >
                        <motion.button 
                            onClick={submitLink} 
                            disabled={isLoading}
                            whileHover={{ scale: isLoading ? 1 : 1.05 }}
                            whileTap={{ scale: isLoading ? 1 : 0.95 }}
                            className={`flex-1 text-white font-bold py-4 px-8 rounded-xl text-center transition-all duration-300 shadow-lg ${
                                isLoading 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 cursor-pointer'
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                    Creating...
                                </span>
                            ) : (
                                "🚀 Create Your Link Tree"
                            )}
                        </motion.button>

                        {linkCreated && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 font-bold py-4 px-8 rounded-xl text-center transition-all duration-300 cursor-pointer shadow-lg"
                                onClick={() => router.push(`/a/${handle}`)}
                            >
                                🎯 View Your Page
                            </motion.button>
                        )}
                    </motion.div>
                </motion.div>

                {/* Right Section - Enhanced Image with Amazing Animations */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="flex-1 max-w-md mx-auto lg:mx-0"
                >
                    <motion.div
                        whileHover={{ scale: 1.03, rotateY: 5 }}
                        transition={{ duration: 0.4 }}
                        className="sticky top-20"
                    >
                        {/* Enhanced Background Animation */}
                        <motion.div
                            animate={{
                                boxShadow: [
                                    "0 25px 50px rgba(168,85,247,0.25)",
                                    "0 35px 70px rgba(236,72,153,0.35)",
                                    "0 45px 90px rgba(59,130,246,0.25)",
                                    "0 25px 50px rgba(168,85,247,0.25)"
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="relative rounded-3xl overflow-hidden"
                        >
                            {/* Animated Border Effect */}
                            <motion.div
                                animate={{
                                    background: [
                                        "linear-gradient(45deg, rgba(168,85,247,0.4) 0%, rgba(236,72,153,0.4) 25%, rgba(59,130,246,0.4) 50%, rgba(16,185,129,0.4) 75%, rgba(168,85,247,0.4) 100%)",
                                        "linear-gradient(45deg, rgba(236,72,153,0.4) 0%, rgba(59,130,246,0.4) 25%, rgba(16,185,129,0.4) 50%, rgba(168,85,247,0.4) 75%, rgba(236,72,153,0.4) 100%)",
                                        "linear-gradient(45deg, rgba(59,130,246,0.4) 0%, rgba(16,185,129,0.4) 25%, rgba(168,85,247,0.4) 50%, rgba(236,72,153,0.4) 75%, rgba(59,130,246,0.4) 100%)",
                                        "linear-gradient(45deg, rgba(168,85,247,0.4) 0%, rgba(236,72,153,0.4) 25%, rgba(59,130,246,0.4) 50%, rgba(16,185,129,0.4) 75%, rgba(168,85,247,0.4) 100%)"
                                    ]
                                }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="absolute inset-0 rounded-3xl p-1"
                            >
                                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl"></div>
                            </motion.div>

                            {/* Main Image Container */}
                            <motion.div
                                className="relative z-10 p-6"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                {/* Floating Particles Around Image */}
                                {isClient && Array.from({ length: 6 }).map((_, i) => (
                                    <motion.div
                                        key={`particle-${i}`}
                                        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                                        style={{
                                            left: `${15 + (i * 15)}%`,
                                            top: `${10 + (i * 10)}%`,
                                        }}
                                        animate={{
                                            y: [0, -20, 0],
                                            x: [0, 10, 0],
                                            scale: [1, 1.5, 1],
                                            opacity: [0.6, 1, 0.6]
                                        }}
                                        transition={{
                                            duration: 3 + i * 0.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: i * 0.8
                                        }}
                                    />
                                ))}

                                {/* Enhanced Image with Multiple Animation Layers */}
                                <motion.div
                                    className="relative"
                                    animate={{
                                        rotateY: [0, 2, 0, -2, 0],
                                        rotateX: [0, 1, 0, -1, 0]
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {/* Glow Effect Behind Image */}
                                    <motion.div
                                        animate={{
                                            opacity: [0.3, 0.7, 0.3],
                                            scale: [0.95, 1.05, 0.95]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl"
                                    />

                                    {/* Main Image */}
                                    <motion.img
                                        src="/generate.png"
                                        alt="LinkTree Generation Preview"
                                        className="relative z-10 rounded-3xl w-full h-auto max-w-lg shadow-2xl"
                                        whileHover={{
                                            scale: 1.05,
                                            rotateY: 8,
                                            rotateX: 2
                                        }}
                                        animate={{
                                            y: [0, -10, 0],
                                        }}
                                        transition={{
                                            y: {
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            },
                                            hover: {
                                                duration: 0.3
                                            }
                                        }}
                                    />

                                    {/* Reflection Effect */}
                                    <motion.div
                                        className="absolute top-full left-0 w-full h-1/2 bg-gradient-to-b from-gray-800/20 to-transparent rounded-b-3xl transform scale-y-[-1] opacity-30"
                                        animate={{
                                            opacity: [0.2, 0.4, 0.2]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>

                                {/* Floating Text Labels */}
                                <motion.div
                                    className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                                    animate={{
                                        y: [0, -8, 0],
                                        rotate: [0, 5, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    ✨ Preview
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                                    animate={{
                                        y: [0, 8, 0],
                                        rotate: [0, -5, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1.5
                                    }}
                                >
                                    🚀 Live
                                </motion.div>

                                {/* Additional Corner Decorations */}
                                <motion.div
                                    className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.8, 1, 0.8]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                <motion.div
                                    className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-80"
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0.8, 1, 0.8]
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

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

export default Generate;