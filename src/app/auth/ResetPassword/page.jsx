"use client";
import { toast } from 'react-toastify';
import axios from 'axios';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';


function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code"); 
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirmation: '',
  });

  if (!code) {
    toast.error("Invalid reset code!");
    router.push('/auth/login');
    return null; 
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function sendLogin(e) {
    e.preventDefault();

    const dataRegister = {
      code,
      password: formData.password,
      passwordConfirmation: formData.passwordConfirmation,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/reset-password`,
        dataRegister
      );

      if (response.status === 200) {
        toast.success('Password reset successful!');
        router.push('/auth/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Reset failed!');
    }
  }

  return (
    <div className='container m-auto flex mt-14 justify-center items-center'>
      <div className='border p-2 rounded-xl bg-white w-[300px]'>
        <h1 className='text-xl font-extrabold uppercase flex m-2 justify-center items-center'>
          Password Reset
        </h1>
        <form onSubmit={sendLogin} className='flex pb-3 gap-3 flex-col justify-center items-center'>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className='border w-full rounded-lg outline-none p-2'
            type='password'
            placeholder='New password'
          />
          <input
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            className='border w-full rounded-lg outline-none p-2'
            type='password'
            placeholder='Confirm password'
          />
          <button className='bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition'>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}


export default function ResetPassword() {
  return (
    <Suspense fallback={<div className="text-center mt-14">جارٍ التحميل...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}