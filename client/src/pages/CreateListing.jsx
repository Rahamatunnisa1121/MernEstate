import React from 'react';
import {useState} from 'react';
export default function CreateListing() {
  const [formData,setFormData]=useState({
    imageUrls:[],
  });
  console.log(formData);
  const [imageUploadError,setImageUploadError]=useState(false);
  const [files,setFiles]=useState([]);
  const [uploading,setUploading]=useState(false);
  const storeImage=async(file)=>{
    const formdata=new FormData();
    formdata.append('image',file);
     try{
          const res=await fetch('/api/listing/insertImage',{
            method:'POST',
            body:formdata,
          });
          //console.log(res);
          if (!res.ok) {
            throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
          const data=await res.json();
          //console.log(data);
          if(data.imageURL)
          {
            return `http://localhost:3000${data.imageURL}`
            //console.log(url);
          }
          else
          {
            throw new Error(`Error inserting image: ${data.message}`);
          }
        }
        catch(error)
        {
          return Promise.reject(error);
        }
  };
  const handleImageSubmit=(e)=>{
    e.preventDefault();
    if(files.length>0 && files.length + formData.imageUrls.length <7)
    {
      setUploading(true);
      setImageUploadError(false);
      const promises=[]; //an array to store the promises
      for(let i=0;i<files.length;i++)
      {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls)=>{
         //console.log(urls);
         setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});
         setImageUploadError(false);
         setUploading(false);
       })
       .catch((err)=>{
        setImageUploadError('Image upload failed (2 mb max per image)');
        setUploading(false);
       });
    }
    else
    {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };
  const handleDeleteImage=(index)=>{
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=>i!==index),
    });
  };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-pink-700 text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4  flex-1'>
              <input type="text" placeholder="Name" className='border p-3 rounded-lg border-pink-300' id='name' maxLength='62' minLength='10' required/>
              <textarea type="text" placeholder="Description" className='border p-3 rounded-lg border-pink-300' id='description' required/>
              <input type="text" placeholder="Address" className='border p-3 rounded-lg border-pink-300' id='address' required/>
              <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                  <input type='checkbox' id='sale' className='w-5'/>
                  <span className='text-pink-700 font-semibold'>Sell</span>
                </div>
                <div className='flex gap-2'>
                  <input type='checkbox' id='rent' className='w-5 '/>
                  <span className='text-pink-700 font-semibold'>Rent</span>
                </div>
                <div className='flex gap-2'>
                  <input type='checkbox' id='parking' className='w-5'/>
                  <span className='text-pink-700 font-semibold'>Parking spot</span>
                </div>
                <div className='flex gap-2'>
                  <input type='checkbox' id='furnished' className='w-5'/>
                  <span className='text-pink-700 font-semibold'>Furnished</span>
                </div>
                <div className='flex gap-2'>
                  <input type='checkbox' id='offer' className='w-5'/>
                  <span className='text-pink-700 font-semibold'>Offer</span>
                </div>
              </div>
              <div className='flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                  <input type='number' id="bedrooms" min='1' max='10' className='p-3 border border-pink-300 rounded-lg' required />
                  <p className='text-pink-700 font-semibold'>Bedrooms</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type='number' id="bathsrooms" min='1' max='10' className='p-3 border border-pink-300 rounded-lg' required />
                  <p className='text-pink-700 font-semibold'>Bathrooms</p>
                </div>
                <div className='flex items-center gap-2'>
                  <input type='number' id="regularPrice" min='1'max='10000000' className='p-3 border border-pink-300 rounded-lg' required />
                    <div className='flex flex-col items-center'>
                      <p className='text-pink-700 font-semibold'>Regular Price</p>
                      <span className='text-xs text-pink-600 font-semibold'>( ₹ / Month )</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                  <input type='number' id="discountPrice" min='1' max='10000000' className='p-3 border border-pink-300 rounded-lg' required />
                  <div className='flex flex-col items-center'>
                    <p className='text-pink-700 font-semibold'>Discounted Price</p>
                    <span className='text-xs text-pink-600 font-semibold'>( ₹ / Month )</span>
                  </div>
                </div>
            </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
              <p className='font-semibold text-pink-700'>Images:
                <span className='ml-2 font-normal text-pink-800'>The first image will be the cover (max 6)</span>
              </p>
              <div className='flex gap-4'>
                <input onChange={(e)=>setFiles(e.target.files)} className='p-3 text-pink-800 border border-pink-300 rounded w-full' type="file" id="images" accept="image/*" multiple />
                <button onClick={handleImageSubmit} disabled={uploading} className='p-3 border font-semibold border-pink-300  text-pink-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                  {uploading?'Uploading...':'Upload'}
                </button>
              </div>
              <p className='text-red-700 text-sm font-semibold'>{imageUploadError}</p>
              {
                formData.imageUrls.length>0 && formData.imageUrls.map((url,index)=>(
                  <div key={index} className='flex justify-between p-3 border border-pink-300 items-center'>
                    <img src={url} alt={`listing ${index}`} className="w-21 h-20 object-contain rounded-lg" />
                    <button type='button' onClick={()=>handleDeleteImage(index)} className='p-3 font-semibold text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                  </div>
                ))
              }
              <button className='bg-pink-300 text-pink-600 p-3 rounded-lg text-center uppercase font-medium hover:opacity-95 disabled:opacity-80'>
              Create Listing
              </button>
            </div>  
        </form>
    </main>
  );
}
