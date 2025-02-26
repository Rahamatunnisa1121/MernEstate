import React from 'react';
import {Link} from 'react-router-dom';
import { useRef,useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {deleteUserFailure, deleteUserStart, deleteUserSuccess, signoutUserFailure, signoutUserStart, signoutUserSuccess, updateAvatar,updateUserFailure,updateUserStart,updateUserSuccess} from '../redux/user/userSlice.js';
export default function Profile() {
  const dispatch=useDispatch();
  const fileRef=useRef(null);
  const [file,setFile]=useState(undefined);
  const [formData,setFormData]=useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError,setShowListingsError]=useState(false);
  const [fetching,setFetching]=useState(false);
  //console.log(file);
  const {currentUser,loading,error}=useSelector((state)=>state.user);
  //console.log("Avatar URL:", currentUser?.avatar);
  const [userListings,setUserListings]=useState([]);
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
      //console.log(data);
      if(data.avatarURL)
      {
        const url=`http://localhost:3000${data.avatarURL}`
        //console.log(url);
        dispatch(updateAvatar(url));
        setFormData({...formData,avatar:url});
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
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
    //console.log(formData);
  };
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try
    {
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      //console.log(data);
      if(data.success===false)
      {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }
    catch(err)
    {
      console.log(err);
      dispatch(updateUserFailure(err.message));
    }
  };
  const handleDeleteUser= async (e)=>{
    try
    {
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data=await res.json();
      //console.log(data);
      if(data.success===false)
      {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    }
    catch(err)
    {
      dispatch(deleteUserFailure(err.message));
    }
  };
  const handleSignOut=async()=>{
    try
    {
      dispatch(signoutUserStart());
      const res=await fetch('/api/auth/signout');
      const data=await res.json();
      if(data.success===false)
      {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess());
    }
    catch(err)
    {
      dispatch(signoutUserFailure(err.message));
      //console.log(err);
    }
  };
  const handleShowListings=async()=>{
    try
    {
      setFetching(true);
      setShowListingsError(false);
      const res=await fetch(`/api/user/listings/${currentUser._id}`);
      const data= await res.json();
      if(data.success==false)
      {
        setFetching(false);
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
      //console.log(data);
      setFetching(false);
    }
    catch(error)
    {
      setFetching(false);
      setShowListingsError(true);
      //console.log(error);
    }
  };
  const handleDeleteListing=async(listingID)=>{
    try{
      const res=await fetch(`/api/listing/delete/${listingID}`,{
        method:'DELETE',
      });
      const data=await res.json();
      //console.log(data);
      if(data.success===false)
      {
        console.log(data.message);
        return;
      }
      setUserListings((prev)=>
        prev.filter((listing)=>listing._id!==listingID)
      );
    }
    catch(err){
      console.log(err);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-pink-700'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
        onChange={(e)=>setFile(e.target.files[0])}
        type="file" 
        ref={fileRef} hidden accept='image/*'/>
        {currentUser.avatar && (
        <img
          src={currentUser.avatar}
          onClick={()=>fileRef.current.click()}
          //src={image}
          alt="ProfileIcon"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        )}
        <input type="text" placeholder='Username' defaultValue={currentUser.username} id='username' onChange={handleChange} className='border p-3 rounded-lg border-pink-300'/>
        <input type="text" placeholder='Email' defaultValue={currentUser.email} onChange={handleChange} id='email' className='border p-3 rounded-lg border-pink-300'/>
        <input type="text" placeholder='Password' id='password'onChange={handleChange} className='border p-3 rounded-lg border-pink-300'/>
        <button disabled={loading} className='bg-pink-200  text-pink-700 p-3 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80'>{loading?'Updating..':'Update'}</button>
        <Link to={"/create-listing"} className='bg-pink-300 text-pink-600 p-3 rounded-lg text-center uppercase font-medium hover:opacity-95 disabled:opacity-80'>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-pink-800 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-pink-800 cursor-pointer'>Sign out</span>
      </div>
      {error && <p className='text-red-600 mt-5 font-bold'>{error}</p>}
      {updateSuccess &&<p className='text-green-600 mt-5 font-bold'>User updated successfully!</p>}
      <button onClick={handleShowListings} disabled={fetching} className='text-pink-800 w-full font-semibold'>{fetching?'Fetching..':'Show Listings'}</button>
      <p className='text-red-600 mt-5 font-bold'>{showListingsError?'Error showing listings..':''}</p>
      {userListings && userListings.length>0 &&
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-xl text-cyan-700 font-semibold'>Your Listings</h1>
          {userListings.map((listing)=>
          <div key={listing._id} className='border border-pink-300 rounded-lg p-3 flex justify-between items-center gap-4'>
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt="Listing cover" className='h-16 w-16 object-contain'/>
            </Link>
            <Link className='flex-1 text-black-500 font-semibold hover:underline truncate' to={`/listing/${listing._id}`}>
              <p>{listing.name}</p>
            </Link>
            <div className='flex flex-col items-center'>
              <button onClick={()=>handleDeleteListing(listing._id)} className='text-red-600 uppercase font-semibold'>Delete</button>
              <Link to={`/update-listing/${listing._id}`}>
              <button className='text-green-600 uppercase font-semibold'>Edit</button>
              </Link>
              </div>
          </div>
        )}
        </div>
      }
    </div>
  )
}
