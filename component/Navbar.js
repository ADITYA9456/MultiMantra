import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-black text-white py-3 px-6 flex flex-col justify-center  items-center mt-4  mx-80 gap-96  rounded-xl   fixed  ">
      <div className="flex items-center space-x-2 justify-between  gap-96">
          <div className="text-red-600 text-2xl font-bold  ">
            <span className="border-2 border-red-600 rounded-full px-2 py-1">M</span>
            <span className="text-red-600 font-bold text-xl">MULTIMANTRA</span>
          </div>
        <div>
          <ul className="flex space-x-6 text-sm">
          <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
          <li><Link href="/about" className="hover:text-yellow-400">About</Link></li>
          <li><Link href="/feature" className="hover:text-yellow-400">Features</Link></li>
          <li><Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
