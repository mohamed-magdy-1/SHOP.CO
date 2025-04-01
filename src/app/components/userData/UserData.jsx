"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useUserData } from '@/app/context/userContext';
import { IoPersonCircleOutline } from "react-icons/io5";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoIosLogOut } from "react-icons/io";
import { FaFingerprint } from "react-icons/fa";
export default function UserData() {
  const { user, setUser } = useUserData();
  const token = Cookies.get("token");

  async function getUserData() {
    if (!token) {
      console.log('No token found. Please log in.');
    } else {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.log('Error fetching user data:', error.message);
      }
    }
  }

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <>
      {user === null ? (
        <Link href={'/auth/login'}>
          <IoPersonCircleOutline className="text-3xl cursor-pointer hover:scale-110 duration-300 ease-in-out" />
        </Link>
      ) : (
        <div  className='cursor-pointer group relative flex  justify-center items-center rounded-full w-[26px] h-[26px] bg-black text-white'>
          {user.username.charAt(0).toUpperCase()}
          <div className='w-[100px] mt-2 flex-col  hidden overflow-hidden group-hover:flex transition duration-300    top-[19px] z-10  justify-center gap-1 items-center  bg-white text-black absolute border rounded-lg'>
            <div onClick={handleLogout} className='w-full p-2 hover:bg-slate-400 duration-300 ease-in-out   flex justify-between items-center gap-2' > 
              profile
              <FaFingerprint />
            </div>
            <div onClick={handleLogout} className='w-full p-2  hover:bg-slate-400 duration-300 ease-in-out  flex justify-between items-center gap-2' > 
              Log out 
              <IoIosLogOut />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
