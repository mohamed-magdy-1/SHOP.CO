import Image from 'next/image'
import React from 'react'

export default function BannerGray() {

let data=[
  {
    title:'BROWSE BY DRESS STYLE',
    comp:[{title:"Casual",img:'/assets/DRESS/image 11.png',},{title:"Formal",img:'/assets/DRESS/image 13.png',},],
    comp1:[{title:"Party",img:'/assets/DRESS/image 12.png'},{title:"Gym",img:'/assets/DRESS/image 14.png'}]
  }
]

  return (
    <div className="container p-6 m-auto bg-[#F0F0F0] my-7 rounded-2xl ">
      <div className="w-[100%]  flex justify-center items-center py-5 text-5xl font-black">
        {data[0].title}
      </div>

      <div className="grid h-[250px] grid-cols-1 mb-5 sm:grid-cols-[1fr_2fr] gap-5">
        {data[0].comp.map((e, i) => (

            <div key={i} className="bg-white   relative overflow-hidden rounded-xl">
              <h4 className=' p-8 text-4xl font-bold  absolute z-10'>{e.title}</h4>
              <Image
                key={i}
                className=" w-full h-full object-cover"
                src={e.img}
                alt="BannerGray-photo"
                width={0}
                height={0}
                sizes='100vh'
              />
            </div>

        ))}
      </div>


      <div className="grid h-[250px] grid-cols-1 mb-5 sm:grid-cols-[2fr_1fr] gap-5">
        {data[0].comp1.map((e, i) => (
            <div key={i} className="bg-white   relative overflow-hidden rounded-xl">
              <h4 className='p-8 text-4xl font-bold absolute z-10'>{e.title}</h4>
              <Image
                key={i}
                className=" w-full h-full object-cover"
                src={e.img}
                alt="BannerGray-photo"
                width={0}
                height={0}
                sizes='100vh'
              />
            </div>
        ))}
      </div>




 
    </div>
  );
}
