import React from 'react';
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
export default function Header() {
  return (
    <header className='bg-pink-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-pink-500'>MERN</span>
                    <span className='text-pink-700'>Estate</span>
                </h1>
            </Link>
            <form className='bg-pink-100 p-3 rounded-lg flex items-center'>
                <input type="text" placeholder="Search.." className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-pink-600' />
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline text-pink-700 hover:underline font-medium'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline text-pink-700 hover:underline font-medium'>About</li>
                </Link>
                <Link to='/sign-in'>
                    <li className='text-pink-700 hover:underline font-medium'>Sign in</li>
                </Link>
            </ul>
        </div>
    </header>
  )
}
