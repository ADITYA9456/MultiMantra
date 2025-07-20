"use client"
import { fetchpayments, fetchuser, initiate } from '@/actions/usreactions'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { FiCoffee, FiGift, FiHeart, FiTrendingUp, FiUsers } from 'react-icons/fi'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PaymentPage = ({ username }) => {
    // const { data: session } = useSession()

    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Thanks for your donation!', {
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
            
            // Clean URL without causing redirect loop
            const url = new URL(window.location)
            url.searchParams.delete('paymentdone')
            window.history.replaceState({}, '', url)
        }
    }, [searchParams])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        // Get the order Id 
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Chai Express", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the id obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "ASh kechem ", //your customer's name
                "email": "sakurayamauchi@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
                {/* Subtle Background Effects */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
                </div>

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
                    theme="dark" />
                <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

                {/* Enhanced Cover Section */}
                <motion.div 
                    className='cover w-full relative overflow-hidden'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative">
                        <motion.img 
                            className='object-cover w-full h-48 md:h-[350px] shadow-2xl' 
                            src={currentUser.coverpic} 
                            alt="cover pic"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    <motion.div 
                        className='absolute -bottom-20 right-[33%] md:right-[46%] border-white overflow-hidden border-4 rounded-full size-36 shadow-2xl'
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
                    >
                        <img 
                            className='rounded-full object-cover size-36' 
                            width={128} 
                            height={128} 
                            src={currentUser.profilepic} 
                            alt="profile pic" 
                        />
                    </motion.div>
                </motion.div>

                {/* Enhanced Info Section */}
                <motion.div 
                    className="info flex justify-center items-center my-24 mb-32 flex-col gap-4 relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <motion.div 
                        className='font-bold text-3xl text-white text-center'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        @{username}
                    </motion.div>
                    
                    <motion.div 
                        className='text-gray-300 text-lg text-center flex items-center gap-2'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <FiCoffee className="w-5 h-5 text-amber-400" />
                        Lets help {username} get a chai!
                    </motion.div>

                    <motion.div 
                        className='text-gray-400 text-center flex flex-col sm:flex-row gap-4 sm:gap-8'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/20">
                            <FiUsers className="w-5 h-5 text-blue-400" />
                            <span className="text-white font-semibold">{payments.length}</span>
                            <span className="text-gray-300">Payments</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/20">
                            <FiTrendingUp className="w-5 h-5 text-green-400" />
                            <span className="text-white font-semibold">₹{payments.reduce((a, b) => a + b.amount, 0)}</span>
                            <span className="text-gray-300">raised</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Enhanced Payment Section */}
                <div className="payment flex gap-6 w-[90%] max-w-6xl mx-auto mt-11 flex-col md:flex-row relative z-10 pb-16">
                    {/* Enhanced Supporters Section */}
                    <motion.div 
                        className="supporters w-full md:w-1/2 bg-white/10 backdrop-blur-2xl rounded-2xl text-white p-6 md:p-8 border border-white/20 shadow-2xl"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                <FiUsers className="w-6 h-6 text-white" />
                            </div>
                            <h2 className='text-2xl font-bold'>Top 10 Supporters</h2>
                        </div>
                        
                        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800">
                            {payments.length == 0 && (
                                <motion.div 
                                    className="text-center py-8 text-gray-400"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <FiHeart className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                                    <p className="text-lg">No payments yet</p>
                                    <p className="text-sm mt-2">Be the first supporter!</p>
                                </motion.div>
                            )}
                            {payments.map((p, i) => {
                                return (
                                    <motion.div
                                        key={i}
                                        className='bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200'
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + i * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex gap-3 items-start">
                                            <img width={40} height={40} className="rounded-full border-2 border-purple-400" src="/avatar.gif" alt="user avatar" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-semibold text-white">{p.name}</span>
                                                    <span className='bg-gradient-to-r from-green-400 to-emerald-400 text-black px-3 py-1 rounded-full text-sm font-bold'>
                                                        ₹{p.amount}
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 text-sm italic">"{p.message}"</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Enhanced Payment Form */}
                    <motion.div 
                        className="makePayment w-full md:w-1/2 bg-white/10 backdrop-blur-2xl rounded-2xl text-white p-6 md:p-8 border border-white/20 shadow-2xl"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                <FiGift className="w-6 h-6 text-white" />
                            </div>
                            <h2 className='text-2xl font-bold'>Make a Payment</h2>
                        </div>
                        
                        <div className='flex gap-4 flex-col'>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <label className="block text-gray-300 font-medium mb-2">Your Name</label>
                                <input 
                                    onChange={handleChange} 
                                    value={paymentform.name} 
                                    name='name' 
                                    type="text" 
                                    className='w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400' 
                                    placeholder='Enter Name' 
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <label className="block text-gray-300 font-medium mb-2">Message</label>
                                <input 
                                    onChange={handleChange} 
                                    value={paymentform.message} 
                                    name='message' 
                                    type="text" 
                                    className='w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400' 
                                    placeholder='Enter Message' 
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 }}
                            >
                                <label className="block text-gray-300 font-medium mb-2">Amount (₹)</label>
                                <input 
                                    onChange={handleChange} 
                                    value={paymentform.amount} 
                                    name="amount" 
                                    type="text" 
                                    className='w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400' 
                                    placeholder='Enter Amount' 
                                />
                            </motion.div>

                            <motion.button 
                                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} 
                                type="button" 
                                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed shadow-lg text-lg mt-4 cursor-pointer" 
                                disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <FiHeart className="w-5 h-5" />
                                    <span>Pay{paymentform.amount && ` ₹${paymentform.amount}`}</span>
                                </div>
                            </motion.button>
                        </div>

                        {/* Enhanced Quick Payment Buttons */}
                        <motion.div 
                            className="mt-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                        >
                            <p className="text-gray-300 text-sm mb-3 text-center">Or choose from these amounts</p>
                            <div className='flex flex-col md:flex-row gap-3'>
                                <motion.button 
                                    className='bg-white/10 hover:bg-white/20 p-4 rounded-xl border border-white/20 transition-all duration-200 font-semibold flex-1 hover:border-purple-400 cursor-pointer'
                                    onClick={() => pay(1000)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <FiCoffee className="w-4 h-4 text-amber-400" />
                                        Pay ₹10
                                    </div>
                                </motion.button>
                                <motion.button 
                                    className='bg-white/10 hover:bg-white/20 p-4 rounded-xl border border-white/20 transition-all duration-200 font-semibold flex-1 hover:border-purple-400 cursor-pointer'
                                    onClick={() => pay(2000)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <FiCoffee className="w-4 h-4 text-amber-400" />
                                        Pay ₹20
                                    </div>
                                </motion.button>
                                <motion.button 
                                    className='bg-white/10 hover:bg-white/20 p-4 rounded-xl border border-white/20 transition-all duration-200 font-semibold flex-1 hover:border-purple-400 cursor-pointer'
                                    onClick={() => pay(3000)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <FiCoffee className="w-4 h-4 text-amber-400" />
                                        Pay ₹30
                                    </div>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
