
import React from 'react'
import { FaLongArrowAltLeft,FaLongArrowAltRight  } from "react-icons/fa";
export default function Pagination({meta ,setPageIndex }) {
    // pageCount, pageIndex, 
    let pageCount = meta.pageCount;
    let pageIndex = meta.page;


    const prevSlide = () => {
        setPageIndex(pageIndex === 1 ? pageCount : (prev) => prev - 1);
    };


    const nextSlide = () => {
        setPageIndex(pageIndex === pageCount ? 1 : (prev) => prev + 1);
    };



    const getPagesNumberPagination = () => {
        const pages = [];
        const range = 2; 

        if (pageCount > 1) {
            pages.push(1);
        }

        for (let i = Math.max(range, pageIndex - range ); i <= Math.min(pageCount - 1, pageIndex + range); i++) {
            pages.push(i);
            
        }

        if (pageIndex > range + 2) {
            pages.splice(1, 0, '...');
        }


        if (pageIndex < pageCount - (range + 1)) {
            pages.push('...');
        }


        if (pageCount > 1) {
            pages.push(pageCount);
        }
        return pages;
    }
    const PaginationArray = getPagesNumberPagination();

  return (
    <div className='flex w-full flex-wrap justify-between items-center'>
        <div onClick={prevSlide} className='flex rounded-lg cursor-pointer justify-center items-center gap-2 p-2 border text-black'><FaLongArrowAltLeft /> Previous</div>
        <div className='flex justify-center items-center gap-1 text-gray-400'>
        {PaginationArray?.map((el,i) => (
            <span onClick={()=>setPageIndex(i + 1)} key={i} style={{ backgroundColor: pageIndex === el ? "#F0F0F0": "transparent" }} className='px-3 py-1 cursor-pointer rounded-lg'>{el}</span>
                ))}
        </div>
        <div onClick={nextSlide} className='flex rounded-lg cursor-pointer justify-center items-center gap-2 p-2 border text-black'>Next <FaLongArrowAltRight /></div>
    </div>
  )
}
