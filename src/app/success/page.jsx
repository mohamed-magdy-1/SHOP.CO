'use client';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function Success() {
  useEffect(() => {
    toast.success('Payment completed successfully!');
    localStorage.removeItem('cartProducts');
  }, []);

return (
<div className="container m-auto flex mt-14 justify-center items-center">
    <div className="border p-4 rounded-xl bg-white w-[300px] text-center">
        <h1 className="text-xl font-extrabold uppercase mb-4">Payment Success</h1>
        <p className="mb-4">Your payment has been processed successfully.</p>
        <Link href="/">
        <button className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition">
            Go to Home
        </button>
        </Link>
    </div>
    </div>
);
}