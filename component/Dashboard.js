"use client"
import { fetchuser, updateProfile } from '@/actions/usreactions.js'
import { motion } from 'framer-motion'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiAtSign, FiCamera, FiCreditCard, FiExternalLink, FiImage, FiKey, FiMail, FiSave, FiSettings, FiUser } from 'react-icons/fi'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {
        console.log(session)

        if (!session) {
            router.push('/login')
        }
        else {
            getData()
        }
    }, [])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        setform(u)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        let a = await updateProfile(e, session.user.name)
        toast('Profile Updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const handleViewProfile = () => {
        if (form.username) {
            router.push(`/aa/${form.username}`)
        } else {
            toast.error('Please save your profile first!', {
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
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            {/* Enhanced Background */}
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                {/* Subtle Background Effects */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl"></div>
                </div>

                <div className='container mx-auto py-5 px-6 relative z-10'>
                    {/* Enhanced Header */}
                    <motion.div 
                        className="text-center pt-20 mb-12"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-2xl flex items-center justify-center">
                                <FiSettings className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className='text-4xl md:text-5xl font-black text-white mb-4'>
                            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Dashboard
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg">Welcome back! Manage your profile settings</p>
                    </motion.div>

                    {/* Enhanced Form Container */}
                    <motion.div 
                        className="max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
                            <form action={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Personal Information Section */}
                                    <div className="md:col-span-2">
                                        <motion.h2 
                                            className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <FiUser className="w-6 h-6 text-purple-400" />
                                            Personal Information
                                        </motion.h2>
                                    </div>

                                    {/* Name Field */}
                                    <motion.div 
                                        className='space-y-2'
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <label htmlFor="name" className="flex items-center gap-2 text-gray-300 font-medium">
                                            <FiUser className="w-4 h-4 text-purple-400" />
                                            Name
                                        </label>
                                        <input 
                                            value={form.name ? form.name : ""} 
                                            onChange={handleChange} 
                                            type="text" 
                                            name='name' 
                                            id="name" 
                                            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200" 
                                            placeholder="Enter your name"
                                        />
                                    </motion.div>

                                    {/* Email Field */}
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <label htmlFor="email" className="flex items-center gap-2 text-gray-300 font-medium">
                                            <FiMail className="w-4 h-4 text-blue-400" />
                                            Email
                                        </label>
                                        <input 
                                            value={form.email ? form.email : ""} 
                                            onChange={handleChange} 
                                            type="email" 
                                            name='email' 
                                            id="email" 
                                            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200" 
                                            placeholder="Enter your email"
                                        />
                                    </motion.div>

                                    {/* Username Field */}
                                    <motion.div 
                                        className='space-y-2'
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <label htmlFor="username" className="flex items-center gap-2 text-gray-300 font-medium">
                                            <FiAtSign className="w-4 h-4 text-green-400" />
                                            Username
                                        </label>
                                        <input 
                                            value={form.username ? form.username : ""} 
                                            onChange={handleChange} 
                                            type="text" 
                                            name='username' 
                                            id="username" 
                                            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200" 
                                            placeholder="Enter your username"
                                        />
                                    </motion.div>

                                    {/* Profile Picture Field */}
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <label htmlFor="profilepic" className="flex items-center gap-2 text-gray-300 font-medium">
                                            <FiImage className="w-4 h-4 text-pink-400" />
                                            Profile Picture URL
                                        </label>
                                        <input 
                                            value={form.profilepic ? form.profilepic : ""} 
                                            onChange={handleChange} 
                                            type="text" 
                                            name='profilepic' 
                                            id="profilepic" 
                                            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200" 
                                            placeholder="Enter profile picture URL"
                                        />
                                    </motion.div>

                                    {/* Cover Picture Field */}
                                    <motion.div 
                                        className="md:col-span-2 space-y-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        <label htmlFor="coverpic" className="flex items-center gap-2 text-gray-300 font-medium">
                                            <FiCamera className="w-4 h-4 text-indigo-400" />
                                            Cover Picture URL
                                        </label>
                                        <input 
                                            value={form.coverpic ? form.coverpic : ""} 
                                            onChange={handleChange} 
                                            type="text" 
                                            name='coverpic' 
                                            id="coverpic" 
                                            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200" 
                                            placeholder="Enter cover picture URL"
                                        />
                                    </motion.div>

                                    {/* Payment Information Section */}
                                    <div className="md:col-span-2 mt-8">
                                        <motion.h2 
                                            className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1.0 }}
                                        >
                                            <FiCreditCard className="w-6 h-6 text-green-400" />
                                            Payment Configuration
                                        </motion.h2>
                                    </div>

                                    {/* Razorpay ID Field */}
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1 }}
                                    >
                                        <label htmlFor="razorpayid" className="flex items-center gap-2 text-gray-300 font-medium">
                                            <FiCreditCard className="w-4 h-4 text-green-400" />
                                            Razorpay ID
                                        </label>
                                        <input 
                                            value={form.razorpayid ? form.razorpayid : ""} 
                                            onChange={handleChange} 
                                            type="text" 
                                            name='razorpayid' 
                                            id="razorpayid" 
                                            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200" 
                                            placeholder="Enter your Razorpay ID"
                                        />
                                    </motion.div>

                                    {/* Razorpay Secret Field */}
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2 }}
                                    >
                                        <label htmlFor="razorpaysecret" className="flex items-center gap-2 text-gray-300 font-medium">
                                            <FiKey className="w-4 h-4 text-orange-400" />
                                            Razorpay Secret
                                        </label>
                                        <input 
                                            value={form.razorpaysecret ? form.razorpaysecret : ""} 
                                            onChange={handleChange} 
                                            type="password" 
                                            name='razorpaysecret' 
                                            id="razorpaysecret" 
                                            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200" 
                                            placeholder="Enter your Razorpay Secret"
                                        />
                                    </motion.div>

                                    {/* Submit Button */}
                                    <motion.div 
                                        className="md:col-span-2 mt-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.3 }}
                                    >
                                        <button 
                                            type="submit" 
                                            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl text-lg flex items-center justify-center gap-3 cursor-pointer"
                                        >
                                            <FiSave className="w-5 h-5" />
                                            Save Changes
                                        </button>
                                    </motion.div>
                                </div>
                            </form>

                            {/* Enhanced Profile Preview Section with View Profile Button */}
                            <motion.div 
                                className="mt-12 pt-8 border-t border-white/20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <FiUser className="w-5 h-5 text-purple-400" />
                                        Profile Preview
                                    </h3>
                                    <motion.button
                                        onClick={handleViewProfile}
                                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 font-medium shadow-lg cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.6 }}
                                    >
                                        <FiExternalLink className="w-4 h-4" />
                                        View Profile
                                    </motion.button>
                                </div>
                                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                    <div className="flex items-center gap-4">
                                        {form.profilepic && (
                                            <img 
                                                src={form.profilepic} 
                                                alt="Profile Preview" 
                                                className="w-16 h-16 rounded-full object-cover border-2 border-purple-400"
                                            />
                                        )}
                                        <div>
                                            <div className="text-white font-semibold text-lg">
                                                {form.name || "Your Name"}
                                            </div>
                                            <div className="text-gray-400">
                                                @{form.username || "username"}
                                            </div>
                                            <div className="text-gray-500 text-sm">
                                                {form.email || "your@email.com"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default Dashboard