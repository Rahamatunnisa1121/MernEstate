import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-pink-700'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='Username'
        className='border p-3 rounded-lg border-pink-300' id='username'/>
        <input type="email" placeholder='Email address'
        className='border p-3 rounded-lg border-pink-300' id='password'/>
        <input type="password" placeholder='Password'
        className='border p-3 rounded-lg border-pink-300' id='password'/>
        <button className='bg-pink-200  text-pink-700 p-3 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80'>Sign Up</button>
        <button className='bg-pink-200  text-pink-600 p-3 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80'>Continue With google</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-pink-600'>Had an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-pink-800 underline'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
