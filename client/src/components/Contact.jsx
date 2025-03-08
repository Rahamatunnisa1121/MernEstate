import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const [landlord,setLandlord]=useState(null);
    const [err,setError]=useState(false);
    const [message,setMessage]=useState("");
    useEffect(()=>{
        const fetchLandlord=async()=>{
            try
            {
                const res=await fetch(`/api/user/${listing.userRef}`);
                const data=await res.json();
                //console.log(data);
                setLandlord(data);
                setError(false);
            }
            catch(err)
            {
                //console.log(err);
                setLandlord(null);
                setError(err);
            }
        }
        fetchLandlord();
    },[listing.userRef]);
    const onChangeText=(e)=>{
        setMessage(e.target.value);
    };
  return (
    <>
        {err && <p className='text-red-600 mt-5 font-bold'>{err.message}</p>}
        {landlord && (
            <div className='flex flex-col gap-3'>
                <p className='text-pink-700 text-lg'>Contact <span className=' text-pink-800 font-bold'>{landlord.username}</span> for <span className='text-pink-800 font-bold'>{listing.name.toLowerCase()}</span></p>
                <textarea className='w-full border border-pink-600 p-3 rounded-lg'
                placeholder='Enter your message here!'
                name="message" id="message" rows="2" value={message} onChange={onChangeText}></textarea>
                <Link className='font-semibold bg-pink-200 text-green-700 border border-pink-600 text-center p-3 rounded-lg uppercase hover:opacity-95'
                to={`mailto:${landlord.email}?subject=${encodeURIComponent(`Regarding ${listing.name} trade`)}&body=${encodeURIComponent(message)}`}>
                Send Message</Link>
            </div>
        )}
    </>
    
  )
}
