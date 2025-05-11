"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Generate = () => {

    const searchParams = useSearchParams()

    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get('handle'))
    const [pic, setpic] = useState("")
    const [des, setdes] = useState("")
    const setlink = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }
                else {
                    return item
                }
            })
        })
    }
    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))

    }
    const router = useRouter();
    const handleClick = () => {
        if (handle.trim()) {
            router.push(`/a/${handle}`);
        }
    };

    const [linkCreated, setLinkCreated] = useState(false);

    const [isAvailable, setIsAvailable] = useState(null);


    const submitLink = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        setLinkCreated(true);
        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "des": des
        });

        console.log(raw)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };





        const r = await fetch("http://localhost:3000/api/link", requestOptions)
        const result = await r.json()

        if (result.success) {
            toast.success(result.message)
            setLinks([])
            setpic("")
            sethandle("")
        }
        else {
            toast.error(result.message)
        }
    }
    return (
        <div className="min-h-screen text-white  flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-34 gap-10 ">


            <div className="flex-1  text-white rounded-lg shadow-lg">
                <h1 className="text-4xl md:text-5xl p-8 font-extrabold text-white mb-8 text-center">
                    Create your link page with <span className="text-fuchsia-500">MULTIMANTRA</span>
                </h1>

                {/* Step 1 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        Step 1: Claim your Handle
                    </h2>
                    <input
                        type="text"
                        value={handle}
                        onChange={async (e) => {
                            const value = e.target.value;
                            setHandle(value);

                            try {
                                const res = await fetch(`/api/checkHandle?handle=${value}`);
                                const data = await res.json();

                                if (data.exists) {
                                    setLinkCreated(true);
                                } else {
                                    setLinkCreated(false);
                                }
                            } catch (err) {
                                console.error('Error checking handle:', err);
                            }
                        }}
                        placeholder="Enter your handle"
                    />

                </div>

                {/* Step 2 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        Step 2: Add Links
                    </h2>
                    {links && links.map((item, index) => {
                        return <div key={index} className="flex gap-4 py-2 flex-col sm:flex-row">
                            <input value={item.link || ""} onChange={e => { setlink(index, e.target.value, item.linktext) }} type="text" placeholder="Enter link " className="flex-1 p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            />
                            <input value={item.linktext || ""} onChange={e => { setlink(index, item.link, e.target.value) }} type="text" placeholder="Site name" className="flex-1 p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
                            />
                        </div>
                    })}
                    <div className="pt-2">
                        <button onClick={() => addLink()} type="button" className="bg-gradient-to-r from-gray-500 to-gray-900 text-white font-semibold text-sm p-3 px-4 rounded-full shadow-sm hover:scale-105 transition-transform hover:bg-gradient-to-l duration-200 cursor-pointer">
                            Add Link</button>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="mb-8 felx gap-4 flex-col items-center justify-center  ">
                    <h2 className="text-2xl font-semibold text-white  mb-4">
                        Step 3: Add Picture and Discription
                    </h2>
                    <div>
                        <input value={pic || ""} onChange={e => { setpic(e.target.value) }} type="text" placeholder="Enter link to your Picture" className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
                        /></div>

                    <div className=" pt-7 "> <input value={des || ""} onChange={e => { setdes(e.target.value) }} type="text" placeholder="Enter Discription" className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-500 transition"
                    /></div>
                </div>
                <div className=" flex  gap-4    ">
                    {/* Final Button */}
                    <button onClick={() => { submitLink() }} className="w-full text-white bg-gradient-to-r from-purple-900 to-pink-800 hover:bg-gradient-to-l  font-semibold  rounded-full text-sm p-4 text-center me-2 mb-2 hover:scale-105 transition cursor-pointer">
                        Create your Link
                    </button>

                    {linkCreated && (
                        <button
                            className="w-full text-white bg-gradient-to-r from-purple-900 to-pink-800 hover:bg-gradient-to-l  font-semibold  rounded-full text-sm p-4 text-center me-2 mb-2 hover:scale-105 transition cursor-pointer"
                            onClick={() => router.push(`/a/${handle}`)}
                        >
                            Get Your Page
                        </button>
                    )}

                </div>
            </div>

            {/* Right Section - Image */}
            <div className="flex-1 flex justify-center rounded-3xl items-center">
                <img className=" rounded-3xl  "
                    src="/generate.png" alt="bitlink preview"
                />
            </div>
            <ToastContainer />
        </div>
    );
};

export default Generate;
