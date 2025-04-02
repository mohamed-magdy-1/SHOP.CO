"use client"
import React, { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaTrashAlt, FaHome } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import Link from 'next/link';
import { useCartNum } from '../context/cartNun';
import { TbCreditCardPay } from "react-icons/tb";
import { toast, ToastContainer } from 'react-toastify';

export default function Page() {
    const { num, setNum } = useCartNum();


const [cartProducts, setCartProducts] = useState(() => {

  if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartProducts");
      return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
});
    

    const totalPrice = useMemo(() => 
        cartProducts.reduce((sum, item) => sum + item.priceAmount, 0), 
        [cartProducts]
    );

    const PriceDiscount = (price, amount, discount) => {
        const originalPrice = price * (amount);
        const discountAmount = originalPrice * (discount / 100);
        return originalPrice - discountAmount;
    };


    const removeProduct = (index) => {
        const updatedCart = cartProducts.filter((_, i) => i !== index);
        setCartProducts(updatedCart);
        localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
        toast.success('Removed product successfully!');
        setNum(updatedCart.length);
    };

    useEffect(() => {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

    const updateCartItem = (updatedItem) => {
        setCartProducts((prevCart) =>
            prevCart.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

    const counterPlus = (el) => {
        if (el.projectsAmountNeed < el.projectsAmount) {
            const newData = {
                ...el,
                priceAmount: PriceDiscount(el?.price, el?.projectsAmountNeed + 1, el?.discount),
                projectsAmountNeed: el.projectsAmountNeed + 1,
            };
            updateCartItem(newData);
        }
    };

    const counterMinus = (el) => {
        if (el.projectsAmountNeed > 1) {
            const newData = {
                ...el,
                priceAmount: PriceDiscount(el?.price, el?.projectsAmountNeed - 1, el?.discount),
                projectsAmountNeed: el.projectsAmountNeed - 1,
            };
            updateCartItem(newData);
        }
    };

    return (
        <div className='container m-auto'>
            <h1 className='text-4xl font-black m-4'>Your cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
                <div className='products h-full border rounded-2xl p-3'>
                    {cartProducts.map((el, index) => (
                        <div key={index} className="grid grid-cols-[1fr_auto] border-b-2 p-1 pb-5">
                            <div className='flex gap-3'>
                                <div className="w-[100px] h-[95px] flex justify-center items-center rounded-2xl overflow-hidden bg-[#f0f0f0]">
                                    <Image
                                        className="w-full h-full object-contain"
                                        src={el.imgProduct}
                                        alt="product-img"
                                        loading="lazy"
                                        width={100}
                                        height={100}
                                    />
                                </div>

                                <div>
                                    <h2 className='text-base sm:text-xl font-bold'>{el.title}</h2>
                                    <h4 className='text-xs text-gray-400'><span className='text-black'>Size:</span> {el.size}</h4>
                                    <h4 className='text-xs text-gray-400'><span className='text-black'>Color:</span> {el.color}</h4>
                                    <h4 className='mt-2 text-xl font-bold'>${el.priceAmount}</h4>
                                </div>
                            </div>

                            <div className='flex flex-col justify-between items-end'>
                                <div onClick={() => removeProduct(index)} className='text-red-500 cursor-pointer text-2xl'>
                                    <FaTrashAlt />
                                </div>

                                <div className="flex select-none w-[100px] h-[30px] justify-between items-center text-xl gap-2 bg-slate-200 text-black p-2 px-3 rounded-3xl">
                                    <span onClick={() => counterMinus(el)} className="cursor-pointer"><FiMinus /></span>
                                    <span>{el.projectsAmountNeed}</span>
                                    <span onClick={() => counterPlus(el)} className="cursor-pointer"><FiPlus /></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='details-price h-[370px] p-3 rounded-2xl border'>
                    <h1 className='font-semibold text-lg my-3'>Order Summary</h1>

                    <div className='grid grid-cols-1 gap-4 py-2 border-b-2'>
                        <div className='flex justify-between items-center '>
                            <span className='text-gray-400 text-lg'>Subtotal</span>
                            <span className='text-lg'>${totalPrice}</span>
                        </div>
                        <div className='flex justify-between items-center '>
                            <span className='text-gray-400 text-lg'>Discount (-20%)</span>
                            <span className='text-red-500 text-lg'>-${totalPrice * 0.2}</span>
                        </div>
                        <div className='flex justify-between items-center '>
                            <span className='text-gray-400 text-lg'>Delivery Fee</span>
                            <span className='text-lg'>$10</span>
                        </div>
                    </div>

                    <div>
                        <div className='flex justify-between items-center py-4'>
                            <span className='text-lg'>Total</span>
                            <span className='text-2xl'>${totalPrice - totalPrice * 0.2 + 10}</span>
                        </div>
                        <div className='flex items-center justify-between gap-5'>
                            <div className='w-full bg-[#F0F0F0] rounded-full flex items-center gap-1 p-2'>
                                <IoPricetagOutline />
                                <input className='border-none outline-none bg-[#F0F0F0]' type='text' placeholder='Add promo code' />
                            </div>
                            <div className='bg-black px-8 cursor-pointer p-2 flex items-center justify-center rounded-full text-white'>Apply</div>
                        </div>
                    </div>

                    {cartProducts.length > 0 ? (
                        <Link href={'/checkout'} className='bg-black py-3 cursor-pointer mt-2 w-full flex gap-2 items-center justify-center rounded-full text-white'>Go to Checkout <TbCreditCardPay /></Link>
                    ) : (
                        <Link href={'/'} className='bg-black py-3 cursor-pointer mt-2 w-full flex gap-2 items-center justify-center rounded-full text-white'>Cart is empty <FaHome /></Link>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
