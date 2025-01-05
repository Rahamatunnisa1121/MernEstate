import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess,signInFailure } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleGoogleClick=async()=>{
        try
        {
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);//Retrieves firebase authentication instance for app
            const result=await signInWithPopup(auth,provider);
            const res=await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                }),
            });
            const data=await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
            //console.log(data);
            //console.log(result);
        }
        catch(error)
        {
            console.log("couldnot connect with google",error);
            dispatch(signInFailure(error.message));
        }
    };
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-pink-300  text-pink-600 p-3 rounded-lg uppercase font-medium hover:opacity-95 disabled:opacity-80'>Continue With google</button>
  );
};
