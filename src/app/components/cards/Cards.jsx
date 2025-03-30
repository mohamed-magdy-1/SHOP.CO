
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaStar } from "react-icons/fa6";
export default function Cards({data,title,border,button}) {


  return (
    <div style={{borderBottom:border && "2px solid #4b5563"}} className='container m-auto pb-8'>
      { title && <div className='w-full text-5xl flex justify-center font-black my-10'>{title}</div>}
      <div  className='flex cursor-pointer flex-wrap justify-center md:justify-between overflow-hidden p-[10px] gap-2 md:gap-4'>
      {
        data?.map((item,i)=>(
          <Link href={`product/${item.slug}`} className=' max-[524px]:w-[170px]   md:w-[240px] lg:w-[300px] ' key={i}>
            <div className='img w-[100%]  max-[524px]:h-auto  h-[280px] overflow-hidden rounded-2xl bg-[#e0e0e0] '>
            {
              item?.imgProduct?.length > 0 &&
              <Image
              key={item.id}
              className="w-full h-full object-contain"
              src={"http://localhost:1337" + item?.imgProduct[0]?.url}
              alt="BannerBlack-photo"
              width={200}
              height={200}
              sizes='100vh' 
/>
            }

            </div>
            <div className='title text-base uppercase font-bold mt-3 w-40 truncate overflow-hidden whitespace-nowrap '>{item.title}</div>



<div className='flex '>
<div className="flex w-fit relative items-start">
  <span className='star flex text-gray-400'>
<FaStar />
<FaStar />
<FaStar />
<FaStar />
<FaStar />
  </span>

<div style={{width:`${(item?.reviewStar / 5 ) * 100}%`}} className='overflow-hidden absolute top-0 left-0 '>
  <span className='[display:ruby-text]  text-[#ffc700]'>
<FaStar />
<FaStar />
<FaStar />
<FaStar />
<FaStar />
</span>
</div>
</div>
<p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{item.reviewStar}</p>
    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">/</p>
    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
</div>


            <div style={{fontFamily: "cursive"}} className='price flex  items-center text-base font-bold '>
            {item?.discount > 0 ? (
                  <div className="flex items-center">
                    <span className="text-base font-bold">{`$${
                      item?.price - item?.price * (item?.discount / 100)
                    }`}</span>
                    <span className="text-gray-500 ml-3 line-through">{`$${item?.price}`}</span>
                    <span className=" ml-3 text-[10px] px-2  text-red-600 bg-red-200 rounded-2xl">{`-${item?.discount}%`}</span>
                  </div>
                ) : (
                  <span className="text-base font-bold">{`$${item?.price}`}</span>
                )}
              </div>
          </Link>
        ))
      }
      </div>

      {
        button &&
        <div className='w-[100%] flex justify-center items-center '>
        <div className='w-[150px] flex justify-center items-center cursor-pointer  rounded-2xl border p-3 m-7'>
          View All
        </div>
      </div>
      }

    </div>
  )
}




