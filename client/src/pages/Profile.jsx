import React from 'react';
import { useSelector } from 'react-redux';
export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user);
  console.log("Avatar URL:", currentUser?.avatar);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-pink-700'>Profile</h1>
      <form action="" className='flex flex-col gap-4'>
      {currentUser?.avatar && (
        <img
          src={currentUser.avatar}
          alt="ProfileIcon"
          className="rounded-full h-20 w-20 object-cover cursor-pointer self-center mt-2"
        />
      )}
        <input type="text" placeholder='Username' id='username' className='border p-3 rounded-lg border-pink-300'/>
        <input type="text" placeholder='Email' id='email' className='border p-3 rounded-lg border-pink-300'/>
        <input type="text" placeholder='Password' id='password' className='border p-3 rounded-lg border-pink-300'/>
        <button className='bg-pink-200  text-pink-700 p-3 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-pink-800 cursor-pointer'>Delete Account</span>
        <span className='text-pink-800 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
