import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main>

      {/* landing page */}

      <section className=" mainpage ">
        <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 text-center">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-yellow-400 text-red-600 font-bold rounded-full w-10 h-10 flex items-center justify-center text-xl">
              M
            </div>
            <h1 className="text-2xl font-semibold tracking-wide">MALTIMANTRA</h1>
          </div>

          {/* Tagline */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            One Mantra, Many Solutions.
          </h2>

          <Link href="#feature"> <button type="button" className="text-white bg-gradient-to-br from-gray-900 to-slate-600 hover:bg-gradient-to-bl rounded-full text-lg font-bold px-5 py-2.5 text-center  cursor-pointer me-2 mb-2  ">Get Started</button></Link>
        </div>
      </section>

      {/* About page */}

      <section id="about" className="  About text-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">About Us</h2>
            <p className="text-cyan-400 text-xl font-medium mb-6">
              At MultiMantra, we believe in simplifying your digital life.
            </p>
            <p className="text-gray-300 mb-4 flex flex-col ">
              Whether it's managing your daily tasks, sharing links, supporting causes, or shopping online — we bring it all under one roof.
              <span className=" font-bold text-xl text-fuchsia-700" > Our goal ? </span>
              <span className=" text-lg text-fuchsia-400 " >   To empower you with smart, seamless, and secure tools that just work.</span>
              <span className=" text-lg text-fuchsia-400 " > Join us on this journey where One Mantra = Many Solutions.</span>

            </p>
          </div>
          <div className="flex justify-center">
            <Image width={500} height={500} src="/pro.png" alt="Team working" />
          </div>
        </div>
      </section>


      {/* feature page */}


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
              <h3 className="text-xl  text-white font-semibold mb-2">MantraShort</h3>
              <p className="text-gray-400 mb-4">Shorten and share links</p>
              <Link href="/lite"><button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-semibold text-white rounded-lg group bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-purple-600 hover:to-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 cursor-pointer">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-150 bg-[#1f1b3a]/80 backdrop-blur-md rounded-md group-hover:bg-transparent">
                  Get Started
                </span>
              </button>
              </Link>
            </div>

            {/* Task Manager */}
            <div className="bg-gradient-to-br from-purple-800/60 to-indigo-900/60 border border-purple-400/20 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
              <Image width={60} height={60} src="/layer.gif" alt="Team working" />
              <h3 className="text-xl font-semibold text-white mb-2">MultiLinks</h3>
              <p className="text-gray-400 mb-4">Organize your links on one page </p>
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


    </main>
  );
}







