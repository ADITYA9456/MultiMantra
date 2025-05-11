import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8 shadow-inner">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
    <div className="mb-6 md:mb-0 text-center md:text-left">
      <h2 className="text-white text-2xl font-extrabold tracking-wide">
        Multi
        <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md ml-1">
          Mantra
        </span>
      </h2>
      <p className="text-xs mt-1 text-gray-500">© 2025 All rights reserved.</p>
    </div>
    <ul className="flex space-x-6 text-sm font-medium">
      <li><a href=" / " className="hover:text-white transition duration-300">Home</a></li>
      <li><a href="/about" className="hover:text-white transition duration-300">About</a></li>
      <li><a href="/serves" className="hover:text-white transition duration-300">Services</a></li>
      <li><a href="/contact" className="hover:text-white transition duration-300">Contact</a></li>
    </ul>
  </div>
</footer>

  )
}

export default Footer
