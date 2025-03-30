
'use client';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useUserData } from '@/app/context/userContext';

export default function forgotPassword() {
  //   const { user, setUser } = useUserData();
  const router = useRouter();
  // const token = Cookies.get("token");

  // useEffect(() => {
  //   if (token) {
  //     router.push('/');
  //   }
  // }, [token, router]);


  const [formData, setFormData] = useState({
    email: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


    async function sendLogin(e) {
      e.preventDefault();
  
  
      const dataRegister = {
        email: formData.email,
      };
  
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/forgot-password`, dataRegister);
        if (response.status === 200) {
          toast.success('send to your email successful!');
          router.push('/auth/login');
        }
      } catch (error) {
      }
    }

  return (
    <div className=' container m-auto flex mt-14 justify-center items-center'>
      <div className='border p-2 rounded-xl bg-white w-[300px]'>
        <h1 className='text-xl font-extrabold uppercase flex m-2 justify-center items-center '>Password Reset</h1>
      <form onSubmit={sendLogin} className='flex pb-3 gap-3 flex-col justify-center items-center'>
        <input name="email" value={formData.email} onChange={handleChange} className='border w-full rounded-lg outline-none p-2' type='email' placeholder='email'/>
          <button className='bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition'>
          send
          </button>
      </form>
      </div>
    </div>
  )
}
