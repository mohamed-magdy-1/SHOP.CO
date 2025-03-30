'use client'
import React, { useEffect, useState } from 'react'
import Cards from '../components/cards/Cards'
import { IoMdCheckmark } from "react-icons/io";
import { CRangeSlider } from '@coreui/react-pro'
import { GiSettingsKnobs } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import Pagination from '../components/pagination/pagination'
export default function Category() {
let  [data ,setData] = useState(null);
let  [meta ,setMeta] = useState(null);
let  [PageIndex ,setPageIndex] = useState(1);
let  [color ,setColor] = useState('');
let  [size ,setSize] = useState('');
let  [price ,setPrice] = useState('');
let  [dressStyle ,setDressStyle] = useState('');
let  [category ,setCategory] = useState('');
let  [openClose,setOpenClose] = useState(true);
let  [applyFilter,setApplyFilter] = useState(true);

function buildStrapiUrl() {
  let url = `http://localhost:1337/api/products?populate=*`;
  if (dressStyle) {
    url += `&filters[categories][title][$in]=${encodeURIComponent(dressStyle)}`;
  }
  if (size) {
    url += `&filters[size][colorORsize][$in]=${encodeURIComponent(size)}`;
  }


  if (color) {
    url += `&filters[color][colorORsize][$in]=${encodeURIComponent(color)}`;
  }


  if (price) {
    url += `&filters[price][$in]=${encodeURIComponent(price)}`;
  }

  return url;
}
const url = buildStrapiUrl();

useEffect(()=>{
  const fetchData = async () => {
    try {
      const res = await fetch( url  + `&pagination[page]=${PageIndex}&pagination[pageSize]=10`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer e896b3b3835ed3f674a0ffa22f418e7d21e9bfa28de5a24c013f9f6ff042f40ef78589f0292071d4235ac240dce189d83b160a9513224b5cbff40bfab0fbea5784cbc69a0236323bd4af911f903e188a6efba392eff08232041fcb04639ecd7f62d7a7ad887fddd859438a41246a7cb6ec32e7b222b9701c18958de47fbec109`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const result = await res.json(); 
      setData(result.data || []); 
      setMeta(result.meta.pagination)
    } catch (error) {
      setData([])
      console.error("Error fetching alert data:", error);
    }
  };
  fetchData()
},[applyFilter,PageIndex])


if(!data){
  return <div>Loading...</div>
}

return (
  <div>
    <div className="container m-auto pt-10 border-t-2 flex gap-5 ">

      <div style={{opacity:openClose === true ? "1" : "0",zIndex:openClose === true ? "50" : "-50",transition:"0.1s ease-in-out"}} className='md:border w-[100%] h-[100%] bg-[#0000008a] left-0  fixed top-0   md:bg-white  md:relative md:w-[250px] md:h-full   md:block md:rounded-xl md:p-2'>


<div 
style={{
  transform:openClose === true ? "translateY(0)" : "translateY(800px) "
  ,transition:"0.3s ease-in-out",display:"5s" }} 
  className='w-[100%] h-[88%] bg-white  absolute md:relative rounded-t-[20px] md:rounded-none  -bottom-1  '>

<div className='border-b-2 p-3 flex justify-between items-center'>
        <h4 className="mb-1 text-black">Filters</h4>
        <div className='hidden md:block'><GiSettingsKnobs /></div>
        <div onClick={(()=>setOpenClose(!openClose))} className=' flex md:hidden'><IoClose /></div>
</div>

<div className='w-full h-[100%]  overflow-x-auto md:overflow-hidden'>

<div className="grid grid-cols-1 justify-items-start gap-2  border-b-2 p-3">
          {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((e) => (
            <div
              key={e}
              className="flex w-full justify-between items-center  gap-1"
            >
              <label>{e}</label>
              <input onClick={(e)=> setCategory(e.target.value)} type="radio" name="category" value={e} />
            </div>
          ))}
        </div>


        <div className='border-b-2 p-3'>
        <h4 className="mb-1 text-black">Price</h4>

        </div>


        <div className="part-2 p-3 border-b-2 ">
          <h4 className="mb-1 text-black">Colors</h4>
          <div className="flex gap-2 flex-wrap">
            {['green','red','#F5DD06','#06CAF5','#F57906','#063AF5','#7D06F5','#F506A4','#FFFFFF','#000000'].map((colorProduct,i) => (
              <span
                key={i}
                style={{ backgroundColor: `${colorProduct}` }}
                onClick={() => setColor(colorProduct)}
                className="  w-[30px] border cursor-pointer flex justify-center items-center h-[30px] rounded-full "
              >
                {color === colorProduct && (
                  <div className="text-white w-full h-full flex justify-center items-center rounded-full bg-[#0000006c]">
                    <IoMdCheckmark />
                  </div>
                )}
              </span>
            ))}
          </div>
        </div>


        <div className="part-3 p-3 border-b-2 ">
          <h4 className="mb-1 text-black">Size</h4>
          <div className="flex gap-2 flex-wrap ">
            {["XX-Small","X-Small","Small","Medium","Large","X-Large","XX-Large","3X-Large","4X-Large"].map((sizeProduct) => (
              <span
                style={{
                  backgroundColor: size === sizeProduct && "black",
                  color: size === sizeProduct && "white",
                }}
                key={sizeProduct}
                onClick={() => setSize(sizeProduct)}
                className=" block px-4 py-2  bg-[#F0F0F0]  text-[#666666] cursor-pointer  rounded-2xl "
              >
                {sizeProduct}
              </span>
            ))}
          </div>
        </div>


        <div className="grid grid-cols-1 justify-items-start gap-2 p-3">
        <h4 className="mb-1 text-black">Dress Style</h4>
          {["Casual", "Formal", "Party","Gym"].map((e) => (
            <div
              key={e}
              className="flex w-full justify-between items-center  gap-1"
            >
              <label>{e}</label>
              <input onClick={(e)=> setDressStyle(e.target.value)}  type="radio" name="category" value={e} />
            </div>
          ))}
        </div>

        <div onClick={()=> setApplyFilter(!applyFilter)} className='p-3 m-2 flex justify-center items-center bg-black text-white cursor-pointer rounded-3xl'>
        Apply Filter
        </div>
</div>

</div>




      </div>

      <div className='w-full md:w-[80%]'>
        <div className='text-lg font-bold p-2 flex justify-between items-center'>
          <h2>Casual</h2>
          <div className='flex gap-2 justify-between items-center'>
            <span className='text-gray-400 text-[10px]'>Showing 1-10 of 100 Products</span>
            <span className='text-gray-400 text-[10px]'>Sort by: Most Popular</span>
            <div onClick={(()=> setOpenClose(!openClose))} className=' cursor-pointer flex md:hidden'><GiSettingsKnobs /></div>
          </div>
          
        </div>
        <Cards  data={data} border={false} button={false} />
        <Pagination meta={meta} setPageIndex={setPageIndex} />
      </div>
    </div>
  </div>
);
}
