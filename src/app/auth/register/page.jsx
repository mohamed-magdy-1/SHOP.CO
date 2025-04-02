'use client';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useUserData } from '@/app/context/userContext';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const { setUser } = useUserData(); 
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [token, setToken] = useState(Cookies.get("token")); // إدارة الـ token في حالة

  // التحقق من الـ token وإعادة التوجيه إذا كان موجودًا
  useEffect(() => {
    const currentToken = Cookies.get("token");
    if (currentToken) {
      router.push('/');
    }
  }, [router]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    ConfirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.ConfirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const dataRegister = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local/register`,
        dataRegister
      );

      if (response.status === 200) {
        Cookies.set('token', response.data.jwt, { expires: 7 });
        toast.success('Registration successful!');
        setUser(response.data.user);
        router.push('/');
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Registration failed!');
      setLoading(false)
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="container m-auto flex mt-14 justify-center items-center">
      <div className="border px-2 rounded-xl bg-white w-[300px]">
        <h1 className="text-xl font-bold uppercase flex m-2 justify-center items-center">
          Register for Free
        </h1>
        <form onSubmit={sendRegister} className="flex border-b-2 pb-3 gap-3 flex-col justify-center items-center">
          <input
            name="username"
            minLength={3}
            value={formData.username}
            onChange={handleChange}
            className="border w-full rounded-lg outline-none p-2"
            type="text"
            placeholder="Username"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border w-full rounded-lg outline-none p-2"
            type="email"
            placeholder="Email"
            required
          />
          <input
            minLength={6}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border w-full rounded-lg outline-none p-2"
            type="password"
            placeholder="Password"
            required
          />
          <input
            minLength={6}
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            className="border w-full rounded-lg outline-none p-2"
            type="password"
            placeholder="Confirm Password"
            required
          />
          <button className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition">
            
            {
              loading ? "loading..." : "Register"
            }
          </button>
        </form>
        <div className="text-center text-sm p-2">
          <Link href="/auth/login">I already have an account: Log In</Link>
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
}