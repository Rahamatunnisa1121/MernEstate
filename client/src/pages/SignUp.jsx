import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {useState} from 'react';
export default function SignUp() {
  const [formData,setFormData]=useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.id]:e.target.value,
      });
  };
  const handleSubmit=async (e)=>{
    e.preventDefault(); //to prevent refreshing the page on submit
    try
    {
      setLoading(true);
      const res=await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),//to convert the json value to json formatted string
      });
      const data=await res.json();
      console.log(data);
      if(data.success===false)
      {
        setError(data.message);
        setLoading(false);
        return;
      }
        setLoading(false);
        setError(null);
        navigate('/sign-in'); //hook
    }
    catch(error)
    {
      setLoading(false);
      setError(error.message);
    }
  };
  //console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-pink-700'>Sign up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='Username'
        className='border p-3 rounded-lg border-pink-300' id='username' onChange={handleChange}/>
        <input type="email" placeholder='Email address'
        className='border p-3 rounded-lg border-pink-300' id='email' onChange={handleChange}/>
        <input type="password" placeholder='Password'
        className='border p-3 rounded-lg border-pink-300' id='password'onChange={handleChange}/>
        <button disabled={loading} className='bg-pink-200  text-pink-700 p-3 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'Sign Up'}</button>
        <button className='bg-pink-200  text-pink-600 p-3 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80'>Continue With google</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-pink-600'>Had an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-pink-800 underline'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-5 font-bold'>Something went wrong!</p>}
    </div>
  )
}
