import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import {useSelector} from 'react-redux';
import Contact from '../components/Contact';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShareAlt,
} from 'react-icons/fa';
export default function Listing() {
  SwiperCore.use([Navigation]);
  const params=useParams();
  const [copied, setCopied] = useState(false);
  const [listing,setListing]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const [contact, setContact] = useState(false);
  const {currentUser}=useSelector((state)=>state.user);
  useEffect(()=>{
    const fetchListing=async()=>{
      try
      {
        setLoading(true);
        const res=await fetch(`/api/listing/getListing/${params.listingID}`);
        //console.log(res.status);
        const data=await res.json();
        //console.log(data);
        if(data.success===false)
        {
          setLoading(false);
          setError(true);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      }
      catch(err)
      {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  },[params.listingID]);
  return (
    <main>
      {loading && <p className='text-green-600 mt-5 font-bold'>Loading!</p>}
      {error && <p className='text-red-600 mt-5 font-bold'>Something went wrong!</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url)=>(
              <SwiperSlide key={url}>
                <div className='h-[550px]'
                 style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: 'cover' ,
                  imageRendering: 'auto' }}>               
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShareAlt
              className='text-pink-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[3%] z-10 rounded-md bg-slate-100 p-2 text-pink-500 
            md:top-[30%] md:right-[5%] max-w-[80%] sm:max-w-[60%] text-sm sm:text-base'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-2'>
            <p className='text-2xl font-bold text-pink-800'>
              {listing.name} - ₹{' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-IN')
                : listing.regularPrice.toLocaleString('en-IN')
              }
              {listing.type==='rent' && ' /month'}
            </p>
            <p className='flex items-center mt-4 gap-2 text-pink-800 font-semibold text-lg'>
                <FaMapMarkerAlt className='text-red-700' />
                {listing.address}
            </p>
            <div className='flex gap-4'>
                <p className='bg-red-600 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  {listing.type==='rent'?'For Rent':'For Sale'}
                </p>
                {listing.offer && (
                  <p className='bg-green-600 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                    ₹{+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )}
            </div>
            <p className='text-pink-700 font-semibold'>
                <span className='font-semibold text-pink-900'>Description -</span>{listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg' />
                {listing.bedrooms >1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef!==currentUser._id && !contact && (
              <button 
              onClick={()=>setContact(true)}
              className='bg-pink-200 mt-4 text-pink-700 p-3 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80'>
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  )
};