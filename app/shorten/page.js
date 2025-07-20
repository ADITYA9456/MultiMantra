"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiCheck, FiCopy, FiLink, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Shorten = () => {
    const [url, seturl] = useState("");
    const [shorturl, setshorturl] = useState("");
    const [generated, setgenerated] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generated);
            setCopied(true);
            toast.success('Link copied to clipboard! 📋', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy link! ❌', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    const generate = () => {
        if (!url || !shorturl) {
            toast.error('Please fill in both fields! ⚠️', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }

        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            url: url,
            shorturl: shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                if (result.success !== false) {
                    seturl("");
                    setshorturl("");
                    setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`);

                    toast.success('Generated successfully! ✨', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,  
                    });
                } else {
                    toast.error(result.message || 'Failed to generate short URL! 😞', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
                toast.error('Network error! Please try again. 🔄', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            });
    };

    return (
        <>
            {/* Clean Dark Background */}
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
                {/* Static Background Elements - No animations to prevent hydration issues */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-600/30 to-purple-600/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}  
                />

                <div className="relative z-10 container mx-auto px-4 py-20">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        {/* Simple Icon without complex animations */}
                        <div className="inline-block mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl shadow-2xl flex items-center justify-center">
                                <FiZap className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        
                        <motion.h1 
                            className="text-5xl md:text-6xl font-black text-white mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Shrink
                            </span>
                            <br />
                            <span className="text-white">Your Links</span>
                        </motion.h1>
                        
                        <motion.p
                            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Transform lengthy URLs into powerful, trackable short links with 
                            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-bold"> MultiMantra</span>
                        </motion.p>

                        {/* Stats Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12"
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-400">99.9%</div>
                                <div className="text-gray-400 text-sm">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-400">1M+</div>
                                <div className="text-gray-400 text-sm">Links Created</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-400">Fast</div>
                                <div className="text-gray-400 text-sm">Redirects</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-7xl mx-auto">
                        {/* Form Section */}
                        <motion.div 
                            className="flex-1 max-w-2xl mx-auto lg:mx-0"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="bg-gray-800/30 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-gray-700/50 shadow-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                                    Create Your Short Link
                                </h2>

                                <div className="space-y-8">
                                    {/* URL Input */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                    >
                                        <label className="block text-gray-300 font-semibold mb-3 text-lg">
                                            🔗 Your Long URL
                                        </label>
                                        <div className="relative group">
                                            <FiLink className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-hover:text-purple-400 transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="https://example.com/your-very-long-url-here"
                                                className="w-full pl-14 pr-6 py-5 bg-gray-900/50 border-2 border-gray-700/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 text-white placeholder-gray-400 transition-all duration-300 text-lg hover:border-gray-600/50 hover:bg-gray-900/70"
                                                value={url}
                                                onChange={e => seturl(e.target.value)}
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Short URL Input */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.7 }}
                                    >
                                        <label className="block text-gray-300 font-semibold mb-3 text-lg">
                                            ✨ Custom Short URL
                                        </label>
                                        <div className="relative group">
                                            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-400 font-semibold">
                                                multimantra.com/
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="my-awesome-link"
                                                className="w-full pl-40 pr-6 py-5 bg-gray-900/50 border-2 border-gray-700/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/50 focus:border-cyan-500 text-white placeholder-gray-400 transition-all duration-300 text-lg hover:border-gray-600/50 hover:bg-gray-900/70"
                                                value={shorturl}
                                                onChange={e => setshorturl(e.target.value)}
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Generate Button */}
                                    <motion.button 
                                        onClick={generate}
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 hover:from-purple-700 hover:via-cyan-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed shadow-2xl text-xl"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.9 }}
                                        whileHover={{ scale: loading ? 1 : 1.02 }}
                                        whileTap={{ scale: loading ? 1 : 0.98 }}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <motion.div
                                                    className="w-6 h-6 border-3 border-white border-t-transparent rounded-full mr-4"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                <span>Creating Magic...</span>
                                            </div>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <FiZap className="w-6 h-6 mr-3" />
                                                Generate Short URL
                                            </span>
                                        )}
                                    </motion.button>
                                </div>

                                {/* Generated URL Result */}
                                {generated && (
                                    <motion.div 
                                        className='mt-10 p-8 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 border-2 border-green-500/40 rounded-3xl'
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className='flex items-center gap-4 mb-6'>
                                            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                                                <span className="text-2xl">🎉</span>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-2xl text-green-400'>Success!</h3>
                                                <p className="text-green-300">Your short URL is ready to use</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4 p-6 bg-gray-900/30 rounded-2xl border border-gray-700/30">
                                            <code className="flex-1 text-green-400 font-mono text-lg break-all">
                                                <Link 
                                                    target="_blank" 
                                                    href={generated}
                                                    className="hover:text-green-300 transition-colors duration-200 hover:underline"
                                                >
                                                    {generated}
                                                </Link>
                                            </code>
                                            <motion.button
                                                onClick={copyToClipboard}
                                                className="p-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-xl transition-all duration-200 text-white shadow-lg"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {copied ? (
                                                    <FiCheck className="w-6 h-6" />
                                                ) : (
                                                    <FiCopy className="w-6 h-6" />
                                                )}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Features Section */}
                        <motion.div 
                            className="flex-1 max-w-md mx-auto lg:mx-0"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <h3 className="text-2xl font-bold text-white mb-8 text-center lg:text-left">Why Choose MultiMantra?</h3>
                            <div className="space-y-6">
                                <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:scale-105 transition-transform duration-200">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                            <FiZap className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h4 className="text-xl font-semibold text-white">Lightning Fast</h4>
                                    </div>
                                    <p className="text-gray-300">Generate short URLs in milliseconds with our optimized infrastructure.</p>
                                </div>

                                <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:scale-105 transition-transform duration-200">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                                            <FiShield className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <h4 className="text-xl font-semibold text-white">Secure & Reliable</h4>
                                    </div>
                                    <p className="text-gray-300">Enterprise-grade security with 99.9% uptime guarantee.</p>
                                </div>

                                <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:scale-105 transition-transform duration-200">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                            <FiTrendingUp className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h4 className="text-xl font-semibold text-white">Analytics Ready</h4>
                                    </div>
                                    <p className="text-gray-300">Track clicks, geographic data, and performance metrics.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                        className="text-center mt-20"
                    >
                        <div className="inline-flex items-center gap-2 text-gray-400 text-lg">
                            <span>Powered by</span>
                            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-bold">MultiMantra</span>
                            <span>•</span>
                            <span>Trusted by thousands</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default Shorten;