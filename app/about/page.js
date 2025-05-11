import React from 'react'
import Image from 'next/image'

const about = () => {
  return (
    
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
  )
}

export default about
