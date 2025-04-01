"use client"

import Footer from "@/app/footer/footer";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { FiPlus ,FiMinus } from "react-icons/fi";
import ReviewsProduct from "../reviewsProduct/reviewsProduct";
import { IoMdCheckmark } from "react-icons/io";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import { useCartNum } from "@/app/context/cartNun";
import axios from "axios";

export default function Page() {
  const { num, setNum } = useCartNum();

  const params = useParams();
let  [data ,setData] = useState(null);
let  [color ,setColor] = useState('');
let  [size ,setSize] = useState('');
let  [imgIndex ,setImgIndex] = useState(0);
let  [counter ,setCounter] = useState(1);

const [cartProducts, setCartProducts] = useState(() => {
  // قراءة البيانات المخزنة في localStorage عند التحميل لأول مرة
  if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartProducts");
      return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
});


// projectsAmount
function counterPlus() {
  if(counter < data.projectsAmount ){
    setCounter(counter + 1)
  }
  
}
function counterMinus() {
if(counter > 1)
  setCounter(counter - 1)
}
// 

useEffect(()=>{
  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products/${params.productId}`, {
        headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            "Content-Type": "application/json",
        },})
      setData(res.data.data || []); 

    } catch (error) {
      setData([])
      console.error("Error fetching alert data:", error);
    }
  };

  fetchData()

},[])




let PriceDiscount  = (num) =>{
  const originalPrice = data?.price * counter
  const discountAmount = originalPrice * (data?.discount / 100)
  return originalPrice - discountAmount;
}




  const newData = useMemo(() => ({
    id:data?.id,
    title:data?.title,
    imgProduct: data?.imgProduct[imgIndex]?.url,
    color,
    size,
    discount:data?.discount,
    projectsAmount:data?.projectsAmount,
    projectsAmountNeed: counter,
    price:data?.price,
    priceAmount: PriceDiscount(),
  }), [color, size, counter,data]);
  


  const addToCart = () => {
    setCartProducts((prevCart) => {
      const isExisting = prevCart.some((item) => item.id === newData.id);
      if (isExisting) {
        return prevCart.map((item) => (item.id === newData.id ? newData : item));
      } else {
        return [...prevCart, newData];
      }
    });


let toastSH = cartProducts.some((item)=>(
          item.id === newData.id && 
        item.projectsAmountNeed === newData.projectsAmountNeed 
        && item.color === newData.color 
        && item.size === newData.size
))

if(toastSH){
  toast.success('you are already have this!');
}else{
  toast.success('Add successfully!');
}

};

  
  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    setNum(cartProducts.length)
  }, [cartProducts]);






  if(!data){
    return <div>Loading...</div>
  }


  return (
    <div>
      <>
        <div className=" mt-7 container m-auto product-details grid  p-2 gap-[10px]  grid-cols-1 sm:grid-cols-1 lg:grid-cols-[1fr_1.5fr]">
          
          <div className="imgs  w-full max-[640px]:h-auto h-[420px]   flex max-[640px]justify-center sm:justify-start  flex-col-reverse gap-2 sm:flex-row  ">

            <div className="side-imgs  h-full flex sm:flex-col gap-4 justify-center sm:justify-between items-center   ">

              {data?.imgProduct.map((img, i) => (
                <div key={i}  className=" cursor-pointer max-[640px]:w-auto w-[120px] h-[120px]">
                
                <Image
                style={{border: imgIndex == i ? "2px solid black" : "none"}}
                  onClick={()=>setImgIndex(i)}
                  className=" w-full h-full object-cover rounded-2xl"
                  src={ `${process.env.NEXT_PUBLIC_STRAPI_URL}` + img?.url}
                  alt="side-imgs-photo"
                  loading="lazy"
                  width={100}
                  height={100}
                  
                />
                </div>
              ))}

            </div>

            <div className="pig-img max-[500px]:w-auto w-[400px]  h-[420px] flex justify-center  md:justify-start items-center">
              {
                data?.imgProduct.length > 0 ? 
                (
                  <Image
                  className=" w-full h-full   rounded-3xl "
                  src={ `${process.env.NEXT_PUBLIC_STRAPI_URL}` +   data?.imgProduct[imgIndex]?.url}
                  alt="pig-img-photo"
                  loading="lazy"
                  width={300}
                  height={300}
                  
                />
                )
                : (<p className="text-white">No images available</p>)
              }



            </div>
          </div>



          <div className="details flex  flex-col justify-between">

            <div className="part-1  border-b-2">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">{data?.title}</h1>
              </div>

              <div className="star flex items-start mb-2">
                <div className="flex text-lg w-fit relative items-start">
                  <span className="star flex text-gray-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </span>

                  <div
                    style={{ width: `${(data?.reviewStar / 5) * 100}%` }}
                    className="overflow-hidden absolute top-0 left-0 "
                  >
                    <span className="[display:ruby-text]  text-[#ffc700]">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </span>
                  </div>
                </div>
                <p className="ms-1 text-sm font-medium text-black ">{`${data?.reviewStar}/5`}</p>
              </div>

              <div
                style={{ fontFamily: "cursive" }}
                className="price flex  items-center mb-4  "
              >
                {data?.discount > 0 ? (
                  <div className="flex items-center">
                    <span className="text-[20px] font-bold">{`$${
                      PriceDiscount()
                    }`}</span>
                    <span className="text-gray-500 ml-3 text-[20px] line-through">{`$${data?.price * counter }`}</span>
                    <span className=" ml-3 text-[15px] px-2  text-red-500 bg-[#FFEBEB] rounded-2xl">{`-${data?.discount}%`}</span>
                  </div>
                ) : (
                  <span className="text-[20px] font-bold">{`$${data?.price * counter}`}</span>
                )}
              </div>

              <div>
                <p className="text-[#666666] text-base mb-3">{data?.descriptions}</p>
              </div>
            </div>

            <div style={{borderColor:color === "" ? "red" : "green"}} className="part-2 p-3 border-b-2">
                <h4 className="mb-1 text-[#666666]">Select Colors</h4>
                <div className="flex gap-2">
                {
                    data?.color.map((colorProduct)=>(
                        <span key={colorProduct?.colorORsize} style={{backgroundColor:`${colorProduct?.colorORsize}`}}   onClick={()=> setColor(colorProduct?.colorORsize)} className="  w-[30px] border-2 cursor-pointer flex justify-center items-center h-[30px] rounded-full ">
                          {color === colorProduct?.colorORsize && 
                          <div className="text-white w-full h-full flex justify-center items-center rounded-full bg-[#0000006c]">
                              <IoMdCheckmark />
                          </div>

                          }
                        </span>
                    ))
                }
                </div>

            </div>

            <div style={{borderColor:size === "" ? "red" : "green"}} className="part-3 p-3 border-b-2 ">
            <h4 className="mb-1 text-[#666666]">Choose Size</h4>
            <div className="flex gap-2 ">
                {
                    data?.size.map((sizeProduct)=>(
                        <span style={{backgroundColor: size === sizeProduct?.colorORsize && "black",color:size === sizeProduct?.colorORsize && "white" }} key={sizeProduct?.colorORsize} onClick={()=> setSize(sizeProduct?.colorORsize)}  className=" block px-4 py-2  bg-[#F0F0F0]  text-[#666666] cursor-pointer  rounded-2xl ">{sizeProduct?.colorORsize}</span>
                    ))
                }
                </div>
            </div>
            <h2 className="p-1">available ({data?.projectsAmount})</h2>



            <div className="part-4    grid gap-2 grid-cols-[100px_1fr] justify-items-center items-center ">
              
                <div className="flex select-none w-full h-[40px]  justify-between items-center text-xl  gap-2 bg-slate-200 text-black p-2 px-3 rounded-3xl">
                    <span onClick={()=> counterMinus()} className="cursor-pointer"><FiMinus /></span>
                    <span>{counter}</span>
                    <span onClick={()=>counterPlus()} className="cursor-pointer"><FiPlus /></span>
                </div>


                <button onClick={(()=> addToCart())} disabled={!(color !== '' && size !== '' )} className=" disabled:grayscale disabled:opacity-50 disabled:cursor-not-allowed   w-full cursor-pointer hover:scale-100 ease-in-out p-2 h-[40px] bg-black text-white flex justify-center items-center rounded-3xl">
                Add to Cart
                </button>
            </div>



          </div>




        </div>
      </> 
      <ReviewsProduct />
      {/* <Cards data={data1} title={'You might also like'} button={false}/> */}
      <Footer />
      <ToastContainer />
    </div>
  );
}
