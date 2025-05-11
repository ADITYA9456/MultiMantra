import React from 'react'

const serves = () => {
  return (
    <section className="bg-gradient-to-b from-gray-950 to-black text-white py-24 px-6">
  {/* Hero Section */}
  <div className="max-w-4xl mx-auto text-center mb-20">
    <h2 className="text-5xl font-extrabold tracking-wide">
      Explore the Power of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">MultiMantra</span>
    </h2>
    <p className="mt-4 text-gray-400 text-lg">
      A platform combining multiple services to simplify your digital experience. Learn more about how each service empowers your journey.
    </p>
  </div>

  {/* Service Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
    
    {/* Donation Service */}
    <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-red-500 hover:shadow-lg transition">
      <div className="text-red-500 text-4xl mb-4">
        💸
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-gradient">Donation</h3>
      <p className="text-gray-400 text-sm mb-4">
        Contribute to meaningful social causes with a seamless and secure donation process. Whether it's for charity, disaster relief, or supporting educational programs, your donations help make a tangible impact. 
      </p>
      <p className="text-gray-400 text-sm">
        With our easy-to-use interface, select your preferred cause, enter your donation amount, and contribute instantly. Feel good knowing your donation is going directly to the cause you care about.
      </p>
    </div>

    {/* URL Shortener Service */}
    <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-blue-500 hover:shadow-lg transition">
      <div className="text-blue-500 text-4xl mb-4">
        🔗
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-gradient">URL Shortener</h3>
      <p className="text-gray-400 text-sm mb-4">
        Say goodbye to long, cumbersome URLs. Our URL shortener lets you create short, memorable links that are perfect for sharing. Whether for social media, emails, or websites, make your links short and easy to distribute.
      </p>
      <p className="text-gray-400 text-sm">
        Keep track of your shortened links and analyze their performance with our built-in link tracker. It's the easiest way to manage, share, and track your links across platforms.
      </p>
    </div>

    {/* eCommerce Service */}
    <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-green-500 hover:shadow-lg transition">
      <div className="text-green-500 text-4xl mb-4">
        🛒
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-gradient">eCommerce</h3>
      <p className="text-gray-400 text-sm mb-4">
        Build your online store effortlessly. Whether you're selling physical products, digital goods, or services, our eCommerce platform lets you set up shop with minimal effort. 
      </p>
      <p className="text-gray-400 text-sm">
        Manage products, track orders, and integrate secure payment options with ease. The clean and intuitive dashboard lets you handle everything from inventory to customer service, providing you with everything you need to scale your business online.
      </p>
    </div>

    {/* To-Do List Service */}
    <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 hover:border-purple-500 hover:shadow-lg transition">
      <div className="text-purple-500 text-4xl mb-4">
        ✅
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-gradient">To-Do List</h3>
      <p className="text-gray-400 text-sm mb-4">
        Stay organized and boost your productivity with our intuitive task management system. Our To-Do List feature lets you create tasks, set deadlines, and categorize them to stay on top of your responsibilities.
      </p>
      <p className="text-gray-400 text-sm">
        Whether it's personal tasks or professional projects, organize your work, track progress, and cross off completed tasks with ease. Never miss a deadline or forget a task again with our sleek, user-friendly interface.
      </p>
    </div>
  </div>
</section>

  )
}

export default serves
