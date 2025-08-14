"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogViewPage() {
    const params = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        async function fetchBlog() {
            setLoading(true);
            try {
                console.log("Fetching blog with slug:", params.slug);
                const res = await fetch(`/api/blog?slug=${params.slug}`);
                const data = await res.json();
                
                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch blog");
                }
                
                console.log("Blog data received:", data);
                setBlog(data.blog);
            } catch (err) {
                console.error("Error fetching blog:", err);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        }
        
        if (params?.slug) fetchBlog();
    }, [params]);

    // Reading time calculation
    const readingTime = blog ? Math.ceil((blog.content?.split(' ').length || 0) / 200) : 0;

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">
            <div className="text-center p-8 rounded-xl bg-gray-900/50 backdrop-blur-md border border-gray-800">
                <div className="animate-pulse mb-4 text-4xl">✨</div>
                <h2 className="text-xl font-semibold text-white mb-2">Loading Blog...</h2>
                <p className="text-gray-400">Please wait while we fetch the content</p>
            </div>
        </div>
    );
    
    if (!blog) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">
            <div className="text-center p-8 rounded-xl bg-gray-900/50 backdrop-blur-md border border-red-800/40 max-w-md">
                <div className="text-4xl mb-4">😞</div>
                <h2 className="text-xl font-semibold text-white mb-4">Blog Not Found</h2>
                <p className="text-gray-400 mb-6">We couldn&apos;t find the blog you&apos;re looking for. The blog might have been removed or the URL might be incorrect.</p>
                <button 
                    onClick={() => window.location.href = '/blog'} 
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                    Return to Blog Page
                </button>
            </div>
        </div>
    );

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
                
                {/* Floating reading elements */}
                {isClient && Array.from({ length: 8 }).map((_, i) => {
                    const icons = ["📖", "✨", "💭", "🌟", "📝", "💡", "🎨", "🔖"];
                    const icon = icons[i % icons.length];
                    const size = Math.random() * 15 + 10;
                    return (
                        <motion.div
                            key={`reading-icon-${i}`}
                            className="absolute opacity-10"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${size}px`
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, Math.random() * 40 - 20, 0],
                                rotate: [0, 360],
                                opacity: [0.05, 0.15, 0.05]
                            }}
                            transition={{
                                duration: Math.random() * 15 + 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 5
                            }}
                        >
                            {icon}
                        </motion.div>
                    );
                })}
                
                {/* Large floating orbs */}
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
            </div>
            
            {/* Enhanced Header Section */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                className="pt-32 pb-16 px-8 text-center relative z-10"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Blog Title */}
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        }}
                        transition={{
                            backgroundPosition: { duration: 5, repeat: Infinity }
                        }}
                    >
                        {blog.title || params.slug.replace(/-/g, " ")}
                    </motion.h1>
                    
                    {/* Enhanced Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="w-32 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-500 mx-auto rounded-full mb-8"
                    />
                    
                    {/* Blog Meta Info */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-6 text-gray-300 mb-8"
                    >
                        <motion.div
                            className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-full"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-purple-400">📅</span>
                            <span>{new Date().toLocaleDateString()}</span>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-full"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-blue-400">⏱️</span>
                            <span>{readingTime} min read</span>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-md px-4 py-2 rounded-full"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-green-400">🖼️</span>
                            <span>{blog.images ? blog.images.length : 0} images</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
            
            {/* Enhanced Content Section */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="px-8 pb-24 relative z-10"
            >
                <div className="max-w-4xl mx-auto">
                    {/* Enhanced Blog Content Container */}
                    <motion.div
                        className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-700/50 relative overflow-hidden"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Card background animation */}
                        <motion.div
                            animate={{
                                background: [
                                    "linear-gradient(135deg, rgba(168,85,247,0.05) 0%, transparent 50%)",
                                    "linear-gradient(135deg, rgba(236,72,153,0.05) 0%, transparent 50%)",
                                    "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, transparent 50%)",
                                    "linear-gradient(135deg, rgba(168,85,247,0.05) 0%, transparent 50%)"
                                ]
                            }}
                            transition={{ duration: 12, repeat: Infinity }}
                            className="absolute inset-0 rounded-3xl"
                        />
                        <div className="relative z-10">
                            {/* Enhanced Image Gallery */}
                            {blog.images && blog.images.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                    className="mb-12"
                                >
                                    <motion.h3
                                        className="text-2xl font-semibold mb-6 text-white flex items-center gap-2"
                                        animate={{
                                            opacity: [0.8, 1, 0.8]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <span className="text-purple-400">🖼️</span>
                                        Blog Gallery
                                    </motion.h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {blog.images.map((url, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ 
                                                    delay: 1 + index * 0.2, 
                                                    duration: 0.6,
                                                    type: "spring",
                                                    stiffness: 100
                                                }}
                                                whileHover={{ 
                                                    scale: 1.05,
                                                    rotateY: 5,
                                                    z: 50
                                                }}
                                                className="relative group cursor-pointer"
                                            >
                                                <div className="w-full h-64 relative">
                                                    <Image
                                                        src={url}
                                                        alt={`Blog image ${index + 1}`}
                                                        fill
                                                        className="object-cover rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-purple-500/20"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                                {/* Image overlay */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    whileHover={{ opacity: 1 }}
                                                >
                                                    <div className="absolute bottom-4 left-4 text-white">
                                                        <span className="text-sm font-medium">Image {index + 1}</span>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            
                            {/* Enhanced Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="prose prose-invert prose-lg max-w-none"
                            >
                                <motion.h3
                                    className="text-2xl font-semibold mb-6 text-white flex items-center gap-2"
                                    animate={{
                                        opacity: [0.8, 1, 0.8]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <span className="text-blue-400">📝</span>
                                    Article Content
                                </motion.h3>
                                <motion.div
                                    className="text-gray-200 text-lg leading-relaxed"
                                    animate={{
                                        opacity: [0.9, 1, 0.9]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    {blog.content ? (
                                        <p className="whitespace-pre-wrap">{blog.content}</p>
                                    ) : (
                                        <motion.p
                                            className="text-gray-500 italic text-center py-12"
                                            animate={{
                                                opacity: [0.5, 0.8, 0.5]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <span className="text-4xl block mb-4">📖</span>
                                            No content available for this blog post...
                                        </motion.p>
                                    )}
                                </motion.div>
                            </motion.div>
                            
                            {/* Enhanced Bottom Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 0.8 }}
                                className="mt-12 pt-8 border-t border-gray-700/50"
                            >
                                <div className="flex flex-wrap justify-center gap-4">
                                    <motion.div
                                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md px-6 py-3 rounded-full border border-purple-500/30"
                                        whileHover={{ scale: 1.05 }}
                                        animate={{
                                            boxShadow: [
                                                "0 4px 20px rgba(168,85,247,0.1)",
                                                "0 8px 30px rgba(168,85,247,0.2)",
                                                "0 4px 20px rgba(168,85,247,0.1)"
                                            ]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <span className="text-purple-400 font-medium">✨ Powered by MultiMantra</span>
                                    </motion.div>
                                    <motion.div
                                        className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md px-6 py-3 rounded-full border border-blue-500/30"
                                        whileHover={{ scale: 1.05 }}
                                        animate={{
                                            boxShadow: [
                                                "0 4px 20px rgba(59,130,246,0.1)",
                                                "0 8px 30px rgba(59,130,246,0.2)",
                                                "0 4px 20px rgba(59,130,246,0.1)"
                                            ]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                    >
                                        <span className="text-blue-400 font-medium">🚀 WriteMantra Blog</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
}
