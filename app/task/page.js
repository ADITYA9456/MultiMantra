import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Task = () => {
  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 md:main min-h-[88.2vh]">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-500'> &lt;</span>
          <span>Vault</span><span className='text-green-500'>X/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" />
            <div className="relative">
              <input placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" />
              <span className='absolute right-[3px] top-[4px] cursor-pointer'>
                <img className='p-1' width={26} src="/img/eye.png" alt="eye" />
              </span>
            </div>
          </div>
          <button className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          <div>No passwords to show</div>
        </div>
      </div>
    </>
  );
}

export default Task;
