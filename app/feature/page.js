import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const feature = () => {
  return (
  
        <section id="feature" className=" feature  text-black py-20 px-6 ">
          <div className=" flex flex-col items-center justify-center px-4 py-12">
            <h2 className="text-4xl font-bold text-white mb-10">Our Features</h2>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
  
              {/* Donation */}
              <div className=" bg-gradient-to-br from-purple-800/60 to-indigo-900/60 border border-purple-400/20 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                <Image width={60} height={60} src="/coin2.gif" alt="Team working" />
                <h3 className="text-xl text-white font-semibold mb-2">Donation</h3>
                <p className="text-gray-400 mb-4">Support causes with ease</p>
                <Link href="/dashboard"><button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-semibold text-white rounded-lg group bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 cursor-pointer">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-150 bg-[#1f1b3a]/80 backdrop-blur-md rounded-md group-hover:bg-transparent">
                    Get Started
                  </span>
                </button>
                </Link>
              </div>
  
              {/* URL Shortener */}
              <div className=" bg-gradient-to-br from-purple-800/60 to-indigo-900/60 border border-purple-400/20  rounded-2xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                <Image width={60} height={60} src="/link.gif" alt="Team working" />
                <h3 className="text-xl  text-white font-semibold mb-2">URL Shortener</h3>
                <p className="text-gray-400 mb-4">Shorten and share links</p>
                <Link href="/lite"><button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-semibold text-white rounded-lg group bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 cursor-pointer">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-150 bg-[#1f1b3a]/80 backdrop-blur-md rounded-md group-hover:bg-transparent">
                    Get Started
                  </span>
                </button>
                </Link>
              </div>
  
              {/* Link collector  */}
              <div className="bg-gradient-to-br from-purple-800/60 to-indigo-900/60 border border-purple-400/20 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                <Image width={60} height={60} src="/layer.gif" alt="Team working" />
                <h3 className="text-xl font-semibold text-white mb-2">link collector</h3>
                <p className="text-gray-400 mb-4">Organize your Links on one page </p>
                <Link href="/link"><button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-semibold text-white rounded-lg group bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 cursor-pointer">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-150 bg-[#1f1b3a]/80 backdrop-blur-md rounded-md group-hover:bg-transparent">
                    Get Started
                  </span>
                </button>
                </Link>
  
              </div>
  
              {/* Blog */}
              <div className=" bg-gradient-to-br from-purple-800/60 to-indigo-900/60 border border-purple-400/20 text-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                <Image width={60} height={60} src="/blog.gif" alt="Team working" />
                <h3 className="text-xl font-semibold  text-white mb-2">WriteMantra</h3>
                <p className="text-gray-400 mb-4">Write, express, and share your story with the world.</p>
                <Link href="/blog"><button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-semibold text-white rounded-lg group bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 cursor-pointer">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-150 bg-[#1f1b3a]/80 backdrop-blur-md rounded-md group-hover:bg-transparent">
                    Get Started
                  </span>
                </button>
                </Link>
              </div>
  
            </div>
          </div>
  
        </section>
  )
}

export default feature
