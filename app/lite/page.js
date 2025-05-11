import Image from "next/image";
import Link from "next/link";
import { FaLink,FaChartBar,FaBolt,FaShieldAlt } from 'react-icons/fa';




const lite = () => {
    return (
        <main className=" text-white">
       <section className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[60vh]   overflow-hidden">
            <div className="flex flex-col justify-center items-center gap-4 text-black  p-6 md:p-0">
              <p className="text-2xl md:text-4xl font-bold text-fuchsia-300 text-center">
                The best URL shortener in the world
              </p>
              <p className="text-center text-white px-4 md:px-30 text-sm md:text-base">
                This is a quick and easy tool that shortens long links, making them simple to share. Whether for social media, business, or daily use, it creates short and clean URLs that are easy to remember. It also helps track link performance, ensuring smooth redirection and better link management.
              </p>
              <div>
                <Link href="/shorten">
                  <button className="rounded-lg font-bold p-3 cursor-pointer bg-gradient-to-br from-purple-500 to-pink-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-400 text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Try now
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center p-6 md:p-0  rounded-full">
              <Image
                className="w-64 h-64 md:w-auto md:h-auto   "
                src="/link.png"
                alt="image"
                width={300}
                height={300}
              />
            </div>
          </section>
          <section id="features" className="py-12 px-6  text-center">
            <h3 className="text-2xl font-bold mb-6">Why choose <span className=" text-fuchsia-500" >US?</span></h3>
            <div className="grid md:grid-cols-4 gap-6 ">
              {[
                { icon: FaLink, title: 'Custom Short Links', desc: 'Create branded, memorable URLs.' },
                { icon: FaChartBar, title: 'Analytics & Tracking', desc: 'Monitor link performance with analytics.' },
                { icon: FaBolt, title: 'Fast Redirects', desc: 'Experience quick and reliable redirection.' },
                { icon: FaShieldAlt, title: 'Secure & Private', desc: 'Keep data safe with privacy-focused shortening.' }
              ].map(({ icon: Icon, title, desc }, index) => (
                <div key={index} className="p-4 bg-gray-200 rounded shadow">
                  <Icon className="text-purple-500 text-3xl mx-auto mb-2" />
                  <h4 className="font-semibold">{title}</h4>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </section>  
          
      
        </main>
      );
}

export default lite
