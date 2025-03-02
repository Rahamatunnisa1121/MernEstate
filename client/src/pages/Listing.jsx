import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
export default function Listing() {
  SwiperCore.use([Navigation]);
  const params=useParams();
  const [listing,setListing]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  useEffect(()=>{
    const fetchListing=async()=>{
      try
      {
        setLoading(true);
        const res=await fetch(`/api/listing/getListing/${params.listingID}`);
        //console.log(res.status);
        const data=await res.json();
        console.log(data);
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
        <>
          <Swiper navigation lazy={false}>
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
        </>
      )}
    </main>
  )
};