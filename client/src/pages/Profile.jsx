import React from 'react';
import { useRef,useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {updateAvatar} from '../redux/user/userSlice.js';
export default function Profile() {
  const dispatch=useDispatch();
  const fileRef=useRef(null);
  const [file,setFile]=useState(undefined);
  console.log(file);
  const {currentUser}=useSelector((state)=>state.user);
  //console.log("Avatar URL:", currentUser?.avatar);
  const handleFileUpload=async (file)=>{
    const formData=new FormData();
    formData.append('avatar',file);
    formData.append('userID',currentUser._id);
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    try{
      const res=await fetch('/api/update/avatar',{
        method:'POST',
        body:formData,
      });
      //console.log(res);
      const data=await res.json();
      console.log(data);
      if(data.avatarURL)
      {
        const url=`http://localhost:3000${data.avatarURL}`
        console.log(url);
        dispatch(updateAvatar(url));
        //dispatch(updateAvatar(data.avatarURL));
      }
      else
      {
        console.log("error uploading image",data.message);
      }
    }
    catch(error)
    {
      console.log(error);
    }
  };
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-pink-700'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input 
        onChange={(e)=>setFile(e.target.files[0])}
        type="file" 
        ref={fileRef} hidden accept='image/*'/>
        {currentUser.avatar && (
        <img
          onClick={()=>fileRef.current.click()}
          src={currentUser.avatar}
          //src={image}
          alt="ProfileIcon"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
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
