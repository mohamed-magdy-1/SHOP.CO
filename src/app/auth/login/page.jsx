'use client';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useUserData } from '@/app/context/userContext';
export default function login() {
    const { user, setUser } = useUserData();
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router]);


  const [formData, setFormData] = useState({
    email: '',
    password:'',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


    async function sendLogin(e) {
      e.preventDefault();
  
  
      const dataRegister = {
        identifier: formData.email,
        password: formData.password,
      };
  
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`, dataRegister);
        console.log(response.data);
        if (response.status === 200) {
          Cookies.set('token', response.data.jwt, { expires: 7 });
          toast.success('Log In successful!');
          setUser(response.data.user)
          router.push('/');
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.error?.message || 'Log In failed!');
      }
    }

  return (
    <div className=' container m-auto flex mt-14 justify-center items-center'>
      <div className='border p-2 rounded-xl bg-white w-[300px]'>
        <h1 className='text-xl font-extrabold uppercase flex m-2 justify-center items-center '>welcome back</h1>
      <form onSubmit={sendLogin} className='flex border-b-2 pb-3 gap-3 flex-col justify-center items-center'>
        <input name="email" value={formData.email} onChange={handleChange} className='border w-full rounded-lg outline-none p-2' type='email' placeholder='email'/>
        <input name="password" value={formData.password} onChange={handleChange} className='border w-full rounded-lg outline-none p-2' type='password' placeholder='password'/>
          <button className='bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition'>
            Log In
          </button>
      </form>
      <div className='text-blue-500 border-b-2 pb-1'>
              <Link href={'/auth/forgotPassword'} >Lost your password?</Link>
      </div>
      <div className='text-center text-base '>
              <Link href={'/auth/register'} >register</Link>
      </div>
      </div>
    </div>
  )
}
