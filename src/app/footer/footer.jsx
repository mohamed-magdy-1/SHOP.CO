import React from "react";
import { FiMail } from "react-icons/fi";
import { SiFacebook } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram,FaGithub } from "react-icons/fa";
import Image from "next/image";
export default function Footer() {


  return (
    <div className="bg-[#F0F0F0] relative w-full mt-[150px]">
      <div className="container m-auto">
        <div className="bg-black w-full p-5 gap-3 sm:gap-0 grid grid-cols-1 sm:grid-cols-[1.5fr_2fr] justify-center sm:justify-items-end rounded-2xl relative top-[-50px] text-white">
          <div className="pl-8 w-[350px] sm:w-full">
            <h1 className="text-4xl font-black">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </h1>
          </div>
          <div className="grid pr-8 grid-cols-1 gap-2 justify-items-center ">
            <span className="bg-white text-black w-[250px] rounded-xl border flex gap-3 p-1 justify-center items-center">
              <FiMail />
              <input
                className="border-none outline-none"
                type="text"
                placeholder={"Enter your email address"}
              />
            </span>
            <span className="bg-white text-center text-black p-1 w-[250px] rounded-xl">
              <input type="submit" value={"Subscribe to Newsletter"} />
            </span>
          </div>
        </div>
        <div className="grid gap-8 p-5 grid-cols-1 border-b-2 pb-10 sm:grid-cols-[1fr_1.5fr_1.5fr] justify-items-stretch">
          <div className=" justify-items-start grid gap-4 grid-cols-1 ">
            <h1 className="text-2xl font-black">SHOP.CO</h1>
            <p className="text-gray-400 w-[350px] sm:w-full ">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
            <div className="flex gap-3">
                <span className="bg-white border rounded-full flex justify-center items-center text-2xl p-1"><BsTwitterX/></span>
                <span className="bg-white border rounded-full flex justify-center items-center text-2xl p-1"><SiFacebook/></span>
                <span className="bg-white border rounded-full flex justify-center items-center text-2xl p-1"><FaInstagram/></span>
                <span className="bg-white border rounded-full flex justify-center items-center text-2xl p-1"><FaGithub/></span>
            </div>
          </div>


          <div  className="">
            <div className="grid grid-cols-2 justify-items-start sm:justify-items-end">

            <div >
                <h1>Company</h1>
                <ul className="text-gray-400">
                    <li>About</li>
                    <li>Features</li>
                    <li>Works</li>
                    <li>Career</li>
                </ul>
            </div>

            <div>
            <h1>Company</h1>
                <ul className="text-gray-400">
                    <li>About</li>
                    <li>Features</li>
                    <li>Works</li>
                    <li>Career</li>
                </ul>
            </div>



            </div>
          </div>

          <div  className="">
            <div className="grid grid-cols-2 justify-items-start sm:justify-items-end">

            <div >
                <h1>Company</h1>
                <ul className="text-gray-400">
                    <li>About</li>
                    <li>Features</li>
                    <li>Works</li>
                    <li>Career</li>
                </ul>
            </div>

            <div>
            <h1>Company</h1>
                <ul className="text-gray-400">
                    <li>About</li>
                    <li>Features</li>
                    <li>Works</li>
                    <li>Career</li>
                </ul>
            </div>



            </div>
          </div>


        </div>
        
        <div className="pt-8 p-3 flex flex-wrap justify-center sm:justify-between ">
        <div className="text-gray-400 pb-2 sm:pb-0 ">
            Shop.co ©2025 - {new Date().getFullYear()}, All Rights Reserved for <span className='text-black'>Mohamed Magdy</span> 
        </div>
            <div className="flex gap-3">
                <Image src={'/assets/byments/Badge.png'} alt="img-byments" width={50} height={30}/>
                <Image src={'/assets/byments/Badge (1).png'} alt="img-byments" width={50} height={30}/>
                <Image src={'/assets/byments/Badge (2).png'} alt="img-byments" width={50} height={30}/>
                <Image src={'/assets/byments/Badge (3).png'} alt="img-byments" width={50} height={30}/>
                <Image src={'/assets/byments/Badge (4).png'} alt="img-byments" width={50} height={30}/>
            </div>
        </div>
      </div>
    </div>
  );
}
