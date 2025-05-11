"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Link = () => {

  const router = useRouter()
  const [text, setText] = useState("")

  
  const createTree = () => { 
    
    router.push(`/generate?handle=${text}`)
  }

  return (
    <>
      {/* Section 1 */}
      <section className=" min-h-[100vh] flex items-center justify-center px-12">
        <div className="max-w-7xl mx-auto  gap-24 justify-center items-center">
          {/* Text Content */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Your Digital Identity. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Neatly Nested.
              </span>
            </h1>
            <p className="text-lg md:text-xl relative opacity-80">
             We helps you organize all your important links, content, and socials in one beautiful, customizable page.
              Whether you're a creator, entrepreneur, or brand — make your online presence unforgettable.
            </p>
            <div className="flex items-center gap-4">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="yourusername"
                className="px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={createTree}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition cursor-pointer"
              >
                Claim your LinkNest
              </button>
            </div>
          </div>
          </div>

        
           
      </section>

      {/* Animated background div */}
      <div className="size-96 rounded-full bg-radial-[at_25%_25%] flex fixed from-white animate-bounce opacity-35 to-zinc-900 to-75%"></div>

   
    </>
  );
};

export default Link;
