import React from 'react'

const contact = () => {
  return (
    <section className="bg-gray-950 text-gray-200 py-16 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* Contact Info */}
    <div>
      <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
      <p className="text-gray-400 mb-6 text-sm">
        Have any questions or want to work together? Feel free to drop a message. We’ll get back to you as soon as possible.
      </p>
      
      <div className="space-y-4 text-sm">
        <p><span className="font-semibold text-white">Email:</span> contact@multimantra.com</p>
        <p><span className="font-semibold text-white">Phone:</span> +91 9876543210</p>
        <p><span className="font-semibold text-white">Location:</span> Mumbai, India</p>
      </div>
    </div>

    {/* Contact Form */}
    <form className="bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6">
      <div>
        <label className="block mb-1 text-sm text-gray-300">Your Name</label>
        <input type="text" className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="John Doe" />
      </div>
      <div>
        <label className="block mb-1 text-sm text-gray-300">Email</label>
        <input type="email" className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="you@example.com" />
      </div>
      <div>
        <label className="block mb-1 text-sm text-gray-300">Message</label>
        <textarea rows="5" className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Type your message here..."></textarea>
      </div>
      <button type="submit" className="bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition text-white font-semibold py-3 px-6 rounded-lg shadow-lg">
        Send Message
      </button>
    </form>

  </div>
</section>

  )
}

export default contact
