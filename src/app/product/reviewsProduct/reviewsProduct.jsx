import React from 'react'
import { GrPocket } from "react-icons/gr";
import { FaStar } from "react-icons/fa6";
import {
  IoIosCheckmarkCircle,
} from "react-icons/io";
import { MdOutlineMoreHoriz } from "react-icons/md";
export default function ReviewsProduct() {

  let data = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
  ];






  return (
    <div className='container m-auto mt-10'>
      <div className='w-full h-[30px]  grid justify-items-center grid-cols-3  text-gray-400'>
        <span className='hover:text-black w-full text-center ease-in-out cursor-pointer  hover:border-b-2 border-black'>Product Details</span>
        <span className='hover:text-black w-full text-center ease-in-out cursor-pointer  hover:border-b-2 border-black'>Rating & Reviews</span>
        <span className='hover:text-black w-full text-center ease-in-out cursor-pointer  hover:border-b-2 border-black'>FAQs</span>
      </div>


      <div>
        <div className='p-4 flex items-center justify-between border-t-2'>
          <div className='text-[15px] md:text-lg'>All Reviews (45)</div>
          <div className='flex items-center justify-center gap-1 sm:gap-3'>
            <div className=' flex items-center justify-center  w-[8px] h-[8px] sm:w-[20px] sm:h-[20px] bg-slate-200 p-5 rounded-full'>=</div>
            <div className='flex items-center justify-center px-2 text-[12px] sm:text-base sm:px-5 py-2 rounded-3xl bg-gray-200 text-black'>Latest <GrPocket /></div>
            <div className='bg-black text-white px-2 text-[12px] sm:text-base sm:px-5 py-2 rounded-3xl'>Write a Review</div>
          </div>
        </div>

        <div className='flex p-2 flex-wrap justify-center items-center gap-3'>
          {
            data.map((item)=>(
              <div key={item.id} className="border rounded-2xl p-5 sm:w-[45%] ">
              <div className='flex justify-between items-center'>
              <div className='flex '>
              <div className="flex w-fit relative items-start">
                <span className='star flex text-gray-400'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
                </span>
              
              <div style={{width:`${(4.3 / 5 ) * 100}%`}} className='overflow-hidden absolute top-0 left-0 '>
                <span className='[display:ruby-text]  text-[#ffc700]'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              </span>
              </div>
              </div>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.5</p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">/</p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
              </div>
              <div className='text-gray-500 text-[20px]'>
              <MdOutlineMoreHoriz />
              </div>
              
              </div>

              <div className='mt-3'>
              <h3 className="text-xl font-bold flex gap-2 mb-3 items-center">
                              Mark.joo <IoIosCheckmarkCircle className="text-green-600" />
                            </h3>
                            <p className="text-gray-500 text-sm">
                              "As someone who's always on the lookout for unique fashion
                              pieces, I'm thrilled to have stumbled upon Shop.co. The
                              selection of clothes is not only diverse but also on-point with
                              the latest trends.”
                            </p>
              </div>



                            <div className='text-gray-500 mt-5'>
                              <h3>Posted on August 15, 2023</h3>
                            </div>
            </div>
            ))
          }


        </div>

        <div className='w-[100%] flex justify-center items-center '>
        <div className='w-[250px] flex justify-center items-center cursor-pointer  rounded-2xl border p-3 m-7'>
        Load More Reviews
        </div>
      </div>
      </div>
    </div>
  )
}
