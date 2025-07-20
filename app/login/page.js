"use client"
import { motion } from 'framer-motion'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Login = () => {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        document.title = "Login - Get Me A Chai"
        console.log(session)
        if (session) {
            router.push('/dashboard')
        }
    }, [session, router])

    return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center px-4 py-12">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md z-10"
        >
            <div className="text-center mb-8">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-white"
                >
                    Welcome Back!
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 mt-2"
                >
                    Sign in to continue
                </motion.p>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 mb-6"
            >
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200 block">Email</label>
                    <input 
                        type="text" 
                        placeholder="Enter your email" 
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-white placeholder-gray-400 outline-none transition-all duration-200 cursor-text"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200 block">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-white placeholder-gray-400 outline-none transition-all duration-200 cursor-text"
                    />
                </div>

                {/* Login button added */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg cursor-pointer transform hover:-translate-y-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Sign In
                </motion.button>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-right mb-6"
            >
                <a href="/" className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200 cursor-pointer">
                    Forgot your password?
                </a>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
            >
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-gray-900/50 px-4 text-sm text-gray-400 backdrop-blur-sm">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => { signIn("github") }}
                        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg p-2.5 text-white transition-all duration-200 hover:shadow-lg cursor-pointer transform hover:-translate-y-1"
                    >
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                        </svg>
                        <span>GitHub</span>
                    </button>
                    
                    <button 
                        onClick={() => { signIn("google") }} 
                        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg p-2.5 text-white transition-all duration-200 hover:shadow-lg cursor-pointer transform hover:-translate-y-1"
                    >
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 18 19">
                            <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                        </svg>
                        <span>Google</span>
                    </button>
                    
                    <button 
                        onClick={() => { signIn("facebook") }}
                        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg p-2.5 text-white transition-all duration-200 hover:shadow-lg cursor-pointer transform hover:-translate-y-1"
                    >
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 8 19">
                            <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                        </svg>
                        <span>Facebook</span>
                    </button>
                    
                    <button 
                        onClick={() => { signIn("apple") }}
                        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg p-2.5 text-white transition-all duration-200 hover:shadow-lg cursor-pointer transform hover:-translate-y-1"
                    >
                        <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" viewBox="0 0 384 512">
                            <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                        </svg>
                        <span>Apple</span>
                    </button>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-center text-sm text-gray-400"
            >
                Don't have an account?{" "}
                <a href="/signup" className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200 cursor-pointer">
                    Sign up
                </a>
            </motion.div>
        </motion.div>
    </div>
    )
}

export default Login