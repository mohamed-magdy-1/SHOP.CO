"use client";

import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useState } from 'react';
import { GrPocket } from "react-icons/gr";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { useCartNum } from "@/app/context/cartNun";
import UserData from "../userData/UserData";

export default function Header() {
    const { num, setNum } = useCartNum();
    const [cartProduct, setCartProduct] = useState([]); // حالة لتخزين CartProduct
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const data1 = [
        {
            id: 1,
            name: "SHOP.CO",
            links: ['Shop', 'On Sale', 'New Arrivals', 'Brands'],
        },
    ];

    
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedCart = JSON.parse(localStorage.getItem("cartProducts") || "[]");
            setCartProduct(storedCart);
        }
    }, []);

    const fetchData = async (query) => {
        if (!query) {
            setData([]);
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?filters[title][$contains]=${query}&pagination[pageSize]=7`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });
            const result = await res.json();
            setData(result.data || []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setData([]);
            console.error("Error fetching alert data:", error);
        }
    };

    const debouncedFetchData = useCallback(
        debounce((query) => fetchData(query), 1000),
        []
    );

    useEffect(() => {
        setLoading(true);
        debouncedFetchData(search);
        return () => debouncedFetchData.cancel();
    }, [search, debouncedFetchData]);

    return (
        <>
            <div className="mt-1 container m-auto py-4 px-1">
                {data1.map((item) => (
                    <div
                        className="grid grid-cols-2 gap-2 w-full lg:grid-cols-[1.2fr_1.5fr_1.2fr]"
                        key={item.id}
                    >
                        <div className="logo flex gap-1 items-center text-black text-2xl font-bold">
                            <FiMenu className="pl-1 flex text-3xl cursor-pointer hover:scale-110 duration-300 ease-in-out lg:hidden" />
                            <Link href={'/'}>{item.name}</Link>
                        </div>

                        <div className="center hidden lg:flex items-center justify-center gap-10">
                            <ul className="links w-80 flex items-center justify-center gap-5">
                                {item.links.map((link, index) => (
                                    <li key={index} className="flex items-center justify-center gap-2 cursor-pointer">
                                        {link} {link === "Shop" && <GrPocket />}
                                    </li>
                                ))}
                            </ul>

                            <div className="search relative border w-[460px] p-2 grid grid-cols-[20px_99%] items-center justify-left gap-1 rounded-2xl text-gray-950 bg-gray-300">
                                <CiSearch className="text-2xl cursor-pointer font-normal" />
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border-none w-4/5 outline-none bg-transparent placeholder-gray-900"
                                    placeholder="Search for products..."
                                    type="text"
                                />

                                {search && (
                                    <div className="w-full h-auto absolute top-[45px] z-20 rounded-lg bg-white border-2">
                                        {loading ? (
                                            <p className="p-2">Loading...</p>
                                        ) : (
                                            data.length > 0 ? (
                                                data.map((product) => (
                                                    <Link
                                                        href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/product/${product.slug}`}
                                                        key={product.id}
                                                        className="p-2 hover:bg-gray-100 block"
                                                    >
                                                        {product.title}
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="p-2">No products found</p>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="icons-header flex items-center justify-end gap-1">
                            <CiSearch className="flex text-3xl cursor-pointer hover:scale-110 duration-300 ease-in-out lg:hidden" />
                            <Link href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/cart`} className="flex cursor-pointer hover:scale-110 duration-300 ease-in-out relative">
                                <span className="bg-black w-[17px] h-[17px] left-[15px] absolute text-white flex justify-center items-center text-[11px] rounded-full">
                                    { num || 0}
                                </span>
                                <CiShoppingCart className="text-3xl" />
                            </Link>
                            <UserData />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}